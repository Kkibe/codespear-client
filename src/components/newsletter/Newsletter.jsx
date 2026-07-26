import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '../../api';
import './Newsletter.css';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setError('');
    try {
      await subscribeNewsletter(email.trim());
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setError(err.message?.includes('duplicate') ? 'You are already subscribed!' : 'Something went wrong. Try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__card">
          <div className="newsletter__content">
            <span className="eyebrow">Stay in the loop</span>
            <h2 className="h2 text-balance">Never miss a new course or article</h2>
            <p className="lead">Get curated learning resources, course drops, and developer insights delivered to your inbox. No spam, unsubscribe anytime.</p>
          </div>
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__input-row">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                disabled={status === 'loading'}
              />
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {status === 'success' && (
              <p className="newsletter__msg newsletter__msg--success">
                <CheckCircle2 size={16} /> You're subscribed! Welcome aboard.
              </p>
            )}
            {status === 'error' && <p className="newsletter__msg newsletter__msg--error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
