import React, { useState } from 'react';
import { 
  Compass, 
  Film, 
  Tv, 
  Gamepad2, 
  BookOpen, 
  Sparkles, 
  Search, 
  Bookmark, 
  ShoppingBag, 
  Clock, 
  Users, 
  Menu, 
  X, 
  User, 
  ListTodo, 
  Layers, 
  Calendar as CalendarIcon, 
  MessageSquareQuote, 
  HelpCircle,
  PhoneCall,
  Info,
  Headphones,
  Flame
} from 'lucide-react';
import { useApp, type AppView } from '../context/AppContext';
import type { CategoryType } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    activeCategory, 
    navigateToCategory, 
    currentTime, 
    visitorCount,
    bookmarks,
    cartItemCount,
    setIsSearchModalOpen,
    setIsBookmarksModalOpen,
    setIsCartOpen,
    setIsAuthModalOpen,
    userProfile,
    currentUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const categories: { label: string; cat: CategoryType; icon: React.ReactNode }[] = [
    { label: 'Movies', cat: 'movies', icon: <Film className="w-3.5 h-3.5" /> },
    { label: 'TV Shows', cat: 'tv-shows', icon: <Tv className="w-3.5 h-3.5" /> },
    { label: 'Anime', cat: 'anime', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Manga', cat: 'manga', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Games', cat: 'gaming', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { label: 'Comics', cat: 'comics', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'K-Pop', cat: 'k-pop', icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: CategoryType) => {
    navigateToCategory(cat);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-heading">
                FandomVerse
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                2.0
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('discover')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                currentView === 'discover' 
                  ? 'text-white bg-white/10 shadow-sm border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Discover</span>
            </button>

            {categories.map(({ label, cat, icon }) => {
              const isActive = currentView === 'category' && activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isActive 
                      ? 'text-white bg-white/10 shadow-sm border border-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-slate-400 group-hover:text-cyan-400">{icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            <button
              onClick={() => handleNavClick('collection')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'collection' || currentView === 'progress'
                  ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Tracker
            </button>

            <button
              onClick={() => handleNavClick('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'calendar' 
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Calendar
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'reviews' 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => handleNavClick('merchandise')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'merchandise' 
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Merch
            </button>

            <button
              onClick={() => handleNavClick('music')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
                currentView === 'music' 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Headphones className="w-3 h-3 text-emerald-400" />
              <span>Music</span>
            </button>

            <button
              onClick={() => handleNavClick('community')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
                currentView === 'community' 
                  ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>Debates</span>
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Real-time Clock Widget (SRS page 14) */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-300 font-mono">
              <Clock className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '30s' }} />
              <span>{formattedTime}</span>
            </div>

            {/* Visitor Counter Widget (SRS page 14) */}
            <div 
              className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 font-mono"
              title="Simulated live visitor count stored in LocalStorage"
            >
              <Users className="w-3 h-3 text-purple-400" />
              <span>{visitorCount.toLocaleString()}</span>
            </div>

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Search"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center space-x-2"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline text-xs text-slate-400 font-mono">Ctrl+K</span>
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={() => setIsBookmarksModalOpen(true)}
              aria-label="Bookmarks"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white transition-all relative"
              title="View Bookmarked Items & Notes"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white transition-all relative"
              title="Temporary Merchandise Cart"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile / Dummy Auth Button */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1 pl-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-all"
              >
                <span className="hidden sm:inline text-xs font-medium text-slate-200">
                  {currentUser.isLoggedIn ? userProfile.name : 'Sign In'}
                </span>
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-purple-500/50"
                />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-white">{userProfile.name}</p>
                    <p className="text-[11px] text-slate-400">{userProfile.username}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <User className="w-3.5 h-3.5 text-purple-400" />
                      <span>My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavClick('collection')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>My Collection ({userProfile.itemsCount})</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('progress')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <ListTodo className="w-3.5 h-3.5 text-emerald-400" />
                      <span>My Progress Tracker</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('reviews')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                      <span>My Reviews ({userProfile.reviewsCount})</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('calendar')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>Release Calendar</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('music')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Spotify Music Tracks</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('community')}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Coliseum Debates</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/10">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>About FandomVerse</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                      <span>Contact Us & Map</span>
                    </button>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full mt-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20"
                    >
                      Dummy Login / Signup
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-slate-400">
            <span>Clock: {formattedTime}</span>
            <span>Visitors: {visitorCount.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('discover')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Discover</span>
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Collection</span>
            </button>
            <button
              onClick={() => handleNavClick('progress')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <ListTodo className="w-4 h-4 text-emerald-400" />
              <span>Progress</span>
            </button>
            <button
              onClick={() => handleNavClick('calendar')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <MessageSquareQuote className="w-4 h-4 text-pink-400" />
              <span>Reviews</span>
            </button>
            <button
              onClick={() => handleNavClick('merchandise')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Merchandise</span>
            </button>
            <button
              onClick={() => handleNavClick('music')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Spotify Music</span>
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 text-slate-200 text-xs"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Coliseum Debates</span>
            </button>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Fandom Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(({ label, cat, icon }) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/10 text-slate-300 text-xs"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              onClick={() => handleNavClick('about')}
              className="text-xs text-slate-400 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Contact Us & Map
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs text-purple-400 font-medium"
            >
              Sign In / Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
