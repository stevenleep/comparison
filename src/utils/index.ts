export * from "./diff";

export function tryString2Number(str: string): number {
  const num = Number(str);
  if (isNaN(num)) {
    return 0;
  }
  return num;
}

export function available2Number(version: string): boolean {
  const num = Number(version);
  if (isNaN(num)) {
    return false;
  }
  return true;
}

export function isNegative(num: number): boolean {
  return num < 0;
}
export function isPositive(num: number): boolean {
  return num > 0;
}

export function autoIteratorActuator<IteratorItem = string>(iterator: Iterator<IteratorItem>): void {
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
}