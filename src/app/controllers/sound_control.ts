import hit_sound from '@/assets/sound/hit.mp3';
import miss_sound from '@/assets/sound/miss.mp3';
import shot_sound from '@/assets/sound/shot.mp3';
import { tSound } from '@/types/sound';

class Sound {
  hit: HTMLAudioElement;
  miss: HTMLAudioElement;
  shot: HTMLAudioElement;
  isSound: boolean;

  constructor() {
    this.hit = new Audio();
    this.miss = new Audio();
    this.shot = new Audio();

    this.hit.src = hit_sound;
    this.miss.src = miss_sound;
    this.shot.src = shot_sound;

    this.isSound = false;
  }

  setSound(value: tSound) {
    if (!this.isSound) return;

    this.hit.pause();
    this.miss.pause();
    this.shot.pause();

    switch (value) {
      case 'hit':
        return this.hit.play();
      case 'miss':
        return this.miss.play();
      case 'shot':
        return this.shot.play();
      default:
        return;
    }
  }

  onSound(value: boolean) {
    this.isSound = value;
  }
}

const sound = new Sound();
export { sound };
