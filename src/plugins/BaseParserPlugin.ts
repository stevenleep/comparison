export abstract class BaseParserPlugin {
    abstract type: string;
    abstract parse(file: Iterator<string>): any;
}