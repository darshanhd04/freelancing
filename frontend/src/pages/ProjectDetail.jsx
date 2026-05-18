import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiCheckCircle, FiShield, FiCode, FiPlayCircle, FiDownload, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${id}`);
        setProject(data);
      } catch (error) {
        toast.error('Failed to load project architecture.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleRequest = async () => {
    if (!user) {
      toast.error('Authentication required to request this architecture.');
      navigate('/login');
      return;
    }
    
    // Check if already requested
    if (user.purchasedProjects?.includes(id)) {
      toast.success('You already have access to this architecture. Check your portfolio.');
      navigate('/dashboard');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/orders/create', { projectId: id }, config);

      toast.success('Architecture requested successfully! Access unlocked.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error processing request.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-mono text-sm tracking-widest">LOADING_ARCHITECTURE...</p>
      </div>
    </div>
  );
  
  if (!project) return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-gray-500 font-mono tracking-widest">ARCHITECTURE_NOT_FOUND</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group">
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Library
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-8 space-y-12">
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">{project.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.1] text-gray-800 dark:text-gray-200 rounded-md text-xs font-mono font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.1] text-gray-800 dark:text-gray-200 rounded-md text-xs font-mono font-semibold uppercase tracking-wider">
                  {project.difficulty}
                </span>
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 text-primary-700 dark:text-primary-400 rounded-md text-xs font-mono font-semibold uppercase tracking-wider flex items-center">
                  <FiCheckCircle className="mr-1.5" /> Production Ready
                </span>
              </div>
            </div>

            {/* Media Presentation */}
            <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/[0.05] shadow-2xl">
              {project.images && project.images[0] ? (
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FiPlayCircle size={48} className="mb-4 opacity-50" />
                  <span className="font-mono text-sm tracking-wider">NO_VISUAL_DATA</span>
                </div>
              )}
            </div>

            {/* Documentation Overview */}
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">Architecture Overview</h3>
              <div className="prose prose-lg dark:prose-invert prose-gray max-w-none font-light leading-relaxed">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack?.map((tech, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/[0.1] px-4 py-2.5 rounded-xl shadow-sm">
                    <FiCode className="text-primary-500" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card sticky top-24 border-gray-200 dark:border-white/[0.05] bg-white dark:bg-[#111]"
            >
              <div className="border-b border-gray-100 dark:border-white/[0.05] pb-6 mb-6">
                <span className="block text-xs font-mono font-bold text-gray-500 mb-2 uppercase tracking-widest">Licensing</span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Free Access</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-light">Includes complete source code, deployment scripts, and architecture documentation.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Complete Source Code',
                  'Setup Documentation',
                  'Academic & Portfolio Use',
                  'Lifetime Access'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <FiCheckCircle className="text-emerald-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={handleRequest} className="btn-primary w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl">
                Deploy Architecture
              </button>
              
              <div className="mt-6 flex items-center justify-center text-xs text-gray-500 font-mono tracking-wider">
                <FiShield className="mr-1.5" /> Secure Digital Delivery
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
