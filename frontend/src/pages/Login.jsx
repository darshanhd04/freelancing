import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      if (loginType === 'admin') {
        if (result.user.isAdmin) {
          toast.success('Admin privileges confirmed.');
          navigate('/admin');
        } else {
          logout();
          toast.error('Access Denied: You do not have admin privileges.');
        }
      } else {
        if (result.user.isAdmin) {
          logout();
          toast.error('Admins must use the Admin Access panel to log in.');
        } else {
          toast.success('Logged in successfully!');
          navigate('/dashboard');
        }
      }
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-900/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/5 blur-[120px]" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Toggle Login Type */}
        <div className="flex bg-gray-100 dark:bg-[#111] rounded-full p-1 border border-gray-200 dark:border-white/[0.05]">
          <button
            onClick={() => setLoginType('user')}
            className={`flex-1 flex items-center justify-center py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
              loginType === 'user' 
                ? 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <FiUser className="mr-2" /> Client Portal
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 flex items-center justify-center py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
              loginType === 'admin' 
                ? 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <FiShield className="mr-2" /> Admin Access
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={loginType}
          className="card p-10 border-gray-200 dark:border-white/[0.05]"
        >
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
              {loginType === 'admin' ? 'System Administrator' : 'Client Authentication'}
            </h2>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-light mb-8">
              {loginType === 'admin' 
                ? 'Enter your credentials to access system controls.' 
                : 'Sign in to manage your digital assets and requests.'}
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button type="submit" className={`btn-primary w-full py-4 text-lg mt-4 ${loginType === 'admin' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30' : ''}`}>
                {loginType === 'admin' ? 'Secure Login' : 'Sign in'}
              </button>
            </div>
          </form>
          
          {loginType === 'user' && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                Sign up
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
