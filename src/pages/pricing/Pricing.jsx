import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Crown, Sparkles, ArrowRight, Loader as Loader2, Star } from 'lucide-react';
import { fetchSubscriptionPlans } from '../../api';
import { useAuth } from '../../AuthContext';
import { PaymentButton } from '../../components/payment/PaymentButton';
import { hasActiveSubscription } from '../../api';
import { fetchUserSubscriptions } from '../../api';
import './Pricing.css';

const FAQS = [
  { q: 'Can I buy a single course without subscribing?', a: 'Yes. Every premium course can be purchased individually for one-time access — no subscription required. Browse the catalog and look for the price badge.' },
  { q: 'What payment methods are supported?', a: 'We use Flutterwave, so you can pay with card, mobile money, USSD, and bank transfer depending on your region.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You keep access until the end of your billing period, then it simply does not renew. No hidden fees.' },
  { q: 'Is there a free option?', a: 'Yes. The Free plan gives you access to selected courses, the community, and progress tracking — no payment details needed.' },
  { q: 'Are payments secure?', a: 'Every transaction is verified server-side by Flutterwave before access is granted. Your card details never touch our servers.' },
];

export const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(-1);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchSubscriptionPlans(),
      user ? fetchUserSubscriptions(user.id).catch(() => []) : Promise.resolve([]),
    ])
      .then(([p, s]) => { setPlans(p || []); setSubs(s || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const hasSub = hasActiveSubscription(subs);
  const activePlanId = subs.find((s) => s.status === 'active' && (!s.ends_at || new Date(s.ends_at) > new Date()))?.plan_id;

  const handleSubscribeSuccess = () => {
    setTimeout(() => navigate('/dashboard'), 800);
  };

  return (
    <div className="page pricing-page">
      <div className="container">
        <div className="pricing-page__head">
          <span className="eyebrow"><Sparkles size={14} /> Pricing</span>
          <h1 className="h1 text-balance">Choose the plan that fits your journey</h1>
          <p className="lead text-balance" style={{ maxWidth: 580, margin: 'var(--space-4) auto 0' }}>
            Start free, upgrade when you are ready. Or buy any premium course individually — no subscription needed.
          </p>
        </div>

        {/* Plans */}
        <div className="pricing-plans">
          {loading ? (
            <div className="grid grid-3">
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 420 }} />)}
            </div>
          ) : (
            <div className="grid grid-3 stagger">
              {plans.map((p) => {
                const isCurrent = activePlanId === p.id;
                const isPro = p.slug === 'pro';
                return (
                  <div key={p.id} className={`plan-card ${isPro ? 'plan-card--featured' : ''} ${isCurrent ? 'plan-card--current' : ''}`}>
                    {isPro && <span className="plan-card__ribbon">Most popular</span>}
                    <h3 className="plan-card__name">{p.name}</h3>
                    <p className="plan-card__price">{p.currency} {Number(p.price).toFixed(2)}<span>/{p.interval}</span></p>
                    <ul className="plan-card__benefits">
                      {p.benefits.map((b) => <li key={b}><Check size={16} /> {b}</li>)}
                    </ul>
                    <div className="plan-card__action">
                      {isCurrent ? (
                        <span className="badge badge-success" style={{ justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                          <Check size={16} /> Current plan
                        </span>
                      ) : Number(p.price) === 0 ? (
                        user ? (
                          <Link to="/courses" className="btn btn-secondary btn-block">Start free</Link>
                        ) : (
                          <Link to="/register" className="btn btn-secondary btn-block">Create free account</Link>
                        )
                      ) : (
                        <PaymentButton
                          amount={p.price}
                          currency={p.currency}
                          kind="subscription"
                          planId={p.id}
                          label={`Subscribe`}
                          className="btn-block"
                          onSuccess={handleSubscribeSuccess}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Individual purchases note */}
        <section className="pricing-individual">
          <div className="pricing-individual__card card">
            <Star size={28} className="pricing-individual__icon" />
            <div>
              <h2 className="h3">Prefer to buy one course?</h2>
              <p>Every premium course can be purchased individually for lifetime access — no subscription required. Browse the catalog, pick a course, and pay once.</p>
              <Link to="/courses" className="btn btn-primary"><ArrowRight size={16} /> Browse courses</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pricing-faqs">
          <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-10)' }}>Pricing FAQ</h2>
          <div className="faqs">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq ${open === i ? 'open' : ''}`}>
                <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                </button>
                {open === i && <p className="faq__a fade-in">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
