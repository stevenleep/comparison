interface ParserOptions {
    terminals?: string[];
    prv?: {
        alpha?: number;
        beta?: number;
        rc?: number;
    } & {
        [key: string]: number;
    };
}
declare class Parser {
    options?: ParserOptions | undefined;
    terminals: string[];
    splitWords: string[];
    part: string;
    versionString: string;
    prv: ParserOptions["prv"];
    constructor(options?: ParserOptions | undefined);
    private prepare;
    walk(versionString: string): Generator<string, void, unknown>;
    isPrv(word: string): boolean;
    getPrv(word: string): number;
    getPrvWeight(currentWord: string, word: string): {
        weight: number;
        isGreater: boolean;
    } | undefined;
    getSplitMetaInfo(): {
        terminals: string[];
        splitWords: string[];
        originalVersion: string;
        iterator: Generator<string, void, unknown>;
        prv: ({
            alpha?: number | undefined;
            beta?: number | undefined;
            rc?: number | undefined;
        } & {
            [key: string]: number;
        }) | undefined;
    };
}

interface CompareResult {
    isGreater: boolean;
    weight: number;
}

interface EnhanceEventsParserOption extends ParserOptions {
    onPreRelease?: <V>(current: string, last: string, currentParserInstance: Parser, lastParserInstance: Parser, pointer: number) => V;
}
declare function compare<Result = CompareResult>(currentVersion: string, lastVersion: string, options?: EnhanceEventsParserOption): Result;

export { EnhanceEventsParserOption, Parser, ParserOptions, compare };
