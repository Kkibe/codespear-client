import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader as Loader2, CircleAlert as AlertCircle, ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import './Auth.css';

export const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const strength = password.length >= 8 ? (password.length >= 12 ? 3 : 2) : password.length > 0 ? 1 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await signUp(email, password, name);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.message?.includes('already') ? 'An account with this email already exists.' : (err.message || 'Sign up failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="container container-narrow">
        <div className="auth-card card fade-up">
          <div className="auth-card__head">
            <span className="eyebrow">Get started</span>
            <h1 className="h2">Create your account</h1>
            <p className="muted">Free forever. Start learning in seconds.</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <div className="input-wrap">
                <User size={18} />
                <input id="name" type="text" className="input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
              </div>
            </div>
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
                <input id="password" type="password" className="input" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
              </div>
              {password && (
                <div className="pw-strength">
                  <span className={`pw-bar ${strength >= 1 ? 'active' : ''}`} />
                  <span className={`pw-bar ${strength >= 2 ? 'active' : ''}`} />
                  <span className={`pw-bar ${strength >= 3 ? 'active' : ''}`} />
                </div>
              )}
            </div>
            {error && <p className="alert alert-error"><AlertCircle size={18} /> {error}</p>}
            {success && <p className="alert alert-success"><CheckCircle2 size={18} /> Account created! Redirecting...</p>}
            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? <><Loader2 size={18} className="spin" /> Creating account...</> : <>Create account <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="auth-card__foot">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
