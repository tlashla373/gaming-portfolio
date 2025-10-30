import { useState, useEffect, useRef } from 'react';
import AnimusSynchronization from './components/AnimusSynchronization';
import MissionHub from './components/MissionHub';
import ProfileMemory from './components/ProfileMemory';
import SkillArsenal from './components/SkillArsenal';
import CompletedMissions from './components/CompletedMissions';
import CodexEntries from './components/CodexEntries';
import ContactBureau from './components/ContactBureau';
import EventGallery from './components/EventGallery';
import backgroundMusic from './assets/sounds/backgroud sound.mp3';

type Scene = 'sync' | 'hub' | 'profile' | 'skills' | 'projects' | 'codex' | 'contact' | 'gallery';

function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('sync');
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSelectedMission, setLastSelectedMission] = useState<'profile' | 'skills' | 'projects' | 'codex' | 'contact' | 'gallery'>('profile');
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSyncing(false);
      
      // Start background music after loading completes
      setTimeout(() => {
        if (!bgMusicRef.current) {
          bgMusicRef.current = new Audio(backgroundMusic);
          bgMusicRef.current.volume = 0.3; // Set to 30% volume
          bgMusicRef.current.loop = true; // Loop the music
        }
        
        bgMusicRef.current.play().catch(e => {
          console.log('Background music autoplay prevented:', e);
          
          // Play on first user interaction
          const handleFirstInteraction = () => {
            if (bgMusicRef.current) {
              bgMusicRef.current.play().catch(err => console.log('Play error:', err));
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
          };
          
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('keydown', handleFirstInteraction);
        });
      }, 500); // Small delay after loading completes
    }, 3000);
    
    // Cleanup: stop music when component unmounts
    return () => {
      clearTimeout(timer);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  const navigateToScene = (scene: Scene) => {
    // Store the mission if it's not 'sync' or 'hub'
    if (scene !== 'sync' && scene !== 'hub') {
      setLastSelectedMission(scene as 'profile' | 'skills' | 'projects' | 'codex' | 'contact' | 'gallery');
    }
    setCurrentScene(scene);
  };

  return (
    <div className="animus-container">
      {currentScene === 'sync' && (
        <AnimusSynchronization
          onComplete={() => navigateToScene('hub')}
          isSyncing={isSyncing}
        />
      )}
      {currentScene === 'hub' && (
        <MissionHub onNavigate={navigateToScene} initialMission={lastSelectedMission} />
      )}
      {currentScene === 'profile' && (
        <ProfileMemory onBack={() => navigateToScene('hub')} />
      )}
      {currentScene === 'skills' && (
        <SkillArsenal onBack={() => navigateToScene('hub')} />
      )}
      {currentScene === 'projects' && (
        <CompletedMissions onBack={() => navigateToScene('hub')} />
      )}
      {currentScene === 'codex' && (
        <CodexEntries onBack={() => navigateToScene('hub')} />
      )}
      {currentScene === 'contact' && (
        <ContactBureau onBack={() => navigateToScene('hub')} />
      )}
      {currentScene === 'gallery' && (
        <EventGallery onBack={() => navigateToScene('hub')} />
      )}
    </div>
  );
}

export default App;
