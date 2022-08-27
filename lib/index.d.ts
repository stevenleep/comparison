declare enum CompareStatusEnum {
    Positive = "positive",
    Negative = "negative",
    Equal = "equal",
    Error = "error"
}
interface CompareResult {
    isGreater: boolean;
    weight: number;
    status: CompareStatusEnum;
}

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
declare const DefaultTerminals: string[];
declare const DefaultPrvMappings: {
    alpha: number;
    beta: number;
    rc: number;
};
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
    getPrvWeight(currentWord: string, word: string): CompareResult | undefined;
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

interface EnhanceEventsParserOption extends ParserOptions {
    onDifferent?: <V>(current: string, last: string, currentParserInstance: Parser, lastParserInstance: Parser, pointer: number) => V;
}
declare function compare<Result = CompareResult>(currentVersion: string, lastVersion: string, options?: EnhanceEventsParserOption): Result;

export { CompareResult, CompareStatusEnum, DefaultPrvMappings, DefaultTerminals, EnhanceEventsParserOption, Parser, ParserOptions, compare };
