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
  if (current && !last) {
    return createCompareResult(true, 1);
  }
  if (!current && last) {
    return createCompareResult(false, -1);
  }

  const isCurrentAvailableNumber = available2Number(current);
  const isLastAvailableNumber = available2Number(last);
  if (isCurrentAvailableNumber && !isLastAvailableNumber) {
    return createCompareResult(true, 1);
  }
  if (!isCurrentAvailableNumber && isLastAvailableNumber) {
    return createCompareResult(false, -1);
  }

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

  return parser.getPrvWeight(current, last) as CompareResult;
}
