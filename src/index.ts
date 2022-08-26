export * from "./Parser";
import { Parser, ParserOptions } from "./Parser";
import { available2Number, tryString2Number } from "./utils";

export function compare(
  currentVersion: string,
  lastVersion: string,
  options?: ParserOptions
) {
  const current = createParserAndCallIterator(currentVersion, options);
  const last = createParserAndCallIterator(lastVersion, options);
  return compareImpl(current, last);
}

function compareImpl(current: Parser, last: Parser) {
  let pointer = 0;
  let isContinue = true;
  let currentWord = "";
  let lastWord = "";

  while (isContinue) {
    currentWord = current.splitWords[pointer];
    lastWord = last.splitWords[pointer];
    if (currentWord === lastWord) {
      pointer++;
    } else {
      isContinue = false;
    }
  }
  return comparePreReleaseVersion(currentWord, lastWord, current);
}

function comparePreReleaseVersion(
  current: string,
  last: string,
  parser: Parser
) {
  // 先行规则: 存在的先行版本的字符串大于不存在的先行版本的字符串
  if (current && !last) {
    return {
      weight: 10000,
      isGreater: true,
    };
  }
  if (!current && last) {
    return {
      weight: -10000,
      isGreater: false,
    };
  }

  // 规则：同一级的语义 数字大于先行版本的字符串
  const isCurrentAvailableNumber = available2Number(current);
  const isLastAvailableNumber = available2Number(last);
  if (isCurrentAvailableNumber && !isLastAvailableNumber) {
    return { isGreater: true };
  }
  if (!isCurrentAvailableNumber && isLastAvailableNumber) {
    return { isGreater: false };
  }

  // 规则二：都为数字，数字大小比较
  if (isCurrentAvailableNumber && isLastAvailableNumber) {
    const currentVersion = tryString2Number(current);
    const lastVersion = tryString2Number(last);
    if (currentVersion > lastVersion) {
      return { isGreater: true };
    }
    if (currentVersion < lastVersion) {
      return { isGreater: false };
    }
  }

  // 规则三：都为先行版本的字符串，字符串对应的权重做比较
  const isGreater = parser.getPrvWeight(current, last);
  return { isGreater };
}

export function callIterator(iterator: Iterator<string>): void {
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
}

function createParserAndCallIterator(version: string, options?: ParserOptions) {
  const parser = new Parser(options);
  callIterator(parser.walk(version));
  return parser;
}
