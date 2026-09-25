import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Views
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { CategoryHubView } from './views/CategoryHubView';
import { CollectionTrackerView } from './views/CollectionTrackerView';
import { ReviewsView } from './views/ReviewsView';
import { CalendarView } from './views/CalendarView';
import { ProfileView } from './views/ProfileView';
import { MerchandiseView } from './views/MerchandiseView';
import { ContactView } from './views/ContactView';
import { AboutView } from './views/AboutView';
import { MusicView } from './views/MusicView';
import { CommunityView } from './views/CommunityView';
// Components & Audio Player
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BackNavigationBar } from './components/BackNavigationBar';
// Modals
import { MediaDetailModal } from './components/MediaDetailModal';
import { CharacterModal } from './components/CharacterModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ImageGalleryModal } from './components/ImageGalleryModal';
import { CartDrawer } from './components/CartDrawer';
import { BookmarksModal } from './components/BookmarksModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { ReviewModal } from './components/ReviewModal';
import { ChatbotWidget } from './components/ChatbotWidget';
const MainContent = () => {
    const { currentView } = useApp();
    return (<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <BackNavigationBar />
      {currentView === 'home' && <HomeView />}
      {currentView === 'discover' && <DiscoverView />}
      {currentView === 'category' && <CategoryHubView />}
      {(currentView === 'collection' || currentView === 'progress') && <CollectionTrackerView />}
      {currentView === 'reviews' && <ReviewsView />}
      {currentView === 'calendar' && <CalendarView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'merchandise' && <MerchandiseView />}
      {currentView === 'contact' && <ContactView />}
      {currentView === 'about' && <AboutView />}
      {currentView === 'music' && <MusicView />}
      {currentView === 'community' && <CommunityView />}
    </main>);
};
export function App() {
    return (<AppProvider>
      <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route View */}
        <MainContent />

        {/* Global Modals & Overlays */}
        <MediaDetailModal />
        <CharacterModal />
        <ArticleDetailModal />
        <VideoPlayerModal />
        <ImageGalleryModal />
        <CartDrawer />
        <BookmarksModal />
        <GlobalSearchModal />
        <AuthModal />
        <ReviewModal />

        {/* Floating AI Chatbot Widget (SRS page 12) */}
        <ChatbotWidget />

        {/* Floating Spotify Audio Player Bar */}
        <AudioPlayerBar />

        {/* Global Site Footer */}
        <Footer />
        
      </div>
    </AppProvider>);
}
export default App;
