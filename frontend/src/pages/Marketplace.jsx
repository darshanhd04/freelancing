import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiSearch, FiCode, FiSend, FiArrowRight } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Marketplace = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const { user } = React.useContext(AuthContext);
  const [reqTitle, setReqTitle] = useState('');
  const [reqDescription, setReqDescription] = useState('');
  const [reqCategory, setReqCategory] = useState('Web Dev');
  const [reqBudget, setReqBudget] = useState('');
  const [reqMessage, setReqMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequirementSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReqMessage({ type: 'error', text: 'Authentication required to submit requirements.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('/api/requirements', { 
        title: reqTitle, 
        description: reqDescription, 
        category: reqCategory, 
        budget: reqBudget 
      }, config);
      
      setReqMessage({ type: 'success', text: 'Requirement submitted successfully. The architect will review it shortly.' });
      setReqTitle('');
      setReqDescription('');
      setReqBudget('');
    } catch (error) {
      setReqMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit requirement' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`/api/projects${categoryFilter ? `?category=${categoryFilter}` : ''}`);
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [categoryFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="pt-32 pb-16 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-[#111]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Project Library</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-xl">
                  Production-ready architectures and academic projects available for immediate deployment.
                </p>
              </div>
              
              {/* Refined Filter */}
              <div className="w-full md:w-64 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <select 
                  className="input-field pl-10 appearance-none bg-white dark:bg-[#111] hover:border-primary-500 transition-colors cursor-pointer"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="AI">AI & Machine Learning</option>
                  <option value="Web Dev">Web Development</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="card p-0 animate-pulse h-96 bg-gray-100 dark:bg-[#111]"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FiCode className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or checking back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={project._id}
                className="card p-0 flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)] overflow-hidden"
              >
                <div className="h-56 bg-gray-100 dark:bg-[#1a1a1a] relative overflow-hidden">
                  {project.images && project.images[0] ? (
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-sm tracking-wider">NO_IMAGE_DATA</div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.1] shadow-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/[0.05]">
                    <span className="text-sm font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.05] px-3 py-1 rounded-md">FREE</span>
                    <Link to={`/project/${project._id}`} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center transition-colors">
                      View details <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Requirement Section */}
      <div className="border-t border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-transparent py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary-600/5 dark:bg-primary-500/5 blur-[150px]" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 pointer-events-none"></div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4">
                <FiSend size={20} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Custom Architecture Request</h2>
              <p className="text-gray-500 dark:text-gray-400 font-light text-lg">Define your requirements and budget for a tailor-made solution.</p>
            </div>
            
            {reqMessage.text && (
              <div className={`p-4 mb-8 rounded-xl text-sm font-medium flex items-center ${reqMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30' : 'bg-rose-50 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30'}`}>
                {reqMessage.text}
              </div>
            )}

            <form onSubmit={handleRequirementSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Project Title</label>
                  <input 
                    type="text" 
                    required 
                    className="input-field bg-gray-50 dark:bg-[#0a0a0a]" 
                    placeholder="E.g. Healthcare CRM"
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Domain</label>
                  <select 
                    className="input-field bg-gray-50 dark:bg-[#0a0a0a]"
                    value={reqCategory}
                    onChange={(e) => setReqCategory(e.target.value)}
                  >
                    <option value="AI">AI & Machine Learning</option>
                    <option value="Web Dev">Web Development</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</label>
                <textarea 
                  required 
                  rows="5" 
                  className="input-field bg-gray-50 dark:bg-[#0a0a0a] resize-none" 
                  placeholder="Detail the required features, tech stack preferences, and expected deliverables..."
                  value={reqDescription}
                  onChange={(e) => setReqDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Budget Allocation ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-mono">$</span>
                  </div>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    className="input-field bg-gray-50 dark:bg-[#0a0a0a] pl-8" 
                    placeholder="500"
                    value={reqBudget}
                    onChange={(e) => setReqBudget(e.target.value)}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 text-lg mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Transmitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
