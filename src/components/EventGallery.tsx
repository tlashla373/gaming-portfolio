import { useState, useRef } from 'react';
import { ArrowLeft, X, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import roomBg from '../assets/images/profile/room.jpg';
import event_01 from '../assets/images/events/event_01.jpg';
import backSound from '../assets/sounds/page-back.wav';

interface EventGalleryProps {
  onBack: () => void;
}

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  event: string;
  location: string;
  date: string;
  description: string;
}

const EventGallery = ({ onBack }: EventGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const images: GalleryImage[] = [
    {
    id: 1,
    src: event_01,
    title: 'CNCF 10th Anniversary Celebration',
    event: 'CNCF 10th Anniversary',
    location: 'WSO2, Colombo, Sri Lanka',
    date: 'October 2025',
    description: 'Attended CNCF 10th Anniversary event. Learned about CI/CD pipelines, ArgoCD, OpenChoreo, and Kubernetes. Networking with the cloud-native community.',
  },
  ];

  return (
    <motion.div 
      className="event-gallery relative w-full min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="gallery-bg fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url(${roomBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
        className="text-center mb-16 pt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className="text-[3.5rem] font-bigspace font-bold tracking-[0.2em] text-[#00d4ff] mb-2">MEMORY GALLERY</h1>
        <p className="text-base text-[#a0a0a0]">Event Chronicles & Captured Moments</p>
      </motion.div>

      <div className="gallery-container max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item relative cursor-pointer overflow-hidden border-2 border-blue-400/20 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 aspect-video group"
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + (index * 0.08),
                ease: "easeOut"
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="gallery-image-container relative w-full h-full">
                <img src={image.src} alt={image.title} className="gallery-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="gallery-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="overlay-content p-6 w-full">
                    <h3 className="overlay-title text-lg font-bold text-white mb-2">{image.title}</h3>
                    <p className="overlay-event text-sm text-blue-400">{image.event}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <motion.div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#1a1f35] to-[#0a0e1a] border border-[#00d4ff] sm:border-2 shadow-[0_0_30px_rgba(0,212,255,0.4),inset_0_0_30px_rgba(0,212,255,0.08)] sm:shadow-[0_0_50px_rgba(0,212,255,0.5),inset_0_0_50px_rgba(0,212,255,0.1)] rounded-lg"
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
                setSelectedImage(null);
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} className="sm:w-6 sm:h-6" />
            </motion.button>

            {/* Scrollable content */}
            <div className="relative z-10 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Image Section */}
              <motion.div 
                className="relative aspect-video lg:aspect-auto lg:h-full rounded-lg overflow-hidden border border-[rgba(0,212,255,0.3)] sm:border-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>

              {/* Info Section */}
              <motion.div 
                className="flex flex-col justify-between"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Title */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#00d4ff] mb-2 sm:mb-3 font-novaflat-title drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] break-words">
                    {selectedImage.title}
                  </h2>
                  <motion.div
                    className="h-0.5 sm:h-1 bg-gradient-to-r from-[#00d4ff] via-[#ffd700] to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>

                {/* Meta Info */}
                <motion.div 
                  className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] rounded-full">
                    <Calendar size={14} className="sm:w-[18px] sm:h-[18px] text-[#00d4ff]" />
                    <span className="text-xs sm:text-sm text-white">{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] rounded-full">
                    <MapPin size={14} className="sm:w-[18px] sm:h-[18px] text-[#00d4ff]" />
                    <span className="text-xs sm:text-sm text-white">{selectedImage.location}</span>
                  </div>
                </motion.div>

                {/* Event */}
                <motion.div 
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[rgba(0,212,255,0.05)] border-l-2 sm:border-l-4 border-[#00d4ff] rounded-r"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="block text-[10px] sm:text-xs font-bold tracking-widest text-[#00d4ff] mb-2">EVENT:</span>
                  <p className="text-white text-sm sm:text-base">{selectedImage.event}</p>
                </motion.div>

                {/* Description */}
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="block text-xs sm:text-sm font-semibold text-[#00d4ff] mb-2 sm:mb-3 tracking-wide">MEMORY DETAILS:</span>
                  <p className="text-[#a0a0a0] text-sm sm:text-base leading-relaxed">{selectedImage.description}</p>
                </motion.div>

                {/* Memory Stamp */}
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 bg-[rgba(255,215,0,0.1)] border border-[#ffd700] rounded-lg mt-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.span 
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ffd700] rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 5px rgba(255,215,0,0.5)',
                        '0 0 15px rgba(255,215,0,0.8)',
                        '0 0 5px rgba(255,215,0,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-[#ffd700] text-xs sm:text-sm font-bold tracking-wider">MEMORY AUTHENTICATED</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </div>
    </motion.div>
  );
};

export default EventGallery;
