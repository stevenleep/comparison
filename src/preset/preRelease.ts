import Parser from "../Parser";
import {
  available2Number,
  tryString2Number,
  isNegative,
  isPositive,
} from "../utils";

export enum CompareStatusEnum {
  Positive = "positive",
  Negative = "negative",
  Equal = "equal",
  Error = "error",
}

export interface CompareResult {
  isGreater: boolean;
  weight: number;
  status: CompareStatusEnum;
}
export function createCompareResult(
  isGreater: boolean,
  weight: number
): CompareResult {
  return {
    isGreater,
    weight,
    status: isPositive(weight)
      ? CompareStatusEnum.Positive
      : isNegative(weight)
      ? CompareStatusEnum.Negative
      : CompareStatusEnum.Equal,
  };
}

export function comparePreRelease(
  parser: Parser,
  current: string,
  last: string
): CompareResult {
  // 先行规则: 存在的先行版本的字符串大于不存在的先行版本的字符串
  if (current && !last) {
    return createCompareResult(true, 1);
  }
  if (!current && last) {
    return createCompareResult(false, -1);
  }

  // 规则：同一级的语义 数字大于先行版本的字符串
  const isCurrentAvailableNumber = available2Number(current);
  const isLastAvailableNumber = available2Number(last);
  if (isCurrentAvailableNumber && !isLastAvailableNumber) {
    return createCompareResult(true, 1);
  }
  if (!isCurrentAvailableNumber && isLastAvailableNumber) {
    return createCompareResult(false, -1);
  }

  // 规则二：都为数字，数字大小比较
  if (isCurrentAvailableNumber && isLastAvailableNumber) {
    const currentVersion = tryString2Number(current);
    const lastVersion = tryString2Number(last);
    if (currentVersion > lastVersion) {
      return createCompareResult(true, 1);
    }
    if (currentVersion < lastVersion) {
      return createCompareResult(false, -1);
    }
  }

  // 规则三：都为先行版本的字符串，字符串对应的权重做比较
  return parser.getPrvWeight(current, last) as CompareResult;
}
