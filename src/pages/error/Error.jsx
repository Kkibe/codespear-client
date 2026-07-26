import { Link } from 'react-router-dom';
import { Chrome as Home, ArrowLeft, Compass } from 'lucide-react';
import './Error.css';

export const Error = () => (
  <div className="page error-page">
    <div className="container error-page__inner">
      <div className="error-page__code">404</div>
      <Compass size={48} className="error-page__icon" />
      <h1 className="h2">Page not found</h1>
      <p className="lead text-balance">The page you are looking for may have moved, been renamed, or never existed. Let's get you back on track.</p>
      <div className="cluster" style={{ justifyContent: 'center', marginTop: 'var(--space-8)' }}>
        <Link to="/" className="btn btn-primary btn-lg"><Home size={18} /> Go home</Link>
        <Link to="/courses" className="btn btn-secondary btn-lg"><Compass size={18} /> Browse courses</Link>
      </div>
    </div>
  </div>
);
