import { useState, useRef } from 'react';
import { ArrowLeft, X, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import roomBg from '../assets/images/profile/room.jpg';
import workieImg from '../assets/images/projects/Workie.LK_project.png';
import eventEaseImg from '../assets/images/projects/Event_ease_project.png';
import aiChatbotImg from '../assets/images/projects/AI_chatbot_project.png';
import agmeImg from '../assets/images/projects/AgMe_project.png';
import conferenceImg from '../assets/images/projects/Conference_management_project.png';
import backSound from '../assets/sounds/page-back.wav';

interface CompletedMissionsProps {
  onBack: () => void;
}

interface Project {
  title: string;
  objective: string;
  description: string;
  tools: string[];
  image: string;
  github?: string;
  demo?: string;
}

const CompletedMissions = ({ onBack }: CompletedMissionsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

const projects: Project[] = [
  {
    title: 'Workie.lk',
    objective: 'Build a scalable freelance connection network',
    description: 'A comprehensive platform connecting freelancers with clients across Sri Lanka. Features include profile management, job posting, real-time chat, secure payment integration, and rating systems.',
    tools: ['React', 'Node.js', 'MongoDB', 'Flutter', 'Socket.io'],
    image: workieImg,
    github: 'https://github.com/tlashla373/Workie.lk.git',
    demo: 'https://workie-lk.vercel.app/',
  },
  {
    title: 'EventEase',
    objective: 'Efficient event management system',
    description: 'Manage events, attendees, and schedules seamlessly. Features include event creation, participant tracking, and notifications.',
    tools: ['React', 'Firebase', 'Tailwind CSS'],
    image: eventEaseImg,
    github: 'https://github.com/tlashla373/EventEase.git',
    demo: '',
  },
  {
    title: 'AI ChatBot',
    objective: 'Interactive AI-powered chatbot',
    description: 'A chatbot capable of handling queries and providing conversational responses using AI technologies.',
    tools: ['Next.js', 'Tailwind CSS', 'OpenAI API'],
    image: aiChatbotImg,
    github: 'https://github.com/tlashla373/AI-chat-Interface.git',
    demo: '',
  },
  {
    title: 'AgMe Harvest Management System',
    objective: 'Manage harvests and farm data efficiently',
    description: 'Web-based system for managing crops, harvests, and farm-related data using a simple and interactive interface.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image: agmeImg,
    github: 'https://github.com/tlashla373/AgMe-Web.git',
    demo: 'https://tlashla373.github.io/AgMe-Web/',
  },
  {
    title: 'Conference Management System',
    objective: 'Manage conferences and attendees',
    description: 'System for conference management with QR code generation for attendees, schedules, and participant tracking.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image: conferenceImg,
    github: 'https://github.com/tlashla373/Conference-Management-System.git',
    demo: 'https://tlashla373.github.io/Conference-Management-System/',
  },
];


  return (
    <motion.div 
      className="completed-missions relative w-full min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="missions-bg fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat z-0"
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
      
      <div className="relative z-10 w-full min-h-screen overflow-y-auto">
        <motion.button 
          className="back-button sticky top-4 left-4 z-20" 
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
          className="text-center mb-16 py-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-[3.5rem] font-bigspace-title font-bold tracking-[0.2em] text-[#00d4ff] mb-2">COMPLETED MISSIONS</h1>
          <p className="text-base text-[#a0a0a0]">Historical Records of Achievement</p>
        </motion.div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 px-4 md:px-8 py-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden border-2 border-[rgba(0,212,255,0.2)] transition-all duration-300 hover:border-[#00d4ff] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.3)] group"
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5 + (index * 0.1),
              ease: "easeOut"
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-[200px] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(10,14,26,0.9)]"></div>
            </div>
            <div className="p-6 bg-[#1a1f35]">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-[#a0a0a0]">{project.objective}</p>
            </div>
          </motion.div>
          ))}
        </div>

        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#1a1f35] to-[#0a0e1a] border border-[#00d4ff] sm:border-2 shadow-[0_0_30px_rgba(0,212,255,0.4),inset_0_0_30px_rgba(0,212,255,0.08)] sm:shadow-[0_0_50px_rgba(0,212,255,0.5),inset_0_0_50px_rgba(0,212,255,0.1)] rounded-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Corner brackets - hidden on mobile */}
              <div className="hidden sm:block absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-[#00d4ff] opacity-80" />
              <div className="hidden sm:block absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 border-[#00d4ff] opacity-80" />
              <div className="hidden sm:block absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-[#00d4ff] opacity-80" />
              <div className="hidden sm:block absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-[#00d4ff] opacity-80" />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.15), transparent 70%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Close button */}
              <motion.button 
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[rgba(26,31,53,0.9)] border border-[#00d4ff] sm:border-2 text-[#00d4ff] rounded-lg hover:bg-[rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} className="sm:w-6 sm:h-6" />
              </motion.button>

              {/* Scrollable content */}
              <div className="relative z-10 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] p-4 sm:p-6 md:p-8 lg:p-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
                  <div className="flex-1 w-full pr-0 sm:pr-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#00d4ff] mb-2 font-novaflat-title drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] break-words">
                      {selectedProject.title}
                    </h2>
                    <motion.div
                      className="h-1 bg-gradient-to-r from-[#00d4ff] via-[#ffd700] to-transparent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <motion.span 
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(0,212,255,0.2)] border border-[#00d4ff] text-[#00d4ff] text-[10px] sm:text-xs font-bold tracking-wider rounded whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    COMPLETED
                  </motion.span>
                </div>

                {/* Objective */}
                <motion.div 
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[rgba(0,212,255,0.05)] border-l-2 sm:border-l-4 border-[#00d4ff] rounded-r"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="block text-[10px] sm:text-xs font-bold tracking-widest text-[#00d4ff] mb-2">OBJECTIVE:</span>
                  <p className="text-white text-sm sm:text-base">{selectedProject.objective}</p>
                </motion.div>

                {/* Description */}
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="block text-xs sm:text-sm font-semibold text-[#00d4ff] mb-2 sm:mb-3 tracking-wide">MISSION BRIEFING:</span>
                  <p className="text-[#a0a0a0] text-sm sm:text-base leading-relaxed">{selectedProject.description}</p>
                </motion.div>

                {/* Tools */}
                <motion.div 
                  className="mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="block text-xs sm:text-sm font-semibold text-[#00d4ff] mb-3 sm:mb-4 tracking-wide">TOOLS DEPLOYED:</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.tools.map((tool, idx) => (
                      <motion.span 
                        key={idx} 
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[rgba(26,31,53,0.8)] border border-[rgba(0,212,255,0.3)] text-white text-xs sm:text-sm rounded hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + (idx * 0.05) }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[rgba(0,212,255,0.2)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {selectedProject.github && (
                    <motion.a 
                      href={selectedProject.github} 
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-transparent border border-[#00d4ff] sm:border-2 text-white font-semibold text-xs sm:text-sm rounded hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] sm:hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all duration-300 w-full sm:w-auto"
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span>View Code</span>
                    </motion.a>
                  )}
                  {selectedProject.demo && (
                    <motion.a 
                      href={selectedProject.demo} 
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-transparent border border-[#00d4ff] sm:border-2 text-white font-semibold text-xs sm:text-sm rounded hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] sm:hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all duration-300 w-full sm:w-auto"
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CompletedMissions;
