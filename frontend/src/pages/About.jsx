import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiLayout, FiDatabase, FiServer, FiShield, FiArrowRight, FiCheckCircle, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 selection:bg-primary-500/30 font-sans transition-colors duration-300">
      
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/10 dark:bg-primary-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 dark:bg-indigo-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-[1px] w-8 bg-primary-500"></div>
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-[0.2em] uppercase">
              About The Developer
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            Building digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            I am an engineer focused on crafting robust, scalable architectures and premium user experiences for forward-thinking clients.
          </p>
        </motion.div>

        {/* Profile Showcase (Bento Grid Style) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32"
        >
          {/* Main Portrait Card */}
          <motion.div 
            variants={fadeIn}
            className="md:col-span-5 h-[500px] rounded-[2rem] overflow-hidden relative group bg-gray-100 dark:bg-dark-card border border-white dark:border-white/[0.05] shadow-xl dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            <img 
              src="/developer_avatar.jpg" 
              alt="Darshan H D" 
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">Darshan H D</h2>
              <p className="text-gray-300 font-medium text-lg mb-6">Full Stack Developer & Architect</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md">
                  <FiLinkedin size={20} />
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md">
                  <FiGithub size={20} />
                </a>
                <a href="mailto:contact@example.com" className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md">
                  <FiMail size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Tech Stack */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Bio Card */}
            <motion.div 
              variants={fadeIn}
              className="flex-1 card p-10"
            >
              <h3 className="text-2xl font-bold mb-6 tracking-tight">My Philosophy</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Software development is more than writing code; it is the art of solving complex business problems through elegant, maintainable engineering. I specialize in the full lifecycle of product development—from system architecture and database design to modern, responsive frontend interfaces.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                By maintaining a relentless focus on performance, security, and user experience, I ensure that the solutions I build do not just function—they thrive in production environments.
              </p>
            </motion.div>

            {/* Tech Stack Grid */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: 'Frontend', icon: FiLayout, color: 'text-primary-500' },
                { label: 'Backend', icon: FiServer, color: 'text-indigo-400' },
                { label: 'Database', icon: FiDatabase, color: 'text-violet-500' },
                { label: 'Security', icon: FiShield, color: 'text-fuchsia-500' }
              ].map((tech, idx) => (
                <div key={idx} className="card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-2 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-indigo-500/0 group-hover:from-primary-500/10 group-hover:to-indigo-500/10 transition-colors duration-500 pointer-events-none rounded-[2rem]"></div>
                  <tech.icon className={`${tech.color} mb-3 group-hover:scale-110 transition-transform duration-500 relative z-10`} size={28} strokeWidth={1.5} />
                  <span className="font-semibold text-gray-900 dark:text-gray-200 text-sm relative z-10">{tech.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Articles / Core Beliefs */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32"
        >
          {/* Article 1 */}
          <motion.div 
            variants={fadeIn}
            className="group"
          >
            <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-800 mb-8 relative">
              <div className="absolute top-0 left-0 h-full w-0 bg-primary-500 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <span className="text-primary-500 font-mono text-sm sm:mr-6 mb-4 sm:mb-0 mt-1">01</span>
              <div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">The Value of Building</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  In an industry saturated with tutorials, true mastery is forged through hands-on building. Constructing projects from the ground up forces you to confront real-world edge cases, optimize performance, and architect systems that endure. It is the definitive proof of engineering capability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Article 2 */}
          <motion.div 
            variants={fadeIn}
            className="group"
          >
            <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-800 mb-8 relative">
              <div className="absolute top-0 left-0 h-full w-0 bg-indigo-500 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <span className="text-indigo-500 font-mono text-sm sm:mr-6 mb-4 sm:mb-0 mt-1">02</span>
              <div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">The Freelance Edge</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  Freelancing accelerates professional maturity. It demands rigorous communication, strict adherence to deadlines, and the delivery of production-ready software that solves tangible business problems. It transforms a coder into a technical consultant and solutions architect.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gray-900 dark:bg-[#111] rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-gray-800 dark:border-white/[0.05]"
        >
          {/* Subtle grid pattern inside CTA */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">Ready to build?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10 text-xl font-light">
            Let's architect a premium digital solution tailored to your exact requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            <Link to="/marketplace" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all flex items-center justify-center group">
              Browse Projects <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-gray-700 hover:bg-white/5 transition-all">
              Request Custom Build
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
