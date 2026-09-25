import React, { useState, useMemo } from 'react';
import { Flame, Swords, MessageSquare, ThumbsUp, Sparkles, Search, PlusCircle, BookOpen, CheckCircle2, TrendingUp, X, Send, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const CommunityView = () => {
    const { debates, userVotes, voteDebate, addDebateArgument, likeDebateArgument, createDebate, userProfile } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('trending');
    // Expanded debate ID (defaults to first featured debate)
    const [activeDebateId, setActiveDebateId] = useState(() => {
        return debates.find(d => d.featured)?.id || debates[0]?.id || '';
    });
    // Stance filter for arguments in active debate
    const [argumentStanceFilter, setArgumentStanceFilter] = useState('ALL');
    // New argument form state
    const [showArgForm, setShowArgForm] = useState(false);
    const [argStance, setArgStance] = useState('A');
    const [argTitle, setArgTitle] = useState('');
    const [argContent, setArgContent] = useState('');
    const [argCitation, setArgCitation] = useState('');
    const [argBadge, setArgBadge] = useState('Canon Scholar');
    const [formSuccessMessage, setFormSuccessMessage] = useState('');
    // New Debate Modal
    const [isNewDebateModalOpen, setIsNewDebateModalOpen] = useState(false);
    const [newDebateTitle, setNewDebateTitle] = useState('');
    const [newDebateCategory, setNewDebateCategory] = useState('anime');
    const [newDebatePlatforms, setNewDebatePlatforms] = useState('');
    const [newDebateDescription, setNewDebateDescription] = useState('');
    const [newDebateBanner, setNewDebateBanner] = useState('');
    const [newDebateStanceATitle, setNewDebateStanceATitle] = useState('');
    const [newDebateStanceASummary, setNewDebateStanceASummary] = useState('');
    const [newDebateStanceBTitle, setNewDebateStanceBTitle] = useState('');
    const [newDebateStanceBSummary, setNewDebateStanceBSummary] = useState('');
    const [newDebateTags, setNewDebateTags] = useState('');
    // Active debate object
    const activeDebate = useMemo(() => {
        return debates.find(d => d.id === activeDebateId) || debates[0];
    }, [debates, activeDebateId]);
    // Filtered debates
    const filteredDebates = useMemo(() => {
        return debates.filter(d => {
            const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
            const matchSearch = searchQuery.trim() === '' ||
                d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                d.platforms.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchCat && matchSearch;
        }).sort((a, b) => {
            const totalVotesA = a.stanceA.votes + a.stanceB.votes;
            const totalVotesB = b.stanceA.votes + b.stanceB.votes;
            if (sortBy === 'trending')
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || totalVotesB - totalVotesA;
            if (sortBy === 'votes')
                return totalVotesB - totalVotesA;
            if (sortBy === 'arguments')
                return b.arguments.length - a.arguments.length;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [debates, selectedCategory, searchQuery, sortBy]);
    // Filtered arguments in active debate
    const displayedArguments = useMemo(() => {
        if (!activeDebate)
            return [];
        let list = [...activeDebate.arguments];
        if (argumentStanceFilter !== 'ALL') {
            list = list.filter(a => a.stance === argumentStanceFilter);
        }
        return list.sort((a, b) => b.likes - a.likes);
    }, [activeDebate, argumentStanceFilter]);
    // Handle submit argument
    const handleAddArgument = (e) => {
        e.preventDefault();
        if (!activeDebate || !argTitle.trim() || !argContent.trim())
            return;
        addDebateArgument(activeDebate.id, {
            author: userProfile.name || 'Anonymous Fan',
            authorAvatar: userProfile.avatar || 'https://cdn.myanimelist.net/images/characters/9/310307.jpg',
            badge: argBadge,
            stance: argStance,
            title: argTitle.trim(),
            content: argContent.trim(),
            canonCitation: argCitation.trim() || undefined
        });
        setArgTitle('');
        setArgContent('');
        setArgCitation('');
        setShowArgForm(false);
        setFormSuccessMessage('Your argument and canon citations have been logged to the Fandom Coliseum!');
        setTimeout(() => setFormSuccessMessage(''), 4000);
    };
    // Handle create debate
    const handleCreateDebateSubmit = (e) => {
        e.preventDefault();
        if (!newDebateTitle.trim() || !newDebateStanceATitle.trim() || !newDebateStanceBTitle.trim())
            return;
        const platformsArray = newDebatePlatforms.split(',').map(s => s.trim()).filter(Boolean);
        const tagsArray = newDebateTags.split(',').map(s => s.trim()).filter(Boolean);
        createDebate({
            title: newDebateTitle.trim(),
            category: newDebateCategory,
            platforms: platformsArray.length > 0 ? platformsArray : ['Cross-Platform Fandom'],
            description: newDebateDescription.trim() || 'Community proposed cross-fandom debate.',
            banner: newDebateBanner.trim() || 'https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
            stanceA: {
                title: newDebateStanceATitle.trim(),
                summary: newDebateStanceASummary.trim() || newDebateStanceATitle.trim()
            },
            stanceB: {
                title: newDebateStanceBTitle.trim(),
                summary: newDebateStanceBSummary.trim() || newDebateStanceBTitle.trim()
            },
            tags: tagsArray.length > 0 ? tagsArray : ['Debate', 'Community']
        });
        setIsNewDebateModalOpen(false);
        setNewDebateTitle('');
        setNewDebateDescription('');
        setNewDebatePlatforms('');
        setNewDebateStanceATitle('');
        setNewDebateStanceASummary('');
        setNewDebateStanceBTitle('');
        setNewDebateStanceBSummary('');
        setNewDebateTags('');
    };
    // Stats calculation
    const totalVotesAcrossAll = useMemo(() => {
        return debates.reduce((acc, d) => acc + d.stanceA.votes + d.stanceB.votes, 0);
    }, [debates]);
    const totalArgumentsAcrossAll = useMemo(() => {
        return debates.reduce((acc, d) => acc + d.arguments.length, 0);
    }, [debates]);
    return (<div className="space-y-10 pb-24 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#111320] via-[#0d0f17] to-[#170e24] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"/>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"/>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse"/>
            <span>Fandom Coliseum & Cross-Platform Debate Arena</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Where Universes Collide & <br />
            <span className="bg-gradient-to-r from-rose-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Fans Battle Over Lore
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Anime vs Comic powerscaling, RPG lore supremacy, Novel adaptations vs Blockbusters, 
            and K-Pop generations. Cast your vote, cite canon chapters, and defend your universe with verified facts.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center space-x-2 text-rose-400 mb-1">
                <Swords className="w-4 h-4"/>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Active Debates</span>
              </div>
              <p className="text-xl font-extrabold text-white font-mono">{debates.length}</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center space-x-2 text-purple-400 mb-1">
                <MessageSquare className="w-4 h-4"/>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Canon Arguments</span>
              </div>
              <p className="text-xl font-extrabold text-white font-mono">{totalArgumentsAcrossAll}</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                <ThumbsUp className="w-4 h-4"/>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Community Votes</span>
              </div>
              <p className="text-xl font-extrabold text-white font-mono">{totalVotesAcrossAll.toLocaleString()}</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <TrendingUp className="w-4 h-4"/>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Debate Style</span>
              </div>
              <p className="text-xs font-semibold text-white mt-1">Peer-Reviewed Canon</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button onClick={() => setIsNewDebateModalOpen(true)} className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-transform active:scale-95">
              <PlusCircle className="w-4 h-4"/>
              <span>Propose New Debate Topic</span>
            </button>
          </div>
        </div>
      </section>

      {/* Success Notification Alert */}
      {formSuccessMessage && (<div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center space-x-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/>
          <span>{formSuccessMessage}</span>
        </div>)}

      {/* Filters & Search Control Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"/>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search matchups, franchises, lore points, characters..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"/>
            {searchQuery && (<button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4"/>
              </button>)}
          </div>

          {/* Sort selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-slate-400">Sort By:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#121420] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500">
              <option value="trending">Trending & Featured</option>
              <option value="votes">Most Community Votes</option>
              <option value="arguments">Most Arguments</option>
              <option value="newest">Recently Opened</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Matchups' },
            { id: 'anime', label: 'Anime & Manga' },
            { id: 'gaming', label: 'Gaming Worlds' },
            { id: 'movies', label: 'Cinematic Adaptations' },
            { id: 'tv-shows', label: 'TV & Series' },
            { id: 'comics', label: 'Comics & Lore' },
            { id: 'k-pop', label: 'K-Pop Generations' }
        ].map(tab => (<button key={tab.id} onClick={() => setSelectedCategory(tab.id)} className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${selectedCategory === tab.id
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 border border-rose-400'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06]'}`}>
              {tab.label}
            </button>))}
        </div>
      </section>

      {/* Main Grid: Active Debate Arena (Left / Full Width on Expand) & Debate List Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (7/12): Active Spotlight Debate Arena */}
        {activeDebate ? (<div className="lg:col-span-8 space-y-6">
            
            {/* Active Debate Header Card */}
            <div className="rounded-3xl border border-white/15 bg-[#0e101a] overflow-hidden shadow-2xl relative">
              {/* Banner Backdrop */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                <img src={activeDebate.banner} alt={activeDebate.title} className="w-full h-full object-cover brightness-75 scale-105 hover:scale-100 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e101a] via-[#0e101a]/70 to-transparent"/>
                
                {/* Platform Tags */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {activeDebate.platforms.map((p, idx) => (<span key={idx} className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-rose-300 border border-rose-500/30">
                        {p}
                      </span>))}
                  </div>

                  {activeDebate.featured && (<span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-amber-400"/>
                      <span>Featured Coliseum Battle</span>
                    </span>)}
                </div>

                {/* Battle Title on Backdrop */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug drop-shadow-md">
                    {activeDebate.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 drop-shadow">
                    {activeDebate.description}
                  </p>
                </div>
              </div>

              {/* Voting Stances Interactive Arena */}
              <div className="p-6 space-y-6">
                
                {(() => {
                const totalVotes = activeDebate.stanceA.votes + activeDebate.stanceB.votes;
                const pctA = totalVotes > 0 ? Math.round((activeDebate.stanceA.votes / totalVotes) * 100) : 50;
                const pctB = 100 - pctA;
                const myVote = userVotes[activeDebate.id];
                return (<div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <span className="text-cyan-400">Side A ({pctA}%)</span>
                        <span>{totalVotes.toLocaleString()} Total Votes Cast</span>
                        <span className="text-rose-400">Side B ({pctB}%)</span>
                      </div>

                      {/* Animated Split Vote Progress Bar */}
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-white/10 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-l-full transition-all duration-500" style={{ width: `${pctA}%` }}/>
                        <div className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-r-full transition-all duration-500" style={{ width: `${pctB}%` }}/>
                      </div>

                      {/* Stance A vs Stance B Cards & Cast Vote Buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Stance A Box */}
                        <div className={`p-4 rounded-2xl border transition-all ${myVote === 'A'
                        ? 'bg-cyan-950/30 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                        : 'bg-white/[0.03] border-white/10 hover:border-cyan-500/40'}`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                              Side A: {pctA}%
                            </span>
                            {myVote === 'A' && (<span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-cyan-400"/>
                                <span>Your Stance</span>
                              </span>)}
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1.5">{activeDebate.stanceA.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{activeDebate.stanceA.summary}</p>

                          <button onClick={() => voteDebate(activeDebate.id, 'A')} className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${myVote === 'A'
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                        : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30'}`}>
                            <ThumbsUp className="w-3.5 h-3.5"/>
                            <span>{myVote === 'A' ? 'Voted For Side A' : `Vote Side A (${activeDebate.stanceA.votes})`}</span>
                          </button>
                        </div>

                        {/* Stance B Box */}
                        <div className={`p-4 rounded-2xl border transition-all ${myVote === 'B'
                        ? 'bg-rose-950/30 border-rose-500 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/50'
                        : 'bg-white/[0.03] border-white/10 hover:border-rose-500/40'}`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                              Side B: {pctB}%
                            </span>
                            {myVote === 'B' && (<span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-rose-400"/>
                                <span>Your Stance</span>
                              </span>)}
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1.5">{activeDebate.stanceB.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{activeDebate.stanceB.summary}</p>

                          <button onClick={() => voteDebate(activeDebate.id, 'B')} className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${myVote === 'B'
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                        : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30'}`}>
                            <ThumbsUp className="w-3.5 h-3.5"/>
                            <span>{myVote === 'B' ? 'Voted For Side B' : `Vote Side B (${activeDebate.stanceB.votes})`}</span>
                          </button>
                        </div>

                      </div>
                    </div>);
            })()}

                {/* Tags */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-white/10">
                  <span className="text-[11px] text-slate-400 mr-1">Tags:</span>
                  {activeDebate.tags.map((t, i) => (<span key={i} className="px-2 py-0.5 rounded-full bg-white/[0.04] text-[10px] text-slate-300 border border-white/[0.08]">
                      #{t}
                    </span>))}
                </div>

              </div>
            </div>

            {/* Arguments Section / Forum Feed */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-rose-400"/>
                    <span>Canon Arguments & Counter-Claims ({displayedArguments.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Peer-reviewed community essays with verified citations.
                  </p>
                </div>

                <button onClick={() => setShowArgForm(!showArgForm)} className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto">
                  <PlusCircle className="w-4 h-4"/>
                  <span>{showArgForm ? 'Close Editor' : 'Drop Your Argument'}</span>
                </button>
              </div>

              {/* Argument Submission Form */}
              {showArgForm && (<form onSubmit={handleAddArgument} className="p-5 rounded-2xl bg-[#121422] border border-rose-500/30 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center space-x-1.5">
                      <Swords className="w-4 h-4 text-rose-400"/>
                      <span>Defend Your Universe In The Coliseum</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Posting as {userProfile.name}</span>
                  </div>

                  {/* Stance Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Choose Which Stance You Defend:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setArgStance('A')} className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border ${argStance === 'A'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                        <span className="text-[10px] block opacity-75">Side A</span>
                        <span className="truncate block font-bold">{activeDebate.stanceA.title}</span>
                      </button>

                      <button type="button" onClick={() => setArgStance('B')} className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border ${argStance === 'B'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                        <span className="text-[10px] block opacity-75">Side B</span>
                        <span className="truncate block font-bold">{activeDebate.stanceB.title}</span>
                      </button>
                    </div>
                  </div>

                  {/* Badge & Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Argument Core Claim / Title:</label>
                      <input type="text" required value={argTitle} onChange={(e) => setArgTitle(e.target.value)} placeholder="e.g. Speed of Light Feats directly contradict planetary scaling" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Debate Badge:</label>
                      <select value={argBadge} onChange={(e) => setArgBadge(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#0e101a] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-rose-500">
                        <option value="Canon Scholar">Canon Scholar</option>
                        <option value="Lore Theorist">Lore Theorist</option>
                        <option value="Powerscaler">Powerscaler</option>
                        <option value="Casual Fan">Casual Fan</option>
                        <option value="Adaptation Purist">Adaptation Purist</option>
                      </select>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Argument Details & Lore Evidence:</label>
                    <textarea required rows={4} value={argContent} onChange={(e) => setArgContent(e.target.value)} placeholder="Lay down your logical thesis, feats, timestamps, or quotes that support your stance..." className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                  </div>

                  {/* Canon Citation */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400"/>
                      <span>Canon Chapter, Episode, Issue, or Patch Citation:</span>
                    </label>
                    <input type="text" value={argCitation} onChange={(e) => setArgCitation(e.target.value)} placeholder="e.g. Manga Chapter 1044 / Action Comics Vol 2 #775 / Patch 1.12 Lore" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button type="button" onClick={() => setShowArgForm(false)} className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-rose-600/30">
                      <Send className="w-3.5 h-3.5"/>
                      <span>Submit To Coliseum</span>
                    </button>
                  </div>
                </form>)}

              {/* Argument Filter Tabs */}
              <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                <button onClick={() => setArgumentStanceFilter('ALL')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${argumentStanceFilter === 'ALL'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'}`}>
                  All Arguments ({activeDebate.arguments.length})
                </button>
                <button onClick={() => setArgumentStanceFilter('A')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${argumentStanceFilter === 'A'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-cyan-400'}`}>
                  Side A ({activeDebate.arguments.filter(a => a.stance === 'A').length})
                </button>
                <button onClick={() => setArgumentStanceFilter('B')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${argumentStanceFilter === 'B'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-rose-400'}`}>
                  Side B ({activeDebate.arguments.filter(a => a.stance === 'B').length})
                </button>
              </div>

              {/* Arguments List */}
              <div className="space-y-4">
                {displayedArguments.length === 0 ? (<div className="text-center py-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-slate-400 text-xs">No arguments logged for this stance yet. Be the first to defend this side!</p>
                  </div>) : (displayedArguments.map(arg => {
                const isStanceA = arg.stance === 'A';
                return (<div key={arg.id} className={`p-5 rounded-2xl border transition-all ${isStanceA
                        ? 'bg-[#0c101c]/80 border-cyan-500/20 hover:border-cyan-500/40'
                        : 'bg-[#180d16]/80 border-rose-500/20 hover:border-rose-500/40'}`}>
                        {/* Header: Author + Stance Pill */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <img src={arg.authorAvatar} alt={arg.author} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"/>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-white">{arg.author}</span>
                                {arg.badge && (<span className="px-2 py-0.2 rounded-full bg-white/10 text-[9px] font-semibold text-slate-300">
                                    {arg.badge}
                                  </span>)}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {new Date(arg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isStanceA
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'}`}>
                            Defending Side {arg.stance}
                          </span>
                        </div>

                        {/* Argument Title & Content */}
                        <h4 className="text-sm font-bold text-white mb-2">{arg.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3 whitespace-pre-line">{arg.content}</p>

                        {/* Canon Citation Callout */}
                        {arg.canonCitation && (<div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-start space-x-2 text-xs mb-3">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"/>
                            <div className="min-w-0">
                              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">Canon Lore Citation</span>
                              <span className="text-slate-300 text-xs italic">{arg.canonCitation}</span>
                            </div>
                          </div>)}

                        {/* Footer actions: Like button & Upvote count */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                          <button onClick={() => likeDebateArgument(activeDebate.id, arg.id)} className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-rose-400 transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5 text-rose-400"/>
                            <span>Vouch Argument ({arg.likes})</span>
                          </button>

                          <span className="text-[10px] text-slate-400">
                            {arg.repliesCount || 0} community replies
                          </span>
                        </div>
                      </div>);
            }))}
              </div>
            </div>

          </div>) : null}

        {/* Right Col (4/12): Fandom Debates Registry & Quick Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Coliseum Matchups</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                {filteredDebates.length} Open
              </span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select any collision below to inspect stances, cast your vote, and enter the debate arena.
            </p>

            <div className="space-y-3">
              {filteredDebates.map(debate => {
            const isSelected = debate.id === activeDebateId;
            const totalVotes = debate.stanceA.votes + debate.stanceB.votes;
            const myVote = userVotes[debate.id];
            return (<div key={debate.id} onClick={() => {
                    setActiveDebateId(debate.id);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                }} className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${isSelected
                    ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'}`}>
                    <div className="flex gap-3">
                      <img src={debate.banner} alt={debate.title} className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-white/10"/>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-medium truncate">
                            {debate.platforms[0] || debate.category}
                          </span>
                          {myVote && (<span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold shrink-0">
                              Voted {myVote}
                            </span>)}
                        </div>

                        <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-rose-300 transition-colors">
                          {debate.title}
                        </h4>

                        <div className="flex items-center space-x-2 mt-2 text-[10px] text-slate-400">
                          <span>{totalVotes.toLocaleString()} votes</span>
                          <span>•</span>
                          <span>{debate.arguments.length} arguments</span>
                        </div>
                      </div>
                    </div>
                  </div>);
        })}
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/20 to-indigo-950/20 border border-purple-500/20 space-y-2">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-purple-400"/>
              <span>Coliseum Debate Rules</span>
            </h4>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>Always cite specific chapters, episodes, or official canon sources.</li>
              <li>Respect headcanons, but separate them from canonical feats.</li>
              <li>No toxic fandom hostility — keep discussions passionate and intellectual.</li>
              <li>Upvote thoughtful counter-arguments even if you disagree with the stance.</li>
            </ul>
          </div>
        </div>

      </section>

      {/* Propose New Debate Modal */}
      {isNewDebateModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f111c] border border-white/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Swords className="w-5 h-5 text-rose-400"/>
                <h3 className="text-lg font-bold text-white font-heading">Propose A Cross-Fandom Debate</h3>
              </div>
              <button onClick={() => setIsNewDebateModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={handleCreateDebateSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Debate Title / Collision Topic:</label>
                <input type="text" required value={newDebateTitle} onChange={(e) => setNewDebateTitle(e.target.value)} placeholder="e.g. Sukuna vs Gojo: Who dictated the Jujutsu pinnacle?" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category Hub:</label>
                  <select value={newDebateCategory} onChange={(e) => setNewDebateCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#141624] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500">
                    <option value="anime">Anime & Manga</option>
                    <option value="gaming">Gaming</option>
                    <option value="movies">Movies</option>
                    <option value="tv-shows">TV Shows</option>
                    <option value="comics">Comics</option>
                    <option value="k-pop">K-Pop</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Platforms Involved (comma separated):</label>
                  <input type="text" value={newDebatePlatforms} onChange={(e) => setNewDebatePlatforms(e.target.value)} placeholder="e.g. Manga, Shonen Jump, MAPPA Anime" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Debate Background & Lore Synopsis:</label>
                <textarea rows={3} value={newDebateDescription} onChange={(e) => setNewDebateDescription(e.target.value)} placeholder="Provide context on why this collision matters to fans across both mediums..." className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
              </div>

              {/* Side A & Side B Form Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Side A */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">Side A Stance</span>
                  <input type="text" required value={newDebateStanceATitle} onChange={(e) => setNewDebateStanceATitle(e.target.value)} placeholder="Side A Title (e.g. Ryomen Sukuna)" className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
                  <textarea rows={2} value={newDebateStanceASummary} onChange={(e) => setNewDebateStanceASummary(e.target.value)} placeholder="Core claim of Side A..." className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
                </div>

                {/* Side B */}
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wide">Side B Stance</span>
                  <input type="text" required value={newDebateStanceBTitle} onChange={(e) => setNewDebateStanceBTitle(e.target.value)} placeholder="Side B Title (e.g. Satoru Gojo)" className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                  <textarea rows={2} value={newDebateStanceBSummary} onChange={(e) => setNewDebateStanceBSummary(e.target.value)} placeholder="Core claim of Side B..." className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Banner Image URL (optional):</label>
                  <input type="text" value={newDebateBanner} onChange={(e) => setNewDebateBanner(e.target.value)} placeholder="https://image.tmdb.org/..." className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Tags (comma separated):</label>
                  <input type="text" value={newDebateTags} onChange={(e) => setNewDebateTags(e.target.value)} placeholder="e.g. Jujutsu Kaisen, Domain Expansion, Shonen" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"/>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsNewDebateModalOpen(false)} className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30">
                  Publish To Fandom Coliseum
                </button>
              </div>

            </form>

          </div>
        </div>)}

    </div>);
};
