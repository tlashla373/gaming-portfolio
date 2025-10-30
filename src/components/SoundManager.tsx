import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundManagerProps {
  backgroundMusic?: string;
}

const SoundManager = ({ backgroundMusic }: SoundManagerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [audio] = useState(() => {
    if (backgroundMusic && typeof window !== 'undefined') {
      const audioElement = new Audio(backgroundMusic);
      audioElement.loop = true;
      audioElement.volume = 0.3;
      return audioElement;
    }
    return null;
  });

  useEffect(() => {
    if (audio) {
      // Auto-play background music on mount (user interaction required)
      const playAudio = () => {
        audio.play().catch(() => {
          console.log('Autoplay prevented. User interaction required.');
        });
      };

      // Try to play on user interaction
      document.addEventListener('click', playAudio, { once: true });

      return () => {
        audio.pause();
        document.removeEventListener('click', playAudio);
      };
    }
  }, [audio]);

  const toggleMute = () => {
    if (audio) {
      if (isMuted) {
        audio.volume = volume;
        audio.play();
      } else {
        audio.volume = 0;
        audio.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audio.play();
      }
    }
  };

  if (!audio) return null;

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Volume Slider */}
      {showVolumeSlider && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center gap-2 px-3 py-2 bg-[rgba(26,31,53,0.9)] border border-[rgba(0,212,255,0.3)] rounded-lg backdrop-blur-md"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-[rgba(0,212,255,0.2)] rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:bg-[#00d4ff]
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-[0_0_5px_rgba(0,212,255,0.5)]
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:bg-[#00d4ff]
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <span className="text-xs text-[#00d4ff] min-w-[2rem]">
            {Math.round(volume * 100)}%
          </span>
        </motion.div>
      )}

      {/* Volume Button */}
      <motion.button
        onClick={toggleMute}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="w-12 h-12 flex items-center justify-center bg-[rgba(26,31,53,0.9)] border-2 border-[rgba(0,212,255,0.3)] text-[#00d4ff] rounded-lg hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </motion.div>
  );
};

export default SoundManager;
