import { User, Sword, FolderOpen, BookOpen, Mail, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import backgroundImage from '../assets/images/profile/background.png';
import nextSound from '../assets/sounds/next.wav';
import selectSound from '../assets/sounds/select-click.wav';

interface MissionHubProps {
  onNavigate: (scene: 'profile' | 'skills' | 'projects' | 'codex' | 'contact' | 'gallery') => void;
  initialMission?: 'profile' | 'skills' | 'projects' | 'codex' | 'contact' | 'gallery';
}

const MissionHub = ({ onNavigate, initialMission = 'profile' }: MissionHubProps) => {
  const missions = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Memory',
      subtitle: 'Origin Story',
      color: '#00d4ff',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'skills',
      icon: Sword,
      title: 'Skill Arsenal',
      subtitle: 'Weapons & Tools',
      color: '#ff6b35',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 'projects',
      icon: FolderOpen,
      title: 'Completed Missions',
      subtitle: 'Historical Records',
      color: '#4ecdc4',
      gradient: 'from-teal-400 to-cyan-500',
    },
    {
      id: 'codex',
      icon: BookOpen,
      title: 'Codex Entries',
      subtitle: 'Knowledge Archive',
      color: '#ffe66d',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Bureau',
      subtitle: 'Brotherhood Network',
      color: '#a8dadc',
      gradient: 'from-sky-300 to-blue-400',
    },
    {
      id: 'gallery',
      icon: Camera,
      title: 'Memory Gallery',
      subtitle: 'Event Chronicles',
      color: '#e63946',
      gradient: 'from-red-500 to-pink-600',
    },
  ];

  // Find the index of the initial mission
  const initialIndex = missions.findIndex(m => m.id === initialMission);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  
  // Audio refs for sounds
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play button click sound
  const playClickSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(nextSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  // Play card select sound
  const playSelectSound = () => {
    if (!selectAudioRef.current) {
      selectAudioRef.current = new Audio(selectSound);
      selectAudioRef.current.volume = 0.5;
    }
    selectAudioRef.current.currentTime = 0;
    selectAudioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const nextCard = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev + 1) % missions.length);
  };

  const prevCard = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev - 1 + missions.length) % missions.length);
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(missions.length - 1)) return 'right';
    if (diff === -1 || diff === missions.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#050810] to-[#0a0e1a]">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,26,0.8)] via-[rgba(10,14,26,0.6)] z-0" />

      {/* Ambient glow */}
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)'
      }} />

      {/* Header */}
      <motion.div 
        className="absolute top-8 md:top-16 left-0 right-0 text-center z-20 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-3xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-[0.2em] md:tracking-[0.3em] font-bigspace-title"
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #ffd700 50%, #00d4ff 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          MISSION HUB
        </motion.h1>
        <p className="text-sm md:text-lg text-[#a0a0a0] tracking-[0.15em] md:tracking-[0.2em] uppercase">
          Select a memory sequence to explore
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-10 px-4 sm:px-8 md:px-12 mt-16">
        <div className="relative w-full max-w-7xl h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center">
          <AnimatePresence mode="sync">
            {missions.map((mission, index) => {
              const position = getCardPosition(index);
              const Icon = mission.icon;
              
              if (position === 'hidden') return null;

              const isCenter = position === 'center';
              const isLeft = position === 'left';

              // Responsive card dimensions
              const centerWidth = 'clamp(240px, 80vw, 380px)';
              const centerHeight = 'clamp(350px, 65vh, 520px)';
              const sideWidth = 'clamp(180px, 60vw, 300px)';
              const sideHeight = 'clamp(280px, 50vh, 420px)';

              return (
                <motion.div
                  key={mission.id}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: isCenter ? 0 : isLeft ? 'clamp(-350px, -55vw, -280px)' : 'clamp(280px, 55vw, 350px)',
                    scale: isCenter ? 1 : 0.75,
                    opacity: isCenter ? 1 : 0.4,
                    z: isCenter ? 10 : 0,
                    filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  }}
                  style={{
                    width: isCenter ? centerWidth : sideWidth,
                    height: isCenter ? centerHeight : sideHeight,
                  }}
                >
                  <motion.button
                    className={`relative w-full h-full rounded-2xl overflow-hidden ${
                      isCenter ? 'cursor-pointer' : 'cursor-default pointer-events-none'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, rgba(26, 31, 53, 0.5) 0%, rgba(26, 31, 53, 0.2) 100%)`,
                      backdropFilter: 'blur(20px)',
                      border: `3px solid ${mission.color}`,
                      boxShadow: isCenter
                        ? `0 0 60px ${mission.color}80, 0 0 100px ${mission.color}40, 0 30px 80px rgba(0, 0, 0, 0.6), inset 0 0 80px rgba(255, 255, 255, 0.05)`
                        : `0 0 30px ${mission.color}40, 0 20px 40px rgba(0, 0, 0, 0.4)`,
                    }}
                    onClick={() => isCenter && onNavigate(mission.id as any)}
                    whileHover={isCenter ? {
                      scale: 1.02,
                      boxShadow: `0 0 80px ${mission.color}, 0 0 120px ${mission.color}60, 0 40px 100px rgba(0, 0, 0, 0.7)`,
                    } : {}}
                    whileTap={isCenter ? { scale: 0.98 } : {}}
                    onClickCapture={() => {
                      if (isCenter) {
                        playSelectSound();
                      }
                    }}
                  >
                    {/* Holographic glass overlay */}
                    <div 
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)',
                      }}
                    />

                    {/* Animated scan line - only on center card */}
                    {isCenter && (
                      <motion.div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: `linear-gradient(to bottom, transparent 0%, ${mission.color}30 50%, transparent 100%)`,
                          height: '150px',
                        }}
                        animate={{
                          y: ['-150px', '600px'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}

                    {/* Corner brackets - larger on center */}
                    <div 
                      className={`absolute top-0 left-0 border-t-[2px] md:border-t-[3px] border-l-[2px] md:border-l-[3px] ${isCenter ? 'w-12 h-12 md:w-20 md:h-20 opacity-80' : 'w-8 h-8 md:w-12 md:h-12 opacity-50'}`}
                      style={{ borderColor: mission.color }}
                    />
                    <div 
                      className={`absolute top-0 right-0 border-t-[2px] md:border-t-[3px] border-r-[2px] md:border-r-[3px] ${isCenter ? 'w-12 h-12 md:w-20 md:h-20 opacity-80' : 'w-8 h-8 md:w-12 md:h-12 opacity-50'}`}
                      style={{ borderColor: mission.color }}
                    />
                    <div 
                      className={`absolute bottom-0 left-0 border-b-[2px] md:border-b-[3px] border-l-[2px] md:border-l-[3px] ${isCenter ? 'w-12 h-12 md:w-20 md:h-20 opacity-80' : 'w-8 h-8 md:w-12 md:h-12 opacity-50'}`}
                      style={{ borderColor: mission.color }}
                    />
                    <div 
                      className={`absolute bottom-0 right-0 border-b-[2px] md:border-b-[3px] border-r-[2px] md:border-r-[3px] ${isCenter ? 'w-12 h-12 md:w-20 md:h-20 opacity-80' : 'w-8 h-8 md:w-12 md:h-12 opacity-50'}`}
                      style={{ borderColor: mission.color }}
                    />

                    {/* Content */}
                    <div className="relative z-30 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-white">
                      {/* Icon */}
                      <motion.div
                        className={`mb-4 sm:mb-6 md:mb-8 p-4 sm:p-6 md:p-8 rounded-full ${isCenter ? 'scale-100' : 'scale-75'}`}
                        style={{
                          background: `radial-gradient(circle, ${mission.color}40 0%, transparent 70%)`,
                          backdropFilter: 'blur(10px)',
                          border: `2px solid ${mission.color}`,
                        }}
                        animate={isCenter ? {
                          boxShadow: [
                            `0 0 30px ${mission.color}80`,
                            `0 0 60px ${mission.color}`,
                            `0 0 30px ${mission.color}80`,
                          ],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Icon 
                          size={isCenter ? (window.innerWidth < 640 ? 40 : window.innerWidth < 768 ? 48 : 56) : (window.innerWidth < 640 ? 32 : 40)} 
                          strokeWidth={2.5} 
                          style={{ color: mission.color }} 
                        />
                      </motion.div>

                      {/* Title */}
                      <h3 
                        className={`${isCenter ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-xl'} font-novaflat-title font-bold mb-2 sm:mb-3 text-center px-2`}
                        style={{
                          textShadow: `0 0 20px ${mission.color}80, 0 0 40px ${mission.color}40`,
                        }}
                      >
                        {mission.title}
                      </h3>

                      {/* Subtitle */}
                      <p 
                        className={`${isCenter ? 'text-xs sm:text-sm md:text-base' : 'text-xs sm:text-sm'} text-white/70 text-center uppercase tracking-wider mb-4 sm:mb-6 px-2`}
                        style={{
                          textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        {mission.subtitle}
                      </p>

                      {/* Progress bar - only on center */}
                      {isCenter && (
                        <div className="w-2/3 h-0.5 sm:h-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${mission.color} 0%, transparent 100%)`,
                              boxShadow: `0 0 15px ${mission.color}`,
                            }}
                            animate={{
                              width: ['40%', '80%', '40%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Center card pulsing glow */}
                    {isCenter && (
                      <motion.div
                        className="absolute inset-0 z-0 rounded-2xl"
                        style={{
                          background: `radial-gradient(circle at center, ${mission.color}20, transparent 70%)`,
                        }}
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[rgba(26,31,53,0.7)] border-2 border-[#00d4ff] text-[#00d4ff] backdrop-blur-md transition-all duration-300 hover:bg-[rgba(0,212,255,0.2)] hover:border-[#ffd700] hover:text-[#ffd700] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
        onClick={prevCard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </motion.button>

      <motion.button
        className="absolute right-2 sm:right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[rgba(26,31,53,0.7)] border-2 border-[#00d4ff] text-[#00d4ff] backdrop-blur-md transition-all duration-300 hover:bg-[rgba(0,212,255,0.2)] hover:border-[#ffd700] hover:text-[#ffd700] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
        onClick={nextCard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </motion.button>

      {/* Footer Status */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-18 left-0 right-0 text-center z-20 px-1 sm:px-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-2 md:px-4 py-1 sm:py-1 md:py-1 rounded-full bg-[rgba(26,31,53,0.6)] backdrop-blur-md border border-[#00d4ff]/30">
          <motion.div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00ff00] rounded-full"
            animate={{
              opacity: [1, 0.3, 1],
              boxShadow: [
                '0 0 10px #00ff00',
                '0 0 20px #00ff00',
                '0 0 10px #00ff00',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <span className="text-[10px] sm:text-xs md:text-sm text-[#00d4ff] tracking-wider uppercase font-medium">
            <span className="hidden sm:inline">Memory Integrity: 100% | Status: SYNCHRONIZED</span>
            <span className="sm:hidden">STATUS: SYNC</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionHub;
