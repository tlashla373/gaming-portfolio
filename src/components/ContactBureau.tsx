import { useState, useRef } from 'react';
import { ArrowLeft, Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import roomBg from '../assets/images/profile/room.jpg';
import backSound from '../assets/sounds/page-back.wav';

interface ContactBureauProps {
  onBack: () => void;
}

const ContactBureau = ({ onBack }: ContactBureauProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backSound);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play error:', e));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_4oxwahh';
      const templateId = 'template_d6eg5a1';
      const publicKey = 'lmsvAFCig3IOLBCDn';

      // Get current timestamp for {{time}}
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      // Send email using EmailJS - matching template variables
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,          // {{name}} - sender's name
          reply_to: formData.email,     // {{reply_to}} - sender's email (also sets Reply-To header)
          subject: formData.subject,    // {{subject}} - email subject
          message: formData.message,    // {{message}} - email message
          time: formattedTime,          // {{time}} - formatted timestamp
          to_name: 'Supun Hashintha',
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          <h1 className="text-[3.5rem] font-bigspace-title font-bold tracking-[0.2em] text-[#00d4ff] mb-2 drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]">
            CONTACT BUREAU
          </h1>
          <p className="text-base text-[#a0a0a0]">
            Brotherhood Communication Network
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 px-4 md:px-8 py-2">
          {/* Contact Info Card */}
          <motion.div 
            className="relative p-8 bg-gradient-to-br from-[rgba(26,31,53,0.6)] to-[rgba(61,68,99,0.4)] border-2 border-[#8361ff] rounded-lg h-fit shadow-[0_0_20px_rgba(0,212,255,0.2)] group hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <h2 className="text-2xl font-semibold text-[#00d4ff] mb-4">
              Establish Connection
            </h2>
            <p className="text-[0.938rem] leading-relaxed text-[#a0a0a0] mb-8">
              Send an encrypted message to initiate contact. All communications are secure and monitored by the Brotherhood.
            </p>

            {/* Contact Details */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-4 p-4 bg-[rgba(0,212,255,0.05)] border-l-2 border-[#00d4ff] text-[#a0a0a0] text-[0.938rem]">
                <Mail size={20} className="text-[#00d4ff]" />
                <span>hashinthaliyanaarchchi373@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[rgba(0,212,255,0.05)] border-l-2 border-[#00d4ff] text-[#a0a0a0] text-[0.938rem]">
                <MapPin size={20} className="text-[#00d4ff]" />
                <span>Sri Lanka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/tlashla373" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-[50px] h-[50px] bg-[rgba(26,31,53,0.6)] border-2 border-[rgba(0,212,255,0.3)] text-white rounded transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,212,255,0.3)]"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/supun-hashintha-2164b3218/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-[50px] h-[50px] bg-[rgba(26,31,53,0.6)] border-2 border-[rgba(0,212,255,0.3)] text-white rounded transition-all duration-300 hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,212,255,0.3)]"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            className="relative p-8 bg-gradient-to-br from-[rgba(26,31,53,0.6)] to-[rgba(26,31,53,0.4)] border-2 border-[#8361ff] rounded-lg shadow-[0_0_20px_rgba(0,212,255,0.2)] group hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00d4ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#00d4ff] tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(10,14,26,0.6)] border border-[rgba(0,212,255,0.2)] text-white text-base rounded transition-all duration-300 focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#00d4ff] tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(10,14,26,0.6)] border border-[rgba(0,212,255,0.2)] text-white text-base rounded transition-all duration-300 focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                  required
                />
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-semibold text-[#00d4ff] tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(10,14,26,0.6)] border border-[rgba(0,212,255,0.2)] text-white text-base rounded transition-all duration-300 focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-[#00d4ff] tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(10,14,26,0.6)] border border-[rgba(0,212,255,0.2)] text-white text-base rounded resize-y min-h-[150px] transition-all duration-300 focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-transparent border-2 border-[#00d4ff] text-white text-base font-semibold tracking-wider cursor-pointer rounded transition-all duration-300 hover:bg-[rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></span>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Transmission</span>
                  </>
                )}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="flex items-center justify-center gap-2 mt-4 p-4 bg-[rgba(0,255,0,0.1)] border border-[rgba(0,255,0,0.3)] text-[#00ff00] text-[0.938rem] rounded animate-[fade-in_0.3s_ease]">
                  <span className="text-2xl">✓</span>
                  <span>Message delivered to the Brotherhood.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="flex items-center justify-center gap-2 mt-4 p-4 bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.3)] text-[#ff0000] text-[0.938rem] rounded animate-[fade-in_0.3s_ease]">
                  <span className="text-2xl">✗</span>
                  <span>Transmission failed. Please try again.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="max-w-[1100px] mx-auto mt-8 text-center pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(26,31,53,0.4)] border border-[rgba(0,212,255,0.2)] text-sm text-[#a0a0a0] rounded">
            <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-[blink_2s_ease-in-out_infinite]"></span>
            <span>Secure Connection Established</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactBureau;
