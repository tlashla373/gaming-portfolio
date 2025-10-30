import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import placeholderAvatar from '../assets/images/profile/profile.png';
import roomBg from '../assets/images/profile/room.jpg';
import backSound from '../assets/sounds/page-back.wav';
import selectSound from '../assets/sounds/select-click.wav';

interface ProfileMemoryProps {
  onBack: () => void;
}

const ProfileMemory = ({ onBack }: ProfileMemoryProps) => {
  const [isAnimusActive, setIsAnimusActive] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectAudioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const playSelectSound = () => {
    if (!selectAudioRef.current) {
      selectAudioRef.current = new Audio(selectSound);
      selectAudioRef.current.volume = 0.5;
    }
    selectAudioRef.current.currentTime = 0;
    selectAudioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const timeline = [
  {
    year: '2023',
    title: 'Beginning of IT Journey',
    description: 'Joined NDT and started my IT career in September.',
  },
  {
    year: '2024',
    title: 'Frontend Development Training',
    description: 'Learned HTML, CSS, and JavaScript during 1st and 2nd semesters.',
  },
  {
    year: '2025',
    title: 'Workie.lk Project Initiation',
    description: 'Started final project and learned SDLC and documentation.',
  },
  {
    year: '2025',
    title: 'Learning React.js',
    description: 'Gained knowledge and experience in modern frontend development.',
  },
  {
    year: '2025',
    title: 'Backend & Database Skills',
    description: 'Learned API integration and MongoDB during development.',
  },
  {
    year: '2025',
    title: 'Project Development & Deployment',
    description: 'Completed and deployed Workie.lk; developed the frontend part.',
  },
];


  const AnimusMemoryView = () => (
    <AnimatePresence>
      {isAnimusActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-[rgba(5,8,16,0.95)] flex items-center justify-center overflow-hidden"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Digital noise background */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              animation: 'animusNoise 3s ease-in-out infinite alternate'
            }}
          />
          
          {/* Scan lines effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.03) 2px, rgba(0, 212, 255, 0.03) 4px)',
              animation: 'scanlineMove 2s linear infinite'
            }}
          />
          
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 right-8 bg-[rgba(0,212,255,0.2)] border-2 border-[#00d4ff] rounded-full w-[50px] h-[50px] flex items-center justify-center text-[#00d4ff] cursor-pointer transition-all duration-300 z-[10001] hover:bg-[rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:scale-110"
            onClick={() => setIsAnimusActive(false)}
          >
            <X size={24} />
          </motion.button>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center max-w-[800px] p-8"
          >
            {/* Animated avatar with pulse rings */}
            <div className="relative w-[200px] h-[200px] mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full top-0 left-0 border-2 border-[#00d4ff] rounded-full opacity-30 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%] border-2 border-[#00d4ff] rounded-full opacity-30 border-dotted"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full blur-[2px]"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)'
                }}
              />
              <div 
                className="absolute w-[60%] h-[60%] top-[20%] left-[20%] bg-gradient-to-br from-[#00d4ff] to-[#ffd700] rounded-full flex items-center justify-center text-5xl font-bold text-[#0a0e1a]"
                style={{
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }}
              >
                <img 
                  src={placeholderAvatar} 
                  alt="Hashintha Liyanaarachchi" 
                  className="w-full h-full rounded-full object-cover object-center border-4 border-blue-400 shadow-lg shadow-blue-400/50 brightness-110 contrast-110 cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => {
                    playSelectSound();
                    setIsImageFullscreen(true);
                  }}
                />
              </div>
            </div>

            {/* Holographic info display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-12"
            >
              <h2 
                className="font-novaflat text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
                }}
              >
                Hashintha Liyanaarachchi
              </h2>
              <p className="text-xl text-[#00d4ff] mb-6 uppercase tracking-[2px] opacity-90">Full Stack Software Engineer</p>
              <div className="relative w-[100px] h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto my-6">
                <div className="absolute top-[-2px] left-[-3px] w-[6px] h-[6px] bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff]"></div>
                <div className="absolute top-[-2px] right-[-3px] w-[6px] h-[6px] bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff]"></div>
              </div>
              <p className="text-lg leading-relaxed text-[rgba(255,255,255,0.8)] max-w-[600px]">
                Every line of code I write brings me closer to mastery. Specializing in crafting
                seamless digital experiences, from concept to production. My mission: transform
                ideas into reality with precision and elegance.
              </p>
            </motion.div>

            {/* Memory sync animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-full max-w-[400px]"
            >
              <div className="text-sm text-[#00d4ff] mb-4 uppercase tracking-wider opacity-80">MEMORY SYNCHRONIZATION</div>
              <div className="w-full h-1 bg-[rgba(0,212,255,0.2)] rounded-sm overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ffd700]"
                  style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                />
              </div>
              <div className="text-xs text-[#ffd700] text-right uppercase tracking-wider">100% COMPLETE</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const FullscreenImageViewer = () => (
    <AnimatePresence>
      {isImageFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsImageFullscreen(false)}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 right-4 z-[10001] bg-black/50 hover:bg-black/70 border-2 border-blue-400/50 hover:border-blue-400 rounded-full w-12 h-12 flex items-center justify-center text-blue-400 hover:text-white transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageFullscreen(false);
            }}
          >
            <X size={20} />
          </motion.button>

          {/* Fullscreen Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={placeholderAvatar}
              alt="Hashintha Liyanaarachchi - Full View"
              className="w-full h-full object-contain rounded-lg shadow-2xl shadow-blue-400/20 border-4 border-blue-400/30"
            />
            
            {/* Image info overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg"
            >
              <h3 className="font-novaflat-heading text-2xl font-bold text-white mb-2">Hashintha Liyanaarachchi</h3>
              <p className="text-blue-400 text-lg">Full Stack Software Engineer</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div 
      className="relative w-full min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url(${roomBg})`,
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
      ></motion.div>

      {/* Dark overlay with gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[rgba(15,20,34,0.85)] via-[rgba(10,14,26,0.75)] z-0" />

      {/* Ambient glow effect */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)'
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving particles effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.1) 0%, transparent 40%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.08) 0%, transparent 40%)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="relative z-10 w-full min-h-screen overflow-y-auto">
        <motion.button 
          className="fixed top-8 left-8 z-[100] flex items-center gap-2 px-6 py-3 bg-[rgba(26,31,53,0.9)] border border-[rgba(0,212,255,0.3)] text-white text-sm cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          style={{ backdropFilter: 'blur(10px)' }}
          onClick={() => {
            playBackSound();
            onBack();
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Return to Hub</span>
        </motion.button>

        <motion.div 
          className="text-center mb-16 pt-24 pb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-[3.5rem] font-bigspace font-bold tracking-[0.2em] text-[#00d4ff] mb-2">PROFILE MEMORY</h1>
          <p className="text-base text-[#a0a0a0]">Origin Story: The Making of a Developer</p>
        </motion.div>

        <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-2">
          <motion.div 
            className="relative flex flex-col md:flex-row gap-12 mb-8 p-8 bg-gradient-to-br from-[rgba(26,31,53,0.6)] via-[rgba(26,31,53,0.4)] to-[rgba(26,31,53,0.6)] border-2 border-[#00d4ff] items-center rounded-lg shadow-[0_0_30px_rgba(0,212,255,0.3)] backdrop-blur-sm overflow-hidden group hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] transition-all duration-500"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >            
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'scan 3s linear infinite' }}></div>
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'scan 3s linear infinite' }}></div>
            
            <div 
              className="relative w-[150px] h-[150px] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 z-10" 
              onClick={() => {
                playSelectSound();
                setIsAnimusActive(true);
              }}
            >
              <div 
                className="absolute inset-[-10px] border-2 border-[#00d4ff] rounded-full opacity-60 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                style={{ animation: 'rotate 6s linear infinite' }}
              ></div>
              <div 
                className="absolute inset-[-20px] border-2 border-[#00d4ff] rounded-full opacity-40"
                style={{ animation: 'rotate 8s linear infinite reverse' }}
              ></div>
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00d4ff] to-[#ffd700] rounded-full">
                <img 
                  src={placeholderAvatar} 
                  alt="Hashintha Liyanaarachchi" 
                  className="w-full h-full rounded-full object-cover object-center border-2 border-blue-400/30 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/40"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left z-10 cursor-pointer"
            onClick={() => {
              playSelectSound();
              setIsAnimusActive(true);
            }}>
              <h2 className="font-novaflat-heading text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">Hashintha Liyanaarachchi</h2>
              <p className="text-lg text-[#00d4ff] mb-4 drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">Full Stack Software Engineer</p>
              <p className="text-base leading-relaxed text-[#a0a0a0]">
                Every line of code I write brings me closer to mastery. Specializing in crafting
                seamless digital experiences, from concept to production. 
                My mission: transform ideas into reality with precision and elegance.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-2xl font-novaflat-title font-semibold text-[#00d4ff] mb-8 text-center">Memory Timeline</h3>
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-[#00d4ff] before:to-transparent">
              {timeline.map((event, index) => (
                <motion.div 
                  key={index} 
                  className="relative mb-12 group"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                >
                  <div 
                    className="absolute left-[-2rem] top-2 w-3 h-3 bg-[#00d4ff] border-2 border-[#050810] rounded-full animate-pulse"
                    style={{ boxShadow: '0 0 10px #00d4ff' }}
                  ></div>
                  <div className="relative p-6 bg-gradient-to-br from-[rgba(26,31,53,0.6)] via-[rgba(26,31,53,0.4)] to-[rgba(26,31,53,0.6)] border-2 border-[#00d4ff] rounded-lg shadow-[0_0_20px_rgba(0,212,255,0.2)] backdrop-blur-sm transition-all duration-300 hover:border-[#ffd700] hover:bg-[rgba(26,31,53,0.7)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:scale-[1.02] overflow-hidden">
                    {/* Corner decorations */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#ffd700] opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#ffd700] opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Holographic glitch effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animation: 'hologram-sweep 2s ease-in-out infinite' }}></div>
                    
                    <span className="relative inline-block px-3 py-1 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-[#0a0e1a] text-sm font-semibold mb-3 shadow-[0_0_10px_rgba(0,212,255,0.5)] z-10">{event.year}</span>
                    <h4 className="relative text-xl font-semibold text-white mb-2 drop-shadow-[0_0_8px_rgba(0,212,255,0.3)] z-10">{event.title}</h4>
                    <p className="relative text-[0.938rem] leading-relaxed text-[#a0a0a0] z-10">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animus Memory View Overlay */}
      <AnimusMemoryView />

      {/* Fullscreen Image Viewer */}
      <FullscreenImageViewer />
    </motion.div>
  );
};

export default ProfileMemory;
