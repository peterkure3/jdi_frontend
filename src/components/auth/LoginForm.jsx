import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, KEYS } from '../../lib/storage.js';

const DEMO_USERS = {
  'admin@gmail.com': { password: 'admin', role: 'admin' },
  'lecture@gmail.com': { password: 'lecture', role: 'lecturer' },
  'student@gmail.com': { password: 'student', role: 'student' },
};

const ROLE_REDIRECTS = {
  admin: '/admin',
  lecturer: '/lecturer',
  student: '/student',
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate loading
    setTimeout(() => {
      const user = DEMO_USERS[email];
      if (!user || user.password !== password) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      storage.set(KEYS.email, email);
      storage.set(KEYS.role, user.role);
      storage.set(KEYS.isAuthenticated, true);
      storage.set(KEYS.postLoginMessage, `Welcome back, ${email}!`);
      navigate(ROLE_REDIRECTS[user.role] || '/', { replace: true });
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-status-error/10 border border-status-error/20 rounded-lg text-status-error text-sm">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder-neutral-400"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder-neutral-400"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary" />
          <span className="text-neutral-600">Remember me</span>
        </label>
        <button type="button" className="text-brand-primary hover:text-brand-primaryDark transition-colors">
          Forgot password?
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black hover:bg-brand-primary text-white rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt"></i>
            Sign In
          </>
        )}
      </button>
    </form>
  );
}
