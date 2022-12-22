//Построение игровой сетки
export function onGrid(value: 'my-grid' | 'enemy-grid') {
  const $wrapper = document.querySelector('.wrapper-grid');
  const $letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  const container = document.createElement('div');
  container.classList.add(value);
  $wrapper?.append(container);

  for (let letter of $letters) {
    for (let i = 1; i <= $letters.length; i++) {
      const div = document.createElement('div');
      div.classList.add(letter + i);
      div.innerHTML = letter + i;
      div.classList.add('square');
      container?.append(div);
    }
  }
}

onGrid('my-grid');
onGrid('enemy-grid');
