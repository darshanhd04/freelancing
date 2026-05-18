import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiDownload, FiBox, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [purchasedProjects, setPurchasedProjects] = useState([]);
  const [customRequirements, setCustomRequirements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        const profileRes = await axios.get('/api/auth/profile', config);
        setPurchasedProjects(profileRes.data.purchasedProjects || []);
        
        const reqsRes = await axios.get('/api/requirements/myrequirements', config);
        setCustomRequirements(reqsRes.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-mono text-sm tracking-widest">LOADING_WORKSPACE...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome back, {user.name}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-light">Manage your digital assets and custom architecture requests.</p>
        </motion.div>

        {/* Owned Assets Grid */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FiBox className="text-primary-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Your Portfolio</h2>
          </div>
          
          {purchasedProjects.length === 0 ? (
            <div className="card text-center py-16 border-dashed border-2 border-gray-200 dark:border-white/[0.05] bg-transparent shadow-none hover:border-primary-500/50">
              <p className="text-gray-500 dark:text-gray-400 mb-6">No assets acquired yet.</p>
              <Link to="/marketplace" className="btn-primary">Browse Solutions</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedProjects.map(project => (
                <div key={project._id} className="card p-0 flex flex-col h-full group">
                  <div className="p-8 flex flex-col flex-grow border-b border-gray-100 dark:border-white/[0.05]">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-0 flex-grow line-clamp-3 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/[0.02] p-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Version 1.0</span>
                    <a 
                      href={project.sourceCodeUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center transition-colors"
                    >
                      <FiDownload className="mr-2" /> Download Source
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Custom Requirements Table */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="flex items-center gap-3 mb-8">
            <FiClock className="text-indigo-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Active Requests</h2>
          </div>
          
          {customRequirements.length === 0 ? (
            <div className="card text-center py-16 border-dashed border-2 border-gray-200 dark:border-white/[0.05] bg-transparent shadow-none">
              <p className="text-gray-500 dark:text-gray-400 mb-0">No active custom requests.</p>
            </div>
          ) : (
            <div className="card p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
                  <thead className="bg-gray-50/50 dark:bg-[#1a1a1a]">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Project Scope</th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Domain</th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Budget</th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Initiated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05] bg-white dark:bg-[#111]">
                    {customRequirements.map(req => (
                      <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">{req.title}</td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{req.category}</td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-400">${req.budget}</td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold 
                            ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/30' : 
                              req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30' : 
                              req.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30' : 
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800/30'}`}>
                            {req.status === 'Pending' && <FiClock className="mr-1.5" />}
                            {req.status === 'Completed' && <FiCheckCircle className="mr-1.5" />}
                            {req.status === 'In Progress' && <FiAlertCircle className="mr-1.5" />}
                            {req.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                          {new Date(req.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
        
      </div>
    </div>
  );
};

export default Dashboard;
