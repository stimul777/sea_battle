export default function start() {
  const $app = document.getElementById('app');
  const section = document.createElement('section');
  $app?.appendChild(section);
  section.classList.add('wrapper-grid');
}
start();
