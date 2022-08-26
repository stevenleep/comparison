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