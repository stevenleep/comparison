export * from "./Parser";
import { Parser, ParserOptions } from "./Parser";
import { comparePreRelease, CompareResult } from "./preset/preRelease";
import { autoIteratorActuator, horspool } from "./utils";

export interface EnhanceEventsParserOption extends ParserOptions {
  onDifferent?: (
    current: string,
    last: string,
    currentParserInstance: Parser,
    lastParserInstance: Parser,
    pointer: number
  ) => any;
}
export function compare<Result = CompareResult>(
  currentVersion: string,
  lastVersion: string,
  options?: EnhanceEventsParserOption
): Result {
  const { onDifferent, ...parserOptions } = options || {};
  return compareImpl<Result>(
    createParserAndCallIterator(currentVersion, parserOptions),
    createParserAndCallIterator(lastVersion, parserOptions),
    onDifferent
  );
}

function compareImpl<Result = CompareResult>(
  current: Parser,
  last: Parser,
  onDifferent?: EnhanceEventsParserOption["onDifferent"]
): Result {
  const { words, pointer } = horspool<string>(current.splitWords, last.splitWords);
  if(onDifferent) {
    return onDifferent(words[0], words[1], current, last, pointer) as Result;
  }
  return comparePreRelease(current, ...words) as unknown as Result;
}

function createParserAndCallIterator(version: string, options?: ParserOptions) {
  const parser = new Parser(options);
  autoIteratorActuator(parser.walk(version));
  return parser;
}
