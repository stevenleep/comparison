import Parser from "../Parser";
import { available2Number, tryString2Number } from "../utils";

export interface CompareResult {
  isGreater: boolean;
  weight: number;
}

export function comparePreRelease(
  parser: Parser,
  current: string,
  last: string
): CompareResult {
  // 先行规则: 存在的先行版本的字符串大于不存在的先行版本的字符串
  if (current && !last) {
    return {
      weight: 1,
      isGreater: true,
    };
  }
  if (!current && last) {
    return {
      weight: -1,
      isGreater: false,
    };
  }

  // 规则：同一级的语义 数字大于先行版本的字符串
  const isCurrentAvailableNumber = available2Number(current);
  const isLastAvailableNumber = available2Number(last);
  if (isCurrentAvailableNumber && !isLastAvailableNumber) {
    return { isGreater: true, weight: 1 };
  }
  if (!isCurrentAvailableNumber && isLastAvailableNumber) {
    return { isGreater: false, weight: -1 };
  }

  // 规则二：都为数字，数字大小比较
  if (isCurrentAvailableNumber && isLastAvailableNumber) {
    const currentVersion = tryString2Number(current);
    const lastVersion = tryString2Number(last);
    if (currentVersion > lastVersion) {
      return { isGreater: true, weight: 1 };
    }
    if (currentVersion < lastVersion) {
      return { isGreater: false, weight: -1 };
    }
  }

  // 规则三：都为先行版本的字符串，字符串对应的权重做比较
  return parser.getPrvWeight(current, last) as CompareResult;
}
