export default function start() {
  const $app = document.getElementById('app');
  const section_grid = document.createElement('section');
  const section_pier = document.createElement('section');

  // pier
  section_pier.classList.add('wrapper-pier');

  // grid
  section_grid.classList.add('wrapper-grid');

  $app?.prepend(section_pier);
  $app?.append(section_grid);
}
start();
