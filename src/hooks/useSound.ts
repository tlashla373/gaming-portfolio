import { useRef, useCallback } from 'react';

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
}

export const useSound = (soundUrl: string, options: UseSoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { volume = 0.5, loop = false, playbackRate = 1 } = options;

  // Initialize audio element
  if (!audioRef.current && typeof window !== 'undefined') {
    audioRef.current = new Audio(soundUrl);
    audioRef.current.volume = volume;
    audioRef.current.loop = loop;
    audioRef.current.playbackRate = playbackRate;
  }

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return { play, pause, stop, setVolume };
};
