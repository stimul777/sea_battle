export default function start() {
  const $app = document.getElementById('app');
  const section = document.createElement('section');
  section.classList.add('wrapper-grid');
  $app?.prepend(section);
}
start();
