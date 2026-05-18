import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiShield, FiDatabase, FiCpu, FiCheckCircle } from 'react-icons/fi';

const features = [
  { name: 'AI & Machine Learning', icon: FiCpu, desc: 'Ready-to-deploy ML models, NLP, and Computer Vision architectures.' },
  { name: 'Web Development', icon: FiCode, desc: 'Full-stack MERN, Next.js, and modern frontend platforms.' },
  { name: 'Cybersecurity', icon: FiShield, desc: 'Ethical hacking frameworks, cryptography, and network security.' },
  { name: 'Blockchain', icon: FiDatabase, desc: 'Smart contracts, DApps, and comprehensive Web3 integrations.' },
];

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

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 selection:bg-primary-500/30">
      
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/10 dark:bg-primary-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 dark:bg-indigo-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full border border-gray-200 dark:border-white/[0.05] bg-gray-50/50 dark:bg-[#111]/50 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-600 dark:text-gray-400">Premium Architecture</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8"
          >
            Deploy <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-indigo-400 to-primary-600">
              without compromise.
            </span>
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-6 max-w-2xl text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light mx-auto leading-relaxed"
          >
            Enterprise-grade source code, comprehensive documentation, and robust architectures designed for excellence.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link to="/marketplace" className="w-full sm:w-auto btn-primary group px-8 py-4">
              Explore Projects
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="w-full sm:w-auto btn-secondary px-8 py-4">
              Meet the Architect
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories / Features (Bento Grid) */}
      <section className="py-32 relative z-10 border-t border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-[#111]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for scale.</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              Every project is built with clean architecture and modern paradigms across multiple domains.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div 
                variants={fadeIn}
                key={idx}
                className="card p-8 group flex flex-col items-center text-center hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-indigo-500/0 group-hover:from-primary-500/5 group-hover:to-indigo-500/5 transition-colors duration-500 pointer-events-none"></div>
                <div className="h-16 w-16 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative z-10">
                  <feature.icon size={28} className="text-primary-600 dark:text-primary-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative z-10 border-t border-gray-100 dark:border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: '500+', label: 'Projects Deployed' },
              { value: '10k+', label: 'Lines of Clean Code' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '24/7', label: 'Technical Support' },
            ].map((stat, idx) => (
              <motion.div variants={fadeIn} key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">{stat.value}</div>
                <div className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative z-10 bg-gray-900 dark:bg-[#111] border-t border-gray-800 dark:border-white/[0.05] text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Stop building from scratch.</h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            Accelerate your development cycle with our premium, production-ready architectures.
          </p>
          <Link to="/marketplace" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1">
            Start browsing <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
