type BaseType = string | number | boolean | null | undefined;

export function horspool<ArrayItem = BaseType>(firstArray: ArrayItem[], secondArray: ArrayItem[]): {
  words: [ArrayItem, ArrayItem];
  pointer: number;
} {
  let isContinue = true;
  let pointer = 0;

  let firstWord: ArrayItem = firstArray[0],
    secondWord: ArrayItem = secondArray[0];

  while (isContinue) {
    firstWord = firstArray[pointer];
    secondWord = secondArray[pointer];
    if (firstWord === secondWord) {
      pointer++;
    } else {
      isContinue = false;
    }
  }
  return {
    pointer,
    words: [firstWord, secondWord]
  }
}