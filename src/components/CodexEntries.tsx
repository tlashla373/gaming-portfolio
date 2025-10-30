import { useState, useRef } from 'react';
import { ArrowLeft, ChevronDown, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import roomBg from '../assets/images/profile/room.jpg';
import backSound from '../assets/sounds/page-back.wav';

interface CodexEntriesProps {
  onBack: () => void;
}

const CodexEntries = ({ onBack }: CodexEntriesProps) => {
  const [openEntry, setOpenEntry] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const entries = [
    {
      type: 'certificate',
      title: 'Docker For Absolute Beginners',
      organization: 'KodeKloud',
      date: '2025',
      description: 'Comprehensive course covering Docker fundamentals, containerization, and orchestration.',
    },
    {
      type: 'certificate',
      title: 'Linux For Absolute Beginners',
      organization: 'KodeKloud',
      date: '2025',
      description: 'A beginner-friendly, hands-on Linux crash course teaching core commands, filesystem navigation, and basic system management. No prior experience required.',
    },
    {
      type: 'certificate',
      title: 'ACE Multicloud Network Associate Course',
      organization: 'AVIATRIX',
      date: '2025',
      description: 'The ACE Multicloud Network Associate training is the starting point for your multicloud networking and security education. Learn the fundamentals and unlock a world of possibilities in the cloud networking industry!',
    },
  ];

  const toggleEntry = (index: number) => {
    setOpenEntry(openEntry === index ? null : index);
  };

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
      <div className="fixed inset-0 bg-gradient-to-b from-[rgba(10,14,26,0.85)] via-[rgba(10,14,26,0.75)] z-0" />

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
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full min-h-screen overflow-y-auto">
        {/* Back Button */}
        <motion.button 
          className="sticky top-8 left-8 z-20 flex items-center gap-2 px-6 py-3 bg-[rgba(26,31,53,0.9)] border border-[rgba(0,212,255,0.3)] text-white text-sm cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] backdrop-blur-[10px] ml-8"
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

        {/* Header */}
        <motion.div 
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-[4rem]  font-bigspace-title font-bold tracking-[0.2em] text-[#00d4ff] mb-2 drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]">
            CODEX ENTRIES
          </h1>
          <p className="text-base text-[#a0a0a0]">
            Knowledge Archive & Achievements
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8">
          {/* Entries List */}
          <div className="mb-12">
            {entries.map((entry, index) => (
              <motion.div 
                key={index} 
                className={`relative mb-4 border-2 border-[#5f5ce4] rounded-lg overflow-hidden transition-all duration-300 ${
                  openEntry === index 
                    ? 'bg-gradient-to-br from-[rgba(26,31,53,0.7)] via-[rgba(26,31,53,0.5)] to-[rgba(26,31,53,0.7)] shadow-[0_0_30px_rgba(0,212,255,0.3)]' 
                    : 'bg-gradient-to-br from-[rgba(26,31,53,0.5)] to-[rgba(26,31,53,0.3)]'
                } hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:bg-gradient-to-br hover:from-[rgba(0,212,255,0.05)] hover:via-[rgba(26,31,53,0.5)] hover:to-[rgba(0,212,255,0.05)] group`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ x: 4 }}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Entry Header */}
                <button 
                  className="w-full flex items-center gap-6 p-6 bg-transparent border-none cursor-pointer text-white text-left transition-all duration-300 hover:bg-[rgba(0,212,255,0.05)]"
                  onClick={() => toggleEntry(index)}
                >
                  {/* Icon */}
                  <div className="text-[#00d4ff] flex-shrink-0">
                    {entry.type === 'certificate' ? (
                      <Award size={24} />
                    ) : (
                      <BookOpen size={24} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">
                      {entry.organization}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#00d4ff]">
                      {entry.date}
                    </span>
                    <ChevronDown 
                      className={`text-[#a0a0a0] transition-transform duration-300 ${
                        openEntry === index ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </div>
                </button>

                {/* Entry Details */}
                {openEntry === index && (
                  <div className="relative px-6 pb-6 pt-2 border-t border-[rgba(0,212,255,0.2)] bg-[rgba(10,14,26,0.4)] animate-[slide-down_0.3s_ease]">
                    {/* Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"></div>
                    
                    {/* Description */}
                    <p className="text-[0.938rem] leading-relaxed text-[#a0a0a0] mb-4">
                      {entry.description}
                    </p>

                    {/* Footer */}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="p-8 bg-[rgba(26,31,53,0.4)] border border-[#6779df] rounded-lg text-center transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] group">
              <div className="text-[2.5rem] font-bold text-[#00d4ff] mb-2 group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all duration-300">
                3
              </div>
              <div className="text-sm text-[#a0a0a0]">
                Total Entries
              </div>
            </div>
            <div className="p-8 bg-[rgba(26,31,53,0.4)] border border-[#6779df] rounded-lg text-center transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] group">
              <div className="text-[2.5rem] font-bold text-[#00d4ff] mb-2 group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all duration-300">
                3
              </div>
              <div className="text-sm text-[#a0a0a0]">
                Certificates
              </div>
            </div>
            <div className="p-8 bg-[rgba(26,31,53,0.4)] border border-[#6779df] rounded-lg text-center transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] group">
              <div className="text-[2.5rem] font-bold text-[#00d4ff] mb-2 group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all duration-300">
                0
              </div>
              <div className="text-sm text-[#a0a0a0]">
                Achievements
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodexEntries;
