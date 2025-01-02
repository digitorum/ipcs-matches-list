export function findPattern(arr: string[], pattern: RegExp, resultIndex: number = 1) {
  for(let i = 0; i < arr.length; ++i) {
    const str = arr[i]
    const result = str?.match(pattern)

    if (result) {
      return result[resultIndex] ?? null
    }
  }

  return null
}

export function findString(arr: string[], pattern: RegExp, resultIndex: number = 1): string {
  return findPattern(arr, pattern, resultIndex) ?? ''
}

export function findNumber(arr: string[], pattern: RegExp, resultIndex: number = 1): number {
  const result = findPattern(arr, pattern, resultIndex)

  if (!result) {
    return 0
  }


  return parseInt(result, 10)
}

export function getDateOnly(str: string, inputFormat: string = 'dd.MM.yyyy') {
  return str.trim().split('.').reverse().join('-')
}