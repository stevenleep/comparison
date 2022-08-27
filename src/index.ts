export * from "./Parser";
import { Parser, ParserOptions } from "./Parser";
import { comparePreRelease, CompareResult } from "./preset/preRelease";
import { autoIteratorActuator, horspool } from "./utils";

export interface EnhanceEventsParserOption extends ParserOptions {
  // 自定义实现preRelease版本如何比较
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

  // 用于自定义先行版本如何校验
  if(onDifferent) {
    return onDifferent(words[0], words[1], current, last, pointer) as Result;
  }
  // 预设的先行版本校验方式
  return comparePreRelease(current, ...words) as unknown as Result;
}

function createParserAndCallIterator(version: string, options?: ParserOptions) {
  const parser = new Parser(options);
  autoIteratorActuator(parser.walk(version));
  return parser;
}
