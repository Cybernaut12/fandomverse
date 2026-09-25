import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchModal } from '@/components/SearchModal';
import { HomePage } from '@/pages/HomePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { TrendingDetailPage } from '@/pages/TrendingDetailPage';
import { TrendingPage } from '@/pages/TrendingPage';
import { CharacterDetailPage } from '@/pages/CharacterDetailPage';
import { EventDetailPage } from '@/pages/EventDetailPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return undefined;
        }

        let secondFrame;
        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                const target = document.getElementById(decodeURIComponent(hash.slice(1)));
                if (!target) return;

                const fixedHeaderOffset = 56;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - fixedHeaderOffset;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrame);
            if (secondFrame) window.cancelAnimationFrame(secondFrame);
        };
    }, [pathname, hash]);
    return null;
}
function AppRoutes() {
    const [searchOpen, setSearchOpen] = useState(false);
    return (<>
      <ScrollToTop />
      <Header onSearchOpen={() => setSearchOpen(true)}/>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)}/>
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/category/:slug" element={<CategoryPage />}/>
          <Route path="/articles" element={<ArticlesPage />}/>
          <Route path="/article/:slug" element={<ArticleDetailPage />}/>
          <Route path="/trending" element={<TrendingPage />}/>
          <Route path="/trending/:slug" element={<TrendingDetailPage />}/>
          <Route path="/character/:id" element={<CharacterDetailPage />}/>
          <Route path="/event/:id" element={<EventDetailPage />}/>
          <Route path="/bookmarks" element={<BookmarksPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </main>
      <Footer />
      <Chatbot onSearchOpen={() => setSearchOpen(true)} />
    </>);
}
export default function App() {
    return (<BrowserRouter>
      <CartProvider>
        <BookmarkProvider>
          <AppRoutes />
        </BookmarkProvider>
      </CartProvider>
    </BrowserRouter>);
}
