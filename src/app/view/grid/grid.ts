//Построение игровой сетки
export function onGrid(value: 'my-grid' | 'enemy-grid') {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-grid') as HTMLElement;
  const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  const container: HTMLElement = document.createElement('div');
  container.classList.add(value + '_wrapper');
  const container_grid: HTMLElement = document.createElement('div');

  const container_letters: HTMLElement = document.createElement('div');
  const container_numbers: HTMLElement = document.createElement('div');
  container_grid.classList.add(value);

  container_letters.classList.add('lettersTop');
  container_numbers.classList.add('numbersLeft');

  container.append(container_numbers, container_letters, container_grid);
  $wrapper.append(container);

  letters.forEach((letter: string, number: number) => {
    const containerLetters: HTMLElement = document.createElement('p') as HTMLElement;
    containerLetters.classList.add('letterOnTop');
    containerLetters.innerText = String(letter);
    container_letters.append(containerLetters);

    const containerNumbers: HTMLElement = document.createElement('p') as HTMLElement;
    containerNumbers.classList.add('numberOnLeft');
    containerNumbers.innerText = String(number + 1);
    container_numbers.append(containerNumbers);

    // построение сетки внутри
    letters.forEach((letter: string) => {
      const div: HTMLElement = document.createElement('div') as HTMLElement;
      div.classList.add(letter + (number + 1));
      div.textContent = letter + (number + 1);
      div.classList.add('square');
      container_grid.append(div);
    });
  });
}

onGrid('my-grid');
onGrid('enemy-grid');
