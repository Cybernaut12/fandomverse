import React, { useState } from 'react';
import { MapPin, Globe, Calendar, Edit3, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const ProfileView = () => {
    const { userProfile, updateUserProfile, reviews, mediaList, setSelectedMedia, bookmarks } = useApp();
    const [activeTab, setActiveTab] = useState('activity');
    const [isEditing, setIsEditing] = useState(false);
    // Edit form state
    const [editName, setEditName] = useState(userProfile.name);
    const [editBio, setEditBio] = useState(userProfile.bio);
    const [editLocation, setEditLocation] = useState(userProfile.location);
    const [editWebsite, setEditWebsite] = useState(userProfile.website);
    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateUserProfile({
            name: editName,
            bio: editBio,
            location: editLocation,
            website: editWebsite
        });
        setIsEditing(false);
    };
    const userReviews = reviews.filter(r => r.author === userProfile.name);
    const favoriteMedia = mediaList.filter(m => bookmarks.includes(m.id));
    return (<div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Banner & Profile Card (Screen 9) */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Banner Image */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img src={userProfile.banner} alt="Profile Banner" className="w-full h-full object-cover filter brightness-[0.8]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-transparent to-black/20"/>
        </div>

        {/* Profile Info Container */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            
            {/* Avatar & Display Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-3 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-[#0e1018] shadow-2xl relative z-10"/>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {userProfile.name}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold">
                  {userProfile.username}
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-all flex items-center space-x-2">
              <Edit3 className="w-3.5 h-3.5 text-purple-400"/>
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Bio & Meta */}
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {userProfile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500"/>
                <span>{userProfile.location}</span>
              </span>
              <span>•</span>
              <a href={`https://${userProfile.website}`} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <Globe className="w-3.5 h-3.5 text-cyan-400"/>
                <span>{userProfile.website}</span>
              </a>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500"/>
                <span>Joined {userProfile.joinedDate}</span>
              </span>
            </div>
          </div>

          {/* Stats Bar (Screen 9: 428 Items, 214 Completed, 37 Lists, 68 Reviews, 1.2K Followers, 384 Following) */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-white font-mono">{userProfile.itemsCount}</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Items</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">{userProfile.completedCount}</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Completed</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-purple-400 font-mono">{userProfile.listsCount}</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Lists</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-amber-400 font-mono">{userProfile.reviewsCount}</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Reviews</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">1.2K</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Followers</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-300 font-mono">{userProfile.following}</span>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Following</p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Row (Screen 9: Activity, Lists, Favorites, Reviews) */}
      <div className="flex items-center space-x-2 border-b border-white/[0.08] overflow-x-auto scrollbar-none pb-1">
        {[
            { id: 'activity', label: 'Activity' },
            { id: 'lists', label: `Lists (${userProfile.listsCount})` },
            { id: 'favorites', label: `Favorites (${favoriteMedia.length})` },
            { id: 'reviews', label: `Reviews (${userReviews.length})` }
        ].map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-slate-400 hover:text-white'}`}>
            {tab.label}
          </button>))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'activity' && (<div className="space-y-4">
          {[
                {
                    id: 'act-1',
                    action: 'completed',
                    target: 'Dune: Part Two',
                    category: 'Movie',
                    rating: 5,
                    time: '2 days ago',
                    comment: 'Incredible on the big screen, Villeneuve is operating on another level.'
                },
                {
                    id: 'act-2',
                    action: 'read chapter 1080',
                    target: 'ONE PIECE',
                    category: 'Manga',
                    rating: 5,
                    time: '4 days ago',
                    comment: 'Egghead Island revelations rewrote the Void Century lore completely.'
                },
                {
                    id: 'act-3',
                    action: 'played 65 hours',
                    target: 'Elden Ring',
                    category: 'Game',
                    rating: 5,
                    time: '1 week ago',
                    comment: 'Defeated Malenia after 40 attempts! Unmatched sense of accomplishment.'
                }
            ].map(act => (<div key={act.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{userProfile.name}</span>
                  <span className="text-slate-400">{act.action}</span>
                  <span className="font-bold text-cyan-400">{act.target}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300">
                    {act.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">{act.time}</span>
              </div>

              {act.comment && (<p className="text-xs text-slate-300 pl-3 border-l border-cyan-400/60 italic">
                  "{act.comment}"
                </p>)}
            </div>))}
        </div>)}

      {activeTab === 'favorites' && (<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favoriteMedia.map(item => (<div key={item.id} onClick={() => setSelectedMedia(item)} className="p-3 rounded-xl glass-card border border-white/10 hover:border-cyan-400/50 cursor-pointer space-y-2 transition-all hover:scale-105">
              <img src={item.coverImage} alt={item.title} className="w-full aspect-[3/4] rounded-lg object-cover"/>
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <p className="text-[10px] text-cyan-400">{item.rating} ★ • {item.category}</p>
            </div>))}
        </div>)}

      {activeTab === 'reviews' && (<div className="space-y-4">
          {userReviews.map(rev => (<div key={rev.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{rev.mediaTitle}</h4>
                <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400"/>
                  <span>{rev.rating} / 5</span>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-200">{rev.title}</p>
              <p className="text-xs text-slate-400">{rev.content}</p>
            </div>))}
        </div>)}

      {activeTab === 'lists' && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Curated List • 18 Items</span>
            <h4 className="text-sm font-bold text-white">Masterpiece Cyberpunk & Dystopias</h4>
            <p className="text-xs text-slate-400">Alita, Cyberpunk: Edgerunners, Pluto, The Batman and Blade Runner.</p>
          </div>
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Curated List • 12 Items</span>
            <h4 className="text-sm font-bold text-white">Peak Shonen & Seinen Battle Arcs</h4>
            <p className="text-xs text-slate-400">Marineford, Shibuya Incident, Eclipse, Chimera Ant and Solo Leveling.</p>
          </div>
        </div>)}

      {/* Edit Profile Modal */}
      {isEditing && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 text-slate-200 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">Edit Profile Info</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Display Name</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400" required/>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Bio</label>
                <textarea rows={3} value={editBio} onChange={(e) => setEditBio(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400" required/>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Location</label>
                <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"/>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Website</label>
                <input type="text" value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"/>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>)}

    </div>);
};
