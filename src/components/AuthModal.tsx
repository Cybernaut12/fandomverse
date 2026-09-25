import React, { useState } from 'react';
import { X, Sparkles, User, Lock, Mail, Globe, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentUser, setCurrentUser, userProfile } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('WizrdBytes');
  const [email, setEmail] = useState('wizrd@fandomverse.io');
  const [password, setPassword] = useState('••••••••');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      isLoggedIn: true,
      name: name.trim() || 'WizrdBytes',
      email: email.trim() || 'wizrd@fandomverse.io'
    });
    setStatusMessage(`Success! Simulated login as ${name.trim() || 'WizrdBytes'}`);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setStatusMessage(null);
    }, 900);
  };

  const handleGuestLogin = () => {
    setCurrentUser({
      isLoggedIn: true,
      name: 'Guest Explorer',
      email: 'guest@fandomverse.io'
    });
    setStatusMessage('Logged in as Guest Explorer');
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setStatusMessage(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <Logo size="lg" showWordmark={false} useImage={true} />
          </div>
          <h2 className="text-xl font-bold text-white font-heading">
            {tab === 'login' ? 'Welcome to FandomVerse' : 'Create Fan Account'}
          </h2>
          <p className="text-xs text-slate-400">
            SRS Spec: UI-only dummy authentication simulation
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            onClick={() => setTab('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'login' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'signup' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {tab === 'signup' && (
            <div className="space-y-1">
              <label className="text-slate-400">Username / Display Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. OtakuLegend"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                placeholder="name@domain.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono"
                required
              />
            </div>
          </div>

          {statusMessage && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center space-x-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/30 transition-all text-xs"
          >
            {tab === 'login' ? 'Sign In to FandomVerse' : 'Create Free Fan Profile'}
          </button>
        </form>

        {/* Guest Alternative & Social Buttons */}
        <div className="pt-2 border-t border-white/10 space-y-3 text-center">
          <button
            onClick={handleGuestLogin}
            className="text-xs text-cyan-400 hover:underline font-medium"
          >
            Or continue as Instant Guest Explorer
          </button>

          <div className="flex items-center justify-center space-x-3 pt-1">
            <button
              onClick={handleGuestLogin}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs flex items-center space-x-2"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Continue with WebID</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
