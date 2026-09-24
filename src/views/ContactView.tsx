import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Navigation, Check, Globe, MessageSquare, Compass, Shield } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(14);
  const [mapType, setMapType] = useState<'dark' | 'satellite'>('dark');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2500);
  };

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-3 max-w-3xl">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          Get in Touch • FandomVerse HQ
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
          Contact Us & Global Location
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Have an idea for a new fandom hub, character lore correction, or partnership inquiry? 
          Reach out to our global coordination team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">Send a Direct Message</h2>
              <p className="text-xs text-slate-400">We respond within 24 hours</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Inquiry Topic</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Feedback" className="bg-slate-900">General Feedback</option>
                <option value="New Fandom" className="bg-slate-900">Submit New Franchise / Fandom</option>
                <option value="Partnership" className="bg-slate-900">Community Partnership</option>
                <option value="Merchandise" className="bg-slate-900">Merchandise Inquiry</option>
                <option value="Bug" className="bg-slate-900">Bug or Feature Request</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Message Body</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts with the FandomVerse core team..."
                className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                required
              />
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! Your message was received by our team.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Interactive Google Map & GPS Locator (SRS page 13) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            
            {/* Location Title & GPS Coordinates */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    FandomVerse Tech Hub & Aptech Center
                  </h3>
                  <p className="text-[11px] text-slate-400">Silicon Beach Innovation District, CA</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                GPS: 34.0195° N, 118.4912° W
              </span>
            </div>

            {/* Simulated Interactive Map Display */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0d14]">
              {/* Map Canvas Background with simulated dark grid & street lines */}
              <div className={`w-full h-full relative transition-all duration-300 ${mapType === 'satellite' ? 'bg-[#0f141f]' : 'bg-[#0c0f18]'}`}>
                
                {/* SVG Map Lines */}
                <svg className="w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 0 100 Q 150 120 300 80 T 600 240" fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.6" />
                  <path d="M 120 0 L 180 300 L 250 400" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
                  <path d="M 280 50 Q 320 200 450 350" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.4" />
                </svg>

                {/* Simulated Waterfront / Ocean curve */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cyan-950/40 to-transparent pointer-events-none" />

                {/* Central GPS Pin with radar pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="relative">
                    <span className="w-10 h-10 rounded-full bg-cyan-400/20 absolute -top-2 -left-2 animate-ping" />
                    <div className="w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-400/50">
                      <MapPin className="w-4 h-4 fill-black" />
                    </div>
                  </div>
                  <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-cyan-400/60 text-[10px] font-mono text-cyan-300 shadow-lg whitespace-nowrap">
                    FandomVerse Studio • Level {mapZoom}
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-3 right-3 flex flex-col space-y-1.5 z-10">
                  <button
                    onClick={() => setMapZoom(z => Math.min(18, z + 1))}
                    className="w-7 h-7 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/20 flex items-center justify-center transition-colors"
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setMapZoom(z => Math.max(10, z - 1))}
                    className="w-7 h-7 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/20 flex items-center justify-center transition-colors"
                    title="Zoom out"
                  >
                    -
                  </button>
                </div>

                {/* Style Switcher */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 p-0.5 rounded-lg bg-black/80 border border-white/10 text-[10px] font-mono z-10">
                  <button
                    onClick={() => setMapType('dark')}
                    className={`px-2 py-0.5 rounded ${mapType === 'dark' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2 py-0.5 rounded ${mapType === 'satellite' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
                  >
                    Satellite
                  </button>
                </div>

              </div>
            </div>

            {/* GPS Info & Directions */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real-time GPS coordinates active</span>
              </span>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors flex items-center space-x-1"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

          {/* Quick Team Directory */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Email Support</span>
              <p className="text-white font-semibold">support@fandomverse.io</p>
              <p className="text-[11px] text-slate-400">24/7 Fan community ticket response</p>
            </div>
            <div className="p-3.5 rounded-xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Global Discord</span>
              <p className="text-white font-semibold">discord.gg/fandomverse</p>
              <p className="text-[11px] text-slate-400">Over 50,000 active fans online</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
