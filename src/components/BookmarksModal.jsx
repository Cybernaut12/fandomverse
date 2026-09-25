import React, { useState } from 'react';
import { X, Bookmark, Trash2, Download, Copy, Check, StickyNote, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const BookmarksModal = () => {
    const { isBookmarksModalOpen, setIsBookmarksModalOpen, bookmarks, toggleBookmark, mediaList, characters, events, articles, sessionNotes, setSessionNote, getSessionNote, exportBookmarksList, setSelectedMedia, setSelectedCharacter } = useApp();
    const [activeFilter, setActiveFilter] = useState('all');
    const [copiedExport, setCopiedExport] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [noteInput, setNoteInput] = useState('');
    if (!isBookmarksModalOpen)
        return null;
    // Resolve bookmarked items
    const bookmarkedMedia = mediaList.filter(m => bookmarks.includes(m.id));
    const bookmarkedCharacters = characters.filter(c => bookmarks.includes(c.id));
    const bookmarkedEvents = events.filter(e => bookmarks.includes(e.id));
    const totalCount = bookmarkedMedia.length + bookmarkedCharacters.length + bookmarkedEvents.length;
    const handleCopyExport = () => {
        const text = exportBookmarksList();
        navigator.clipboard?.writeText(text);
        setCopiedExport(true);
        setTimeout(() => setCopiedExport(false), 2500);
    };
    const handleDownloadExport = () => {
        const text = exportBookmarksList();
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `FandomVerse_Bookmarks_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    const startEditNote = (id) => {
        setEditingNoteId(id);
        setNoteInput(getSessionNote(id));
    };
    const saveNote = (id) => {
        setSessionNote(id, noteInput);
        setEditingNoteId(null);
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 text-slate-200 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Bookmark className="w-5 h-5 fill-amber-400"/>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Bookmarked Fandoms & Vault ({totalCount})
              </h2>
              <p className="text-xs text-slate-400">
                Stored in LocalStorage • Personal session notes stored in SessionStorage
              </p>
            </div>
          </div>

          <button onClick={() => setIsBookmarksModalOpen(false)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Action Controls & Export Bar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08]">
          <div className="flex items-center space-x-1.5">
            {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'media', label: `Titles (${bookmarkedMedia.length})` },
            { id: 'characters', label: `Characters (${bookmarkedCharacters.length})` },
            { id: 'events', label: `Events (${bookmarkedEvents.length})` }
        ].map(tab => (<button key={tab.id} onClick={() => setActiveFilter(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeFilter === tab.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
                {tab.label}
              </button>))}
          </div>

          {/* Export Buttons (SRS page 13) */}
          <div className="flex items-center space-x-2">
            <button onClick={handleCopyExport} disabled={totalCount === 0} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-all flex items-center space-x-1.5 disabled:opacity-50" title="Copy formatted list to clipboard">
              {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400"/> : <Copy className="w-3.5 h-3.5"/>}
              <span>{copiedExport ? 'Copied List!' : 'Copy List'}</span>
            </button>

            <button onClick={handleDownloadExport} disabled={totalCount === 0} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all flex items-center space-x-1.5 disabled:opacity-50" title="Download formatted text file">
              <Download className="w-3.5 h-3.5"/>
              <span>Export .TXT</span>
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="py-4 space-y-3 flex-1 overflow-y-auto max-h-[55vh]">
          {totalCount === 0 ? (<div className="text-center py-16 text-slate-500 space-y-2">
              <Bookmark className="w-12 h-12 mx-auto text-slate-600"/>
              <p className="text-sm font-semibold text-slate-300">No bookmarked items yet</p>
              <p className="text-xs text-slate-500">
                Click the bookmark ribbon on any title, character profile, or event to add it here.
              </p>
            </div>) : (<>
              {/* Media Items */}
              {(activeFilter === 'all' || activeFilter === 'media') && bookmarkedMedia.map(item => {
                const note = getSessionNote(item.id);
                return (<div key={item.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => {
                        setIsBookmarksModalOpen(false);
                        setSelectedMedia(item);
                    }}>
                        <img src={item.coverImage} alt={item.title} className="w-12 h-16 rounded-md object-cover"/>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">
                            {item.category} • {item.year}
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center space-x-1">
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500"/>
                          </h4>
                          <p className="text-xs text-slate-400">{item.rating} ★ • {item.genres.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>

                      <button onClick={() => toggleBookmark(item.id)} className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors" title="Remove bookmark">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>

                    {/* Personal Session Note (SessionStorage) */}
                    <div className="pt-2 border-t border-white/[0.06]">
                      {editingNoteId === item.id ? (<div className="flex items-center space-x-2">
                          <input type="text" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} placeholder="Add your session note (e.g. remember chapter 45)..." className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400" autoFocus/>
                          <button onClick={() => saveNote(item.id)} className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400">
                            Save Note
                          </button>
                        </div>) : (<div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1.5 text-amber-300/90 italic">
                            <StickyNote className="w-3.5 h-3.5 flex-shrink-0"/>
                            <span>{note ? `"${note}"` : 'No session note attached'}</span>
                          </div>
                          <button onClick={() => startEditNote(item.id)} className="text-[11px] text-slate-400 hover:text-white underline ml-2">
                            {note ? 'Edit Note' : '+ Add Note'}
                          </button>
                        </div>)}
                    </div>
                  </div>);
            })}

              {/* Characters Items */}
              {(activeFilter === 'all' || activeFilter === 'characters') && bookmarkedCharacters.map(char => (<div key={char.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => {
                    setIsBookmarksModalOpen(false);
                    setSelectedCharacter(char);
                }}>
                    <img src={char.image} alt={char.name} className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-500/50"/>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-400 font-mono">
                        {char.category} • {char.role}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {char.name}
                      </h4>
                      <p className="text-xs text-slate-400">{char.series}</p>
                    </div>
                  </div>

                  <button onClick={() => toggleBookmark(char.id)} className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>))}
            </>)}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>Formatted export supports Markdown and text reader apps.</span>
          <button onClick={() => setIsBookmarksModalOpen(false)} className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
            Done
          </button>
        </div>

      </div>
    </div>);
};
