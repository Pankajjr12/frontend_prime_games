let audio: HTMLAudioElement | null = null;

export const getAudioPlayer = () => {
  if (!audio) {
    audio = new Audio("/battle.mp3");
    audio.volume = 0.4;
    audio.loop = false; // optional
  }
  return audio;
};
