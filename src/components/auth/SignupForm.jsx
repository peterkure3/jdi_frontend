import { useState } from 'react';
import { storage, KEYS } from '../../lib/storage.js';

export default function SignupForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    setTimeout(() => {
      storage.set(KEYS.postSignupMessage, `Account created for ${email}. You can now log in.`);
      setIsLoading(false);
      if (onSwitch) onSwitch();
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Confirm Password</label>
        <input
          type="password"
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder-neutral-400"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Account Type</label>
        <select
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isLoading}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      
      <div className="flex items-start gap-2 text-sm">
        <input type="checkbox" className="mt-0.5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary" required />
        <span className="text-neutral-600">
          I agree to the <button type="button" className="text-brand-primary hover:text-brand-primaryDark transition-colors">Terms of Service</button> and <button type="button" className="text-brand-primary hover:text-brand-primaryDark transition-colors">Privacy Policy</button>
        </span>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black hover:bg-red-600 text-white rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Creating account...
          </>
        ) : (
          <>
            <i className="fas fa-user-plus"></i>
            Create Account
          </>
        )}
      </button>
    </form>
  );
}
