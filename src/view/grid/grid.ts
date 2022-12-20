//Построение игровой сетки
export function onGrid(value: '.my-grid' | '.enemy-grid') {
  const $wrapper = document.querySelector('.wrapper-grid');
  const $letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  // const $gridContainer =  document.createElement('div');

  for (let letter of $letters) {
    for (let i = 1; i <= $letters.length; i++) {
      const div = document.createElement('div');
      $wrapper?.classList.add(value);
      div.classList.add(letter + i);
      div.innerHTML = letter + i;
      div.classList.add('square');
      $wrapper?.appendChild(div);
    }
  }
}

onGrid('.my-grid');
onGrid('.enemy-grid');
