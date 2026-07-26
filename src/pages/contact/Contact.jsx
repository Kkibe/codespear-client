import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { submitContactMessage } from '../../api';
import './Contact.css';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await submitContactMessage(form.name, form.email, form.message);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const CONTACTS = [
    { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya' },
    { icon: Phone, label: 'Phone', value: '+254 700 000 000' },
    { icon: Mail, label: 'Email', value: 'hello@codespear.com' },
  ];

  return (
    <div className="page contact-page">
      <div className="container">
        <div className="contact-page__head">
          <span className="eyebrow">Contact</span>
          <h1 className="h2">Let's talk</h1>
          <p className="lead text-balance">Have a question, suggestion, or partnership idea? We would love to hear from you.</p>
        </div>

        <div className="contact-page__grid">
          <div className="contact-info">
            {CONTACTS.map((c) => (
              <div key={c.label} className="contact-info__item">
                <div className="contact-info__icon"><c.icon size={20} /></div>
                <div>
                  <span className="contact-info__label">{c.label}</span>
                  <span className="contact-info__value">{c.value}</span>
                </div>
              </div>
            ))}
          </div>

          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input id="name" name="name" className="input" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="textarea" placeholder="How can we help?" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
              {status === 'loading' ? <><Loader2 size={18} className="spin" /> Sending...</> : <><Send size={18} /> Send message</>}
            </button>
            {status === 'success' && (
              <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>
                <CheckCircle2 size={18} /> Thanks! Your message has been sent.
              </p>
            )}
            {status === 'error' && (
              <p className="alert alert-error" style={{ marginTop: 'var(--space-4)' }}>
                <AlertCircle size={18} /> {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
