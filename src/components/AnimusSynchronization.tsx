import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface AnimusSynchronizationProps {
  onComplete: () => void;
  isSyncing: boolean;
}

const AnimusSynchronization = ({ onComplete, isSyncing }: AnimusSynchronizationProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Animus Protocol...');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize and play loading sound
    const playLoadingSound = async () => {
      try {
        // Dynamically import the audio file
        const audioModule = await import('../assets/sounds/first-loading-sound.mp3');
        const audioSrc = audioModule.default;
        
        audioRef.current = new Audio(audioSrc);
        audioRef.current.volume = 0.6;
        audioRef.current.loop = false; // Play once, don't loop
        audioRef.current.playbackRate = 1; // Normal speed
        
        // Attempt to play - browsers may block this without user interaction
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Autoplay was prevented. Click anywhere to start audio:', error);
            
            // Add click listener to play on first user interaction
            const handleFirstClick = () => {
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Play error:', e));
              }
              document.removeEventListener('click', handleFirstClick);
            };
            
            document.addEventListener('click', handleFirstClick);
          });
        }
      } catch (error) {
        console.error('Audio loading error:', error);
      }
    };

    playLoadingSound();

    const steps = [
      { delay: 300, progress: 20, text: 'Synchronizing memory...' },
      { delay: 800, progress: 45, text: 'Accessing Developer Memory: Hashintha Liyanaarachchi...' },
      { delay: 1400, progress: 70, text: 'Loading Workie Protocol...' },
      { delay: 2000, progress: 90, text: 'Calibrating Neural Interface...' },
      { delay: 2600, progress: 100, text: 'Access Granted.' },
    ];

    steps.forEach(({ delay, progress, text }) => {
      setTimeout(() => {
        setProgress(progress);
        setStatusText(text);
        
        // Stop loading sound when progress reaches 100%
        if (progress === 100) {
          setTimeout(() => {
            // Stop the audio when loading completes
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }, 500); // Small delay after reaching 100%
        }
      }, delay);
    });

    // Cleanup: stop audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []); // Empty dependency array - run only once on mount

  return (
    <div className="animus-sync relative w-full min-h-screen overflow-hidden">
      <div 
        className="animus-background absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 z-0"
      ></div>
      <div className="animus-overlay relative z-[1]"></div>

      <div className="sync-content relative z-10">
        <div className="animus-symbol">
          <div className="rotating-ring"></div>
          <div className="rotating-ring ring-2"></div>
          <div className="rotating-ring ring-3"></div>
          <div className="center-core">
            <Loader2 className="core-icon" />
          </div>
        </div>

        <div className="sync-text">
          <h1 className="glitch-text" data-text="HASHINTHA.DEV">
            HASHINTHA.DEV
          </h1>
          <p className="status-text">{statusText}</p>

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>

        {!isSyncing && (
          <button className="enter-button" onClick={onComplete}>
            <span className="button-border"></span>
            <span className="button-text">Enter the Memory</span>
          </button>
        )}
      </div>

      <div className="scan-lines"></div>
    </div>
  );
};

export default AnimusSynchronization;
