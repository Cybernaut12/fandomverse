import React, { useState } from 'react';
import { Bell, BellRing, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const CalendarView = () => {
    const { releases, setSelectedMedia, mediaList } = useApp();
    const [activeTab, setActiveTab] = useState('month');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [reminders, setReminders] = useState({});
    const [selectedRelease, setSelectedRelease] = useState(releases[0] || null);
    const toggleReminder = (id) => {
        setReminders(prev => ({ ...prev, [id]: !prev[id] }));
    };
    const filteredReleases = releases.filter(r => {
        if (selectedCategory !== 'all' && r.category !== selectedCategory)
            return false;
        return true;
    });
    // Calendar dates for September 2026 (September 2026 starts on a Tuesday)
    // September has 30 days. Days of week: Sun, Mon, Tue, Wed, Thu, Fri, Sat
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Sep 1, 2026 is Tuesday (index 2)
    const emptyDaysBefore = 2;
    const totalDaysInMonth = 30;
    return (<div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header and View Mode Switcher (Screen 8) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Release Calendar
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
              September 2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Never miss what's next. Movies, shows, anime, manga and games.
          </p>
        </div>

        {/* View Toggle (Screen 8: Month, List, Today) */}
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 self-start sm:self-auto">
          {['month', 'list', 'today'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'}`}>
              {tab}
            </button>))}
        </div>
      </div>

      {/* Category Filter Toolbar */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs pb-1">
        {[
            { id: 'all', label: 'All Releases' },
            { id: 'movies', label: 'Movies' },
            { id: 'tv-shows', label: 'TV Shows' },
            { id: 'anime', label: 'Anime' },
            { id: 'gaming', label: 'Gaming' },
            { id: 'manga', label: 'Manga' }
        ].map(cat => (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${selectedCategory === cat.id
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
            {cat.label}
          </button>))}
      </div>

      {/* ========================================================================= */}
      {/* 1. MONTH VIEW (SCREEN 8 INTERACTIVE CALENDAR GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'month' && (<div className="space-y-4">
          
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/10">
            <span className="text-sm font-bold text-white font-heading">
              September 2026
            </span>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="text-[11px] font-mono">Today: Sep 24, 2026</span>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-bold text-slate-400 font-mono py-1">
            {daysOfWeek.map(d => (<div key={d} className="p-1">{d}</div>))}
          </div>

          {/* Calendar Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            
            {/* Empty offset days for Tuesday start */}
            {Array.from({ length: emptyDaysBefore }).map((_, idx) => (<div key={`empty-${idx}`} className="min-h-[90px] sm:min-h-[110px] rounded-xl bg-white/[0.01] border border-white/[0.03] opacity-40"/>))}

            {/* Days 1 through 30 */}
            {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dayReleases = filteredReleases.filter(r => r.day === dayNum);
                const isToday = dayNum === 24;
                return (<div key={dayNum} className={`min-h-[90px] sm:min-h-[110px] p-2 rounded-xl glass-card border transition-all flex flex-col justify-between ${isToday
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                        : 'border-white/[0.06] hover:border-white/20'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isToday ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {dayNum}
                    </span>
                    {isToday && (<span className="text-[9px] uppercase font-bold text-black bg-cyan-400 px-1 rounded font-mono">
                        Today
                      </span>)}
                  </div>

                  {/* Release Event Pills */}
                  <div className="space-y-1 my-auto">
                    {dayReleases.map(rel => (<div key={rel.id} onClick={() => setSelectedRelease(rel)} className="p-1 rounded-md bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 text-[10px] text-purple-200 cursor-pointer transition-colors leading-tight line-clamp-2" title={`${rel.title} (${rel.platform})`}>
                        <p className="font-bold truncate">{rel.title}</p>
                        <span className="text-[9px] text-cyan-300 font-mono">{rel.platform}</span>
                      </div>))}
                  </div>

                  {dayReleases.length === 0 && <div />}
                </div>);
            })}
          </div>

          {/* Selected Release Spotlight Drawer/Card */}
          {selectedRelease && (<div className="p-5 rounded-2xl glass-panel border border-cyan-400/40 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 mt-6 animate-in fade-in">
              <img src={selectedRelease.coverImage} alt={selectedRelease.title} className="w-24 h-32 rounded-xl object-cover ring-2 ring-cyan-400/50 flex-shrink-0"/>
              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedRelease.category} • {selectedRelease.format}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
                    Release: Sept {selectedRelease.day}, 2026 ({selectedRelease.time})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">{selectedRelease.title}</h3>
                <p className="text-xs text-slate-300 max-w-xl">{selectedRelease.synopsis}</p>
                <p className="text-[11px] text-slate-400">Platform: <strong className="text-white">{selectedRelease.platform}</strong></p>
              </div>

              <div className="flex flex-col space-y-2 flex-shrink-0">
                <button onClick={() => toggleReminder(selectedRelease.id)} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-2 ${reminders[selectedRelease.id]
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>
                  {reminders[selectedRelease.id] ? <BellRing className="w-4 h-4"/> : <Bell className="w-4 h-4"/>}
                  <span>{reminders[selectedRelease.id] ? 'Reminder Set!' : 'Notify Me'}</span>
                </button>
              </div>
            </div>)}

        </div>)}

      {/* ========================================================================= */}
      {/* 2. LIST VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'list' && (<div className="space-y-3">
          {filteredReleases.map(rel => {
                const hasReminder = reminders[rel.id];
                return (<div key={rel.id} className="p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center flex-shrink-0">
                    <span className="text-xl font-bold text-amber-400 font-mono">0{rel.day}</span>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">SEPT</span>
                  </div>

                  <img src={rel.coverImage} alt={rel.title} className="w-12 h-16 rounded-lg object-cover flex-shrink-0"/>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">
                      {rel.category} • {rel.platform}
                    </span>
                    <h3 className="text-sm font-bold text-white">{rel.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{rel.synopsis}</p>
                  </div>
                </div>

                <button onClick={() => toggleReminder(rel.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1.5 self-start sm:self-auto ${hasReminder
                        ? 'bg-amber-500 text-black border-amber-500 font-bold'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                  <Bell className="w-3.5 h-3.5"/>
                  <span>{hasReminder ? 'Reminder Active' : 'Set Reminder'}</span>
                </button>
              </div>);
            })}
        </div>)}

      {/* ========================================================================= */}
      {/* 3. TODAY VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'today' && (<div className="p-8 rounded-2xl glass-panel border border-cyan-400/40 text-center space-y-4">
          <Sparkles className="w-10 h-10 mx-auto text-cyan-400 animate-spin" style={{ animationDuration: '10s' }}/>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">Releases for Today: September 24, 2026</h2>
            <p className="text-xs text-slate-400 mt-1">Live synchronized release calendar</p>
          </div>
          <div className="max-w-md mx-auto p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Featured Milestone</span>
            <h4 className="text-base font-bold text-white">FandomVerse 2.0 Global Community Launch</h4>
            <p className="text-xs text-slate-300">
              The next evolutionary leap for FandomVerse: real-time tracking, integrated community reviews, release calendar sync, and interactive fandom chatbot.
            </p>
          </div>
        </div>)}

    </div>);
};
