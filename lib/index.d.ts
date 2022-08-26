declare abstract class BaseParserPlugin {
    abstract type: string;
    abstract parse(file: Iterator<string>): any;
}

interface ParserOptions {
    terminals?: string[];
    plugins?: BaseParserPlugin[];
    prv?: {
        alpha: number;
        beta: number;
        rc: number;
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
        prv: {
            [key: string]: number;
            alpha: number;
            beta: number;
            rc: number;
        } | undefined;
    };
}

declare function compare(currentVersion: string, lastVersion: string, options?: ParserOptions): {
    weight: number;
    isGreater: boolean;
} | {
    isGreater: boolean;
    weight?: undefined;
} | {
    isGreater: {
        weight: number;
        isGreater: boolean;
    } | undefined;
    weight?: undefined;
};
declare function callIterator(iterator: Iterator<string>): void;

export { Parser, ParserOptions, callIterator, compare };
