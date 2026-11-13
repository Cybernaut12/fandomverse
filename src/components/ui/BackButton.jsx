import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BackButton.css';

const routesWithContextualBack = ['/trending', '/article/', '/character/', '/event/', '/trending/'];
const knownRoutes = ['/', '/articles', '/trending', '/events', '/bookmarks', '/about', '/contact', '/login', '/signup'];

export function BackButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hasContextualBack = routesWithContextualBack.some((route) =>
    route.endsWith('/') ? pathname.startsWith(route) : pathname === route
  );
  const isKnownPage = knownRoutes.includes(pathname) || pathname.startsWith('/category/');

  if (pathname === '/' || hasContextualBack || !isKnownPage) return null;

  const hasPreviousAppPage = Number.isInteger(window.history.state?.idx) && window.history.state.idx > 0;
  const isHomeWithoutHistory = pathname === '/' && !hasPreviousAppPage;

  const goBack = () => {
    if (hasPreviousAppPage) {
      navigate(-1);
    } else if (pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <button
      type="button"
      className="site-back-button"
      onClick={goBack}
      disabled={isHomeWithoutHistory}
      aria-label={isHomeWithoutHistory ? 'You are already on the home page' : 'Go back'}
      title={isHomeWithoutHistory ? 'You are already on the home page' : 'Go back'}
    >
      <ArrowLeft size={18} aria-hidden="true" />
      <span>Back</span>
    </button>
  );
}

