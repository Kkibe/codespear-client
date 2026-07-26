import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader as Loader2, CircleAlert as AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import './Auth.css';

export const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message?.includes('Invalid login') ? 'Invalid email or password.' : (err.message || 'Sign in failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="container container-narrow">
        <div className="auth-card card fade-up">
          <div className="auth-card__head">
            <span className="eyebrow">Welcome back</span>
            <h1 className="h2">Sign in to Codespear</h1>
            <p className="muted">Pick up right where you left off.</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="input-wrap">
                <Mail size={18} />
                <input id="email" type="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="password">Password</label>
              <div className="input-wrap">
                <Lock size={18} />
                <input id="password" type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
            </div>
            {error && <p className="alert alert-error"><AlertCircle size={18} /> {error}</p>}
            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? <><Loader2 size={18} className="spin" /> Signing in...</> : <>Sign in <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="auth-card__foot">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
