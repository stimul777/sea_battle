import hit_sound from '@/assets/sound/hit.mp3';
import miss_sound from '@/assets/sound/miss.mp3';
import shot_sound from '@/assets/sound/shot.mp3';

export function sound(value: string) {
  let hit: HTMLAudioElement, miss: HTMLAudioElement, shot: HTMLAudioElement;

  hit = new Audio();
  miss = new Audio();
  shot = new Audio();

  hit.src = hit_sound;
  miss.src = miss_sound;
  shot.src = shot_sound;

  switch (value) {
    case 'hit':
      return hit.play();
    case 'miss':
      return miss.play();
    case 'shot':
      return shot.play();
    default:
      return;
  }

  // return [value()].play();

  // sound.src = shot;

  // sound.play();

  // let audio: HTMLAudioElement = new Audio();
  // const res = audio
  //   .load([Audio.load('./sound/hit.mp3'), Audio.load('./sound/miss.mp3'), Audio.load('./sound/shot.mp3')])
  //   .then((items) => {
  //     let joined = Audio.from(...items);
  //     console.log(joined);
  //   });
}
