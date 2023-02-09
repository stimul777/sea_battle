//*
//* Функция для сортировки массива кораблей по возрастанию
//* Только вертикаль(сравнение по номеру)
//*
export function setSort(array: string[]) {
  return array.sort((a: string, b: string) => {
    if (Number(a.substring(1)) > Number(b.substring(1))) {
      return 1;
    }

    if (Number(a.substring(1)) < Number(b.substring(1))) {
      return -1;
    }

    return 0;
  });
}
