//*
//* Функция для нарезки массива на чанки
//*
export function onRepacking(array: Array<any>, chunkSize: number): Array<any> {
  const res: Array<any> = [];

  if (chunkSize === 0) res.push(array);

  while (array.length > 0 && chunkSize !== 0) {
    const chunk = array.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}
