import {
  createCompareResult,
  CompareResult,
  CompareStatusEnum,
} from "./preset/preRelease";
export { CompareResult, CompareStatusEnum } from "./preset/preRelease";

export interface ParserOptions {
  terminals?: string[];
  prv?: {
    alpha?: number;
    beta?: number;
    rc?: number;
  } & { [key: string]: number };
}

export const DefaultTerminals = [".", "-", "+"];
export const DefaultPrvMappings = { alpha: 1, beta: 2, rc: 3 };

export class Parser {
  terminals: string[] = DefaultTerminals;
  splitWords: string[] = [];
  part: string = "";
  versionString: string = "";
  prv: ParserOptions["prv"] = DefaultPrvMappings;

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

  public getPrvWeight(
    currentWord: string,
    word: string
  ): CompareResult | undefined {
    if (!this.isPrv(word) || !this.isPrv(currentWord)) {
      return { isGreater: false, weight: 0, status: CompareStatusEnum.Error };
    }

    if (currentWord === word) {
      return createCompareResult(false, 0);
    }

    const currentPrv = this.getPrv(currentWord);
    const prv = this.getPrv(word);
    if (currentPrv > prv) {
      return createCompareResult(true, currentPrv - prv);
    }
    if (currentPrv < prv) {
      return createCompareResult(false, currentPrv - prv);
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
