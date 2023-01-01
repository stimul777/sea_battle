export function start() {
  const $app = document.getElementById('app');
  const section_grid = document.createElement('section');
  const section_additions = document.createElement('section');
  const section_pier = document.createElement('div');
  const section_audioPlayer = document.createElement('div');

  section_additions.classList.add('wrapper-additions');

  // pier
  section_pier.classList.add('wrapper-pier');

  //audio_player;
  section_audioPlayer.classList.add('wrapper-audio_player');

  // add in grid
  section_grid.classList.add('wrapper-grid');

  section_additions.prepend(section_pier, section_audioPlayer);

  $app?.append(section_additions);
  $app?.append(section_grid);
}
start();
