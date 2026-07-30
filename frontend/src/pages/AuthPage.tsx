import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../theme/store';
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '../core/firebase';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export function AuthPage({ onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { syncFirebaseSession } = useAppStore();

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const { user } = await signInWithGoogle();
      await syncFirebaseSession(
        user.uid,
        user.email || '',
        user.displayName || undefined,
        user.photoURL || undefined
      );
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await signInWithEmail(email, password);
        await syncFirebaseSession(
          user.uid,
          user.email || email,
          user.displayName || undefined,
          user.photoURL || undefined
        );
      } else {
        const displayName = name.trim() || email.split('@')[0];
        const user = await registerWithEmail(email, password, displayName);
        await syncFirebaseSession(
          user.uid,
          user.email || email,
          displayName,
          user.photoURL || undefined
        );
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Email authentication error:', err);
      const msg = err?.code === 'auth/user-not-found' ? 'No account found with this email.' :
                  err?.code === 'auth/wrong-password' ? 'Incorrect password.' :
                  err?.code === 'auth/email-already-in-use' ? 'An account with this email already exists.' :
                  err?.code === 'auth/weak-password' ? 'Password must be at least 6 characters.' :
                  err?.code === 'auth/invalid-credential' ? 'Invalid credentials provided.' :
                  err?.message || 'Authentication failed. Please check your details and try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E5] flex items-center justify-center p-6 text-slate-900 font-sans relative">
      {/* Top Left Return Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold font-mono text-slate-700 hover:text-[#D92243] bg-white border border-[#E0C375]/50 px-4 py-2.5 shadow-xs transition"
      >
        ← Back to Home
      </button>

      <div className="max-w-md w-full bg-white border border-[#E0C375]/60 p-8 shadow-xl relative overflow-hidden">
        {/* Clickable Brand Logo Header */}
        <div className="flex items-center gap-3 justify-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-3xl font-black tracking-tight text-slate-900 font-sans">
            DRIPWEAR
          </span>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 border border-slate-200 mb-6 text-xs font-mono font-bold uppercase">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`py-2 text-center transition ${isLogin ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`py-2 text-center transition ${!isLogin ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-xs font-mono text-rose-600">
            {error}
          </div>
        )}

        {/* Google One-Click OAuth */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-[#D92243] py-3 text-xs font-mono font-bold text-slate-800 transition mb-6 shadow-xs disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <span className="relative bg-white px-3 text-[10px] font-mono text-slate-400 uppercase">Or continue with Email</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#D92243]"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#D92243]"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#D92243]"
            />
          </div>

          <Button variant="primary" size="lg" disabled={isLoading} className="w-full mt-4">
            {isLoading ? 'Authenticating...' : isLogin ? 'Sign In to Closet' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}
