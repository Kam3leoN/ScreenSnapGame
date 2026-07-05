import { useCallback, useRef } from "react";

type SoundKey = "good" | "bad" | "extra" | "lose" | "theme";

const SOUND_PATHS: Record<SoundKey, string> = {
  good: "/sounds/true.mp3",
  bad: "/sounds/false.mp3",
  extra: "/sounds/1up.mp3",
  lose: "/sounds/kick.mp3",
  theme: "/sounds/smb3-wm1.mp3",
};

/**
 * Gestion des effets sonores du jeu.
 */
export function useGameAudio() {
  const cache = useRef<Partial<Record<SoundKey, HTMLAudioElement>>>({});

  const play = useCallback((key: SoundKey, volume = 0.5) => {
    if (!cache.current[key]) {
      const audio = new Audio(SOUND_PATHS[key]);
      audio.preload = "auto";
      cache.current[key] = audio;
    }
    const audio = cache.current[key]!;
    audio.volume = volume;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, []);

  const playTheme = useCallback(() => {
    if (!cache.current.theme) {
      const audio = new Audio(SOUND_PATHS.theme);
      audio.loop = true;
      audio.volume = 0.25;
      cache.current.theme = audio;
    }
    void cache.current.theme!.play().catch(() => undefined);
  }, []);

  const stopTheme = useCallback(() => {
    cache.current.theme?.pause();
  }, []);

  return { play, playTheme, stopTheme };
}
