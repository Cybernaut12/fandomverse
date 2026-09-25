import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Lock, Eye, EyeOff } from 'lucide-react';
export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16 d-flex align-items-center">
      <div className="container-narrow fv-py-12">
        <div className="fv-max-w-md mx-auto">
          <Link to="/" className="d-flex align-items-center gap-2 justify-content-center fv-mb-8">
            <Compass className="fv-w-7 fv-h-7 fv-text-brand-400"/>
            <span className="fv-display-font fv-text-2xl fv-tracking-wider fv-text-paper-50">
              Fandom<span className="fv-text-brand-400">Verse</span>
            </span>
          </Link>

          <div className="fv-bg-ink-800 rounded-4 fv-p-6 fv-md-p-8 border fv-border-ink-600">
            <h1 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide text-center fv-mb-2">Welcome Back</h1>
            <p className="fv-text-sm fv-text-paper-300 text-center fv-mb-6">Log in to continue exploring the fandom universe.</p>

            {submitted && (<div className="fv-bg-gaming-15 border fv-border-gaming-40 rounded-3 fv-p-3 fv-text-sm fv-text-gaming fv-mb-4 fv-animate-fade-in">
                This is a UI demo — no actual login happens. Your data isn't stored anywhere.
              </div>)}

            <form onSubmit={handleSubmit} className="fv-space-y-4">
              <div>
                <label htmlFor="login-email" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                  Email
                </label>
                <div className="position-relative">
                  <Mail className="position-absolute fv-left-3 fv-top-1-2 fv-translate-y-1-2 fv-w-4 fv-h-4 fv-text-paper-300-40"/>
                  <input id="login-email" type="email" required className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-pl-10 fv-pr-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="you@example.com"/>
                </div>
              </div>
              <div>
                <label htmlFor="login-password" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                  Password
                </label>
                <div className="position-relative">
                  <Lock className="position-absolute fv-left-3 fv-top-1-2 fv-translate-y-1-2 fv-w-4 fv-h-4 fv-text-paper-300-40"/>
                  <input id="login-password" type={showPassword ? 'text' : 'password'} required className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-pl-10 fv-pr-10 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="••••••••"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="position-absolute fv-right-3 fv-top-1-2 fv-translate-y-1-2 fv-text-paper-300-40 fv-hover-text-paper-200 fv-transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="fv-w-4 fv-h-4"/> : <Eye className="fv-w-4 fv-h-4"/>}
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between fv-text-sm">
                <label className="d-flex align-items-center gap-2 fv-text-paper-300 fv-cursor-pointer">
                  <input type="checkbox" className="fv-rounded fv-border-ink-500 fv-bg-ink-700 fv-text-brand-500 fv-focus-ring-brand-400"/>
                  <span>Remember me</span>
                </label>
                <button type="button" className="fv-text-brand-400 fv-hover-text-brand-300 fv-transition-colors fv-text-xs">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="w-100 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors fv-active-scale-95">
                Log In
              </button>
            </form>

            <div className="fv-mt-6 text-center fv-text-sm fv-text-paper-300">
              New here?{' '}
              <Link to="/signup" className="fv-text-brand-400 fv-hover-text-brand-300 fv-heading-font fv-transition-colors">
                Create an account
              </Link>
            </div>
          </div>

          <p className="fv-text-xs fv-text-paper-300-40 text-center fv-mt-4">
            Login is for demonstration only. No authentication or data storage occurs.
          </p>
        </div>
      </div>
    </div>);
}
