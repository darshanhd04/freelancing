import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiUsers, FiBox, FiClock, FiCheckCircle } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Web Dev', sourceCodeUrl: '', difficulty: 'Intermediate', techStack: ''
  });
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      toast.error('Not authorized as an admin');
    } else {
      fetchData();
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [projectsRes, reqsRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/requirements', config)
      ]);
      setProjects(projectsRes.data);
      setRequirements(reqsRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch admin data');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim())
      };

      await axios.post('/api/projects', projectData, config);
      toast.success('Architecture added to library');
      fetchData();
      setFormData({ title: '', description: '', category: 'Web Dev', sourceCodeUrl: '', difficulty: 'Intermediate', techStack: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this architecture permanently?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/projects/${id}`, config);
        toast.success('Architecture deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const updateRequirementStatus = async (id, newStatus) => {
    // In a real app, you would have a PUT endpoint to update status.
    // For now, we will just show a toast assuming the endpoint exists, or inform the user it needs backend setup.
    toast.info('Status update endpoint needs to be wired in the backend.');
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 rounded-full border border-gray-200 dark:border-white/[0.05] bg-gray-50/50 dark:bg-[#111]/50">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-gray-400">Admin Privileges Active</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">System Control</h1>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 dark:border-white/[0.05] mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-4 text-sm font-semibold tracking-wider uppercase transition-colors border-b-2 ${activeTab === 'projects' ? 'border-primary-500 text-primary-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
            Project Library
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-6 py-4 text-sm font-semibold tracking-wider uppercase transition-colors border-b-2 flex items-center ${activeTab === 'requirements' ? 'border-primary-500 text-primary-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
            Custom Requests
            {requirements.length > 0 && (
              <span className="ml-2 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 py-0.5 px-2 rounded-full text-xs">
                {requirements.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content: Projects */}
        {activeTab === 'projects' && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="card p-8 border-gray-200 dark:border-white/[0.05]">
                <div className="flex items-center gap-2 mb-6">
                  <FiPlus className="text-primary-500" />
                  <h2 className="text-xl font-bold dark:text-white tracking-tight">Deploy Architecture</h2>
                </div>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Title</label>
                    <input type="text" required className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea required className="input-field h-24 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Domain</label>
                      <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Web Dev">Web Dev</option>
                        <option value="AI">AI</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Repository URL</label>
                    <input type="text" required className="input-field" value={formData.sourceCodeUrl} onChange={e => setFormData({...formData, sourceCodeUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
                    <input type="text" required className="input-field" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full mt-4">Publish to Library</button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="card p-0 overflow-hidden border-gray-200 dark:border-white/[0.05]">
                <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] flex items-center gap-2">
                  <FiBox className="text-indigo-500" />
                  <h2 className="text-xl font-bold dark:text-white tracking-tight">Active Library</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
                    <thead className="bg-gray-50/50 dark:bg-[#1a1a1a]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05] bg-white dark:bg-[#111]">
                      {projects.map(project => (
                        <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">{project.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Content: Requirements */}
        {activeTab === 'requirements' && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="card p-0 overflow-hidden border-gray-200 dark:border-white/[0.05]">
              <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] flex items-center gap-2">
                <FiUsers className="text-emerald-500" />
                <h2 className="text-xl font-bold dark:text-white tracking-tight">Client Requests</h2>
              </div>
              
              {requirements.length === 0 ? (
                <div className="p-16 text-center text-gray-500">No custom requirements submitted yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
                    <thead className="bg-gray-50/50 dark:bg-[#1a1a1a]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Client</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Scope</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Budget</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05] bg-white dark:bg-[#111]">
                      {requirements.map(req => (
                        <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] align-top">
                          <td className="px-6 py-6">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{req.user?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{req.user?.email || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">{req.title}</div>
                            <div className="text-xs inline-block bg-gray-100 dark:bg-white/[0.05] px-2 py-1 rounded text-gray-600 dark:text-gray-400 mb-2">{req.category}</div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-sm font-mono font-bold text-gray-600 dark:text-gray-300">
                            ${req.budget}
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-6 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                            <p className="line-clamp-3">{req.description}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Admin;
