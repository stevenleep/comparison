export interface ParserOptions {
  terminals?: string[];
  prv?: {
    // prerelease version 默认在版本对比时候从上到下认为是逐渐增大 ，rc > beta > alpha
    alpha: number;
    beta: number;
    rc: number;
    [key: string]: number;
  };
}

export class Parser {
  terminals: string[] = [".", "-", "+"];
  splitWords: string[] = [];
  part: string = "";
  versionString: string = "";
  prv: ParserOptions["prv"] = {
    alpha: 1,
    beta: 2,
    rc: 3,
  };

  constructor(public options?: ParserOptions) {
    this.prepare(options);
  }

  private prepare(options?: ParserOptions) {
    if (options?.terminals && options?.terminals.length > 0) {
      this.terminals = options.terminals;
    }
    if (options?.prv) {
      this.prv = options.prv;
    }
  }

  public *walk(versionString: string) {
    this.versionString = versionString;
    for (let i = 0; i < versionString.length; i++) {
      const char = versionString[i];
      if (this.terminals.includes(char)) {
        this.splitWords.push(this.part);
        yield this.part;
        this.part = "";
      } else {
        this.part += char;
      }
    }
    if (this.part.length > 0) {
      this.splitWords.push(this.part);
      yield this.part;
    }
  }

  public isPrv(word: string) {
    return !!this.prv?.[word];
  }
  public getPrv(word: string): number {
    return this.prv?.[word] || 0;
  }

  public getPrvWeight(currentWord: string, word: string) {
    if (!this.isPrv(word) || !this.isPrv(currentWord)) {
      throw new Error(
        `${currentWord} or ${word} is not a pre release version desc`
      );
    }

    if (currentWord === word) {
      return { weight: 0, isGreater: false };
    }
    const currentPrv = this.getPrv(currentWord);
    const prv = this.getPrv(word);
    if (currentPrv > prv) {
      return {
        weight: currentPrv - prv,
        isGreater: true,
      };
    }
    if (currentPrv < prv) {
      return {
        weight: prv - currentPrv,
        isGreater: false,
      };
    }
  }

  public getSplitMetaInfo() {
    return {
      terminals: this.terminals,
      splitWords: this.splitWords,
      originalVersion: this.versionString,
      iterator: this.walk(this.versionString),
      prv: this.prv,
    };
  }
}

export default Parser;
