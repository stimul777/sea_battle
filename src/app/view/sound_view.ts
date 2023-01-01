import hit_sound from '@/assets/sound/hit.mp3';
import miss_sound from '@/assets/sound/miss.mp3';
import shot_sound from '@/assets/sound/shot.mp3';
import { tSound } from '@/types/sound';

export function sound() {
  let hit: HTMLAudioElement, miss: HTMLAudioElement, shot: HTMLAudioElement;

  hit = new Audio();
  miss = new Audio();
  shot = new Audio();

  hit.src = hit_sound;
  miss.src = miss_sound;
  shot.src = shot_sound;

  const setSound = (value: tSound) => {
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
  };

  return { setSound };
}
