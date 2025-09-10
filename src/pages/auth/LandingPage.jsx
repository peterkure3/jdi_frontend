import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm.jsx';
import SignupForm from '../../components/auth/SignupForm.jsx';
import Toast from '../../components/shared/Toast.jsx';
import { storage, KEYS } from '../../lib/storage.js';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // If already authenticated, redirect by role
  useEffect(() => {
    const isAuthed = storage.get(KEYS.isAuthenticated);
    const role = storage.get(KEYS.role);
    if (isAuthed && role) {
      const map = { admin: '/admin', lecturer: '/lecturer', student: '/student' };
      const to = map[role] || '/';
      if (to !== '/') navigate(to, { replace: true });
    }
  }, [navigate]);

  // Show post-signup or post-login message as toast then clear
  useEffect(() => {
    const signupMsg = storage.get(KEYS.postSignupMessage);
    const loginMsg = storage.get(KEYS.postLoginMessage);
    const message = loginMsg || signupMsg;
    if (message) {
      setToast({ message, type: 'success' });
      storage.remove(KEYS.postSignupMessage);
      storage.remove(KEYS.postLoginMessage);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <img 
          src="/logo.png" 
          alt="Joadah Design Institute"
          className="w-48 h-24 mx-auto mb-6 object-contain"
        />
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Welcome</h1>
        <p className="text-neutral-600">Please register. Sign up</p>
      </div>

      <div className="mb-6">
        <div className="flex bg-neutral-100 rounded-xl p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === 'login'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === 'signup'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {mode === 'login' ? <LoginForm /> : <SignupForm onSwitch={() => setMode('login')} />}
      
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
        position="bottom-right"
      />
      
      <div className="mt-8 p-4 bg-neutral-50 rounded-xl">
        <div className="text-xs font-medium text-neutral-700 mb-2">Demo Credentials:</div>
        <div className="space-y-1 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span>Admin:</span>
            <span className="font-mono">admin@gmail.com / admin</span>
          </div>
          <div className="flex justify-between">
            <span>Lecturer:</span>
            <span className="font-mono">lecture@gmail.com / lecture</span>
          </div>
          <div className="flex justify-between">
            <span>Student:</span>
            <span className="font-mono">student@gmail.com / student</span>
          </div>
        </div>
      </div>
    </div>
  );
}
