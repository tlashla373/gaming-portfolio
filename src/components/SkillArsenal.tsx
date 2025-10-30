import { useState, useRef } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { motion } from 'framer-motion';
import roomBg from '../assets/images/profile/room.jpg';
import backSound from '../assets/sounds/page-back.wav';

interface SkillArsenalProps {
  onBack: () => void;
}

interface Skill {
  name: string;
  category: string;
  power: number;
  agility: number;
  mastery: number;
  description: string;
}

const SkillArsenal = ({ onBack }: SkillArsenalProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const skills: Skill[] = [
  {
    name: 'React.js',
    category: 'Frontend Framework',
    power: 85,
    agility: 88,
    mastery: 86,
    description: 'Building dynamic, component-based user interfaces using modern React patterns and hooks.',
  },
  {
    name: 'Next.js',
    category: 'Full Stack Framework',
    power: 50,
    agility: 55,
    mastery: 52,
    description: 'Developing server-side rendered and static web applications with Next.js framework.',
  },
  {
    name: 'Node.js',
    category: 'Backend Runtime',
    power: 50,
    agility: 52,
    mastery: 51,
    description: 'Creating backend logic and RESTful APIs with asynchronous JavaScript handling.',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    power: 75,
    agility: 72,
    mastery: 74,
    description: 'Managing NoSQL databases with schema design, queries, and data aggregation.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling Framework',
    power: 80,
    agility: 85,
    mastery: 82,
    description: 'Designing responsive, modern, and clean interfaces using utility-first CSS classes.',
  },
  {
    name: 'Git',
    category: 'Version Control',
    power: 80,
    agility: 82,
    mastery: 81,
    description: 'Handling version control, branching, and collaborative workflows efficiently.',
  },
  {
    name: 'Java',
    category: 'Programming Language',
    power: 60,
    agility: 62,
    mastery: 61,
    description: 'Building object-oriented applications and strengthening programming fundamentals.',
  },
  {
    name: 'Python',
    category: 'Programming Language',
    power: 60,
    agility: 63,
    mastery: 61,
    description: 'Writing scripts, automations, and backend logic with Python.',
  },
];


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
      <div className="relative z-10 min-h-screen overflow-y-auto pt-24 pb-16 px-8">
        {/* Back Button */}
        <motion.button 
          className="fixed top-8 left-8 z-20 flex items-center gap-2 px-6 py-3 bg-[rgba(26,31,53,0.9)] border border-[rgba(0,212,255,0.3)] text-white text-sm cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] backdrop-blur-[10px]"
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-[3.5rem] font-bigspace font-bold tracking-[0.2em] text-[#00d4ff] mb-2">
            SKILL ARSENAL
          </h1>
          <p className="text-base text-[#a0a0a0]">
            Weapons & Tools at Your Disposal
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.button
              key={index}
              className="relative p-8 bg-gradient-to-br from-[rgba(26,31,53,0.6)] via-[rgba(26,31,53,0.4)] to-[rgba(26,31,53,0.6)] border-2 border-[#00d4ff] rounded-lg cursor-pointer transition-all duration-300 overflow-hidden hover:border-[#ffd700] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,212,255,0.3)] group"
              onClick={() => setSelectedSkill(skill)}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + (index * 0.08),
                ease: "easeOut"
              }}
              whileHover={{ y: -4 }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Holographic Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[hologram-sweep_1s_ease-in-out]"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-[#a0a0a0] mb-4">
                  {skill.category}
                </p>
                <div className="text-sm text-[#00d4ff]">
                  <span>Mastery: {skill.mastery}%</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {selectedSkill && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] animate-[fade-in_0.3s_ease]"
          onClick={() => setSelectedSkill(null)}
        >
          <div 
            className="relative w-[90%] max-w-[600px] p-12 bg-gradient-to-br from-[rgba(26,31,53,0.95)] via-[rgba(26,31,53,0.98)] to-[rgba(26,31,53,0.95)] border-2 border-[#00d4ff] rounded-lg shadow-[0_20px_60px_rgba(0,212,255,0.3)] animate-[slide-up_0.3s_ease] backdrop-blur-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold Corner Decorations */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ffd700]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ffd700]"></div>
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 bg-transparent border-none text-white cursor-pointer p-2 transition-all duration-300 hover:text-[#00d4ff] hover:rotate-90"
              onClick={() => setSelectedSkill(null)}
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-[2rem] font-bold text-[#00d4ff] mb-2">
              {selectedSkill.name}
            </h2>
            <p className="text-base text-[#a0a0a0] mb-8">
              {selectedSkill.category}
            </p>

            {/* Stat Bars */}
            <div className="mb-8">
              {/* Power */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-[#a0a0a0]">
                  <span>Power</span>
                  <span>{selectedSkill.power}</span>
                </div>
                <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ffd700] transition-all duration-500 shadow-[0_0_10px_#00d4ff]"
                    style={{ width: `${selectedSkill.power}%` }}
                  ></div>
                </div>
              </div>

              {/* Agility */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-[#a0a0a0]">
                  <span>Agility</span>
                  <span>{selectedSkill.agility}</span>
                </div>
                <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ffd700] transition-all duration-500 shadow-[0_0_10px_#00d4ff]"
                    style={{ width: `${selectedSkill.agility}%` }}
                  ></div>
                </div>
              </div>

              {/* Mastery */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-[#a0a0a0]">
                  <span>Mastery</span>
                  <span>{selectedSkill.mastery}</span>
                </div>
                <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ffd700] transition-all duration-500 shadow-[0_0_10px_#00d4ff]"
                    style={{ width: `${selectedSkill.mastery}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-[#a0a0a0] mb-8">
              {selectedSkill.description}
            </p>

            {/* Sync Status */}
            <div className="flex items-center gap-2 text-sm text-[#00d4ff]">
              <span className="w-2 h-2 bg-[#00d4ff] rounded-full animate-[blink_2s_ease-in-out_infinite]"></span>
              <span>Skill Synced</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillArsenal;
