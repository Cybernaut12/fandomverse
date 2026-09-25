import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
export function SignUpPage() {
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
            <h1 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide text-center fv-mb-2">Join FandomVerse</h1>
            <p className="fv-text-sm fv-text-paper-300 text-center fv-mb-6">Create an account to bookmark and track your favorites.</p>

            {submitted && (<div className="fv-bg-gaming-15 border fv-border-gaming-40 rounded-3 fv-p-3 fv-text-sm fv-text-gaming fv-mb-4 fv-animate-fade-in">
                This is a UI demo — no account is actually created. No data is stored.
              </div>)}

            <form onSubmit={handleSubmit} className="fv-space-y-4">
              <div>
                <label htmlFor="signup-name" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                  Display Name
                </label>
                <div className="position-relative">
                  <User className="position-absolute fv-left-3 fv-top-1-2 fv-translate-y-1-2 fv-w-4 fv-h-4 fv-text-paper-300-40"/>
                  <input id="signup-name" type="text" required className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-pl-10 fv-pr-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="Your name"/>
                </div>
              </div>
              <div>
                <label htmlFor="signup-email" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                  Email
                </label>
                <div className="position-relative">
                  <Mail className="position-absolute fv-left-3 fv-top-1-2 fv-translate-y-1-2 fv-w-4 fv-h-4 fv-text-paper-300-40"/>
                  <input id="signup-email" type="email" required className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-pl-10 fv-pr-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="you@example.com"/>
                </div>
              </div>
              <div>
                <label htmlFor="signup-password" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                  Password
                </label>
                <div className="position-relative">
                  <Lock className="position-absolute fv-left-3 fv-top-1-2 fv-translate-y-1-2 fv-w-4 fv-h-4 fv-text-paper-300-40"/>
                  <input id="signup-password" type={showPassword ? 'text' : 'password'} required minLength={8} className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-pl-10 fv-pr-10 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="At least 8 characters"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="position-absolute fv-right-3 fv-top-1-2 fv-translate-y-1-2 fv-text-paper-300-40 fv-hover-text-paper-200 fv-transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="fv-w-4 fv-h-4"/> : <Eye className="fv-w-4 fv-h-4"/>}
                  </button>
                </div>
              </div>

              <label className="d-flex align-items-start gap-2 fv-text-sm fv-text-paper-300 fv-cursor-pointer">
                <input type="checkbox" required className="fv-rounded fv-border-ink-500 fv-bg-ink-700 fv-text-brand-500 fv-focus-ring-brand-400 fv-mt-1"/>
                <span>I understand this is a demo and no real account will be created.</span>
              </label>

              <button type="submit" className="w-100 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors fv-active-scale-95">
                Create Account
              </button>
            </form>

            <div className="fv-mt-6 text-center fv-text-sm fv-text-paper-300">
              Already have an account?{' '}
              <Link to="/login" className="fv-text-brand-400 fv-hover-text-brand-300 fv-heading-font fv-transition-colors">
                Log in
              </Link>
            </div>
          </div>

          <p className="fv-text-xs fv-text-paper-300-40 text-center fv-mt-4">
            Sign up is for demonstration only. No authentication or data storage occurs.
          </p>
        </div>
      </div>
    </div>);
}
