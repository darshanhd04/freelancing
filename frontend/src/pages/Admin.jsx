import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiUsers, FiBox, FiClock, FiCheckCircle } from 'react-icons/fi';
import { db } from '../config/firebase';
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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
      // 1. Fetch all projects from Firestore
      const projSnap = await getDocs(collection(db, 'projects'));
      const projectsList = [];
      projSnap.forEach((docSnap) => {
        projectsList.push({
          _id: docSnap.id,
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      // Sort projects by createdAt desc client-side
      projectsList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setProjects(projectsList);

      // 2. Fetch all customer requirements from Firestore
      const reqSnap = await getDocs(collection(db, 'requirements'));
      const requirementsList = [];
      reqSnap.forEach((docSnap) => {
        requirementsList.push({
          _id: docSnap.id,
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      // Sort requirements by createdAt desc client-side
      requirementsList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setRequirements(requirementsList);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to fetch admin data');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        sourceCodeUrl: formData.sourceCodeUrl,
        techStack: formData.techStack.split(',').map(s => s.trim()),
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'], // modern default thumbnail
        video: '',
        user: user.uid,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'projects'), projectData);
      toast.success('Architecture added to library');
      fetchData();
      setFormData({ title: '', description: '', category: 'Web Dev', sourceCodeUrl: '', difficulty: 'Intermediate', techStack: '' });
    } catch (error) {
      toast.error(error.message || 'Error adding project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this architecture permanently?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        toast.success('Architecture deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const updateRequirementStatus = async (id, newStatus) => {
    try {
      const reqRef = doc(db, 'requirements', id);
      await updateDoc(reqRef, {
        status: newStatus
      });
      toast.success(`Status updated to ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const seedSampleData = async () => {
    if (window.confirm('Do you want to seed the library with sample projects?')) {
      try {
        const sampleProjects = [
          {
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce platform built with MERN stack.',
            category: 'Web Dev',
            difficulty: 'Intermediate',
            images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop'],
            sourceCodeUrl: 'https://github.com/example/ecommerce',
            techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
            user: user.uid,
            createdAt: new Date().toISOString()
          },
          {
            title: 'Machine Learning Image Classifier',
            description: 'An AI model trained to classify images using TensorFlow.',
            category: 'AI',
            difficulty: 'Advanced',
            images: ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop'],
            sourceCodeUrl: 'https://github.com/example/ml-classifier',
            techStack: ['Python', 'TensorFlow', 'Keras'],
            user: user.uid,
            createdAt: new Date().toISOString()
          },
          {
            title: 'Blockchain Voting App',
            description: 'A decentralized voting application on the Ethereum blockchain.',
            category: 'Blockchain',
            difficulty: 'Advanced',
            images: ['https://images.unsplash.com/photo-1639762681485-074b7f4f2508?q=80&w=1000&auto=format&fit=crop'],
            sourceCodeUrl: 'https://github.com/example/voting-app',
            techStack: ['Solidity', 'React', 'Web3.js'],
            user: user.uid,
            createdAt: new Date().toISOString()
          },
          {
            title: 'Secure Chat App',
            description: 'End-to-end encrypted chat application.',
            category: 'Cybersecurity',
            difficulty: 'Intermediate',
            images: ['https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop'],
            sourceCodeUrl: 'https://github.com/example/secure-chat',
            techStack: ['Node.js', 'Socket.io', 'Crypto'],
            user: user.uid,
            createdAt: new Date().toISOString()
          }
        ];

        for (const proj of sampleProjects) {
          await addDoc(collection(db, 'projects'), proj);
        }

        toast.success('Sample projects seeded successfully!');
        fetchData();
      } catch (error) {
        toast.error('Failed to seed sample projects: ' + error.message);
      }
    }
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
                <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FiBox className="text-indigo-500" />
                    <h2 className="text-xl font-bold dark:text-white tracking-tight">Active Library</h2>
                  </div>
                  <button 
                    onClick={seedSampleData}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary-500/30 hover:border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all duration-300 flex items-center"
                  >
                    Seed Sample Data
                  </button>
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
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-widest">Action</th>
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
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold 
                              ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/30' : 
                                req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30' : 
                                req.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30' : 
                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800/30'}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-right text-xs">
                            <select 
                              value={req.status} 
                              onChange={(e) => updateRequirementStatus(req._id, e.target.value)}
                              className="bg-gray-100 dark:bg-[#222] border border-gray-200 dark:border-white/[0.1] rounded px-2.5 py-1 text-gray-800 dark:text-white cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
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
