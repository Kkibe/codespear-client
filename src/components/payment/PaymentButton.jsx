import { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { CreditCard, Loader2, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { verifyPaymentWithEdge } from '../../api';
import './PaymentButton.css';

const PUBLIC_KEY = import.meta.env.VITE_FLW_PUBLIC_KEY || '';

export function PaymentButton({ amount, currency = 'USD', kind = 'course', courseId, planId, label, onSuccess, className = '', children }) {
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const txRef = `cs-${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const config = {
    public_key: PUBLIC_KEY,
    tx_ref: txRef,
    amount: Number(amount),
    currency,
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    customer: {
      email: user?.email || 'guest@codespear.com',
      name: user?.email?.split('@')[0] || 'Guest',
    },
    customizations: {
      title: 'Codespear',
      description: kind === 'subscription' ? 'Subscription payment' : 'Course purchase',
      logo: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleClick = () => {
    if (!PUBLIC_KEY) {
      setError('Payments are not configured yet. Add your Flutterwave public key to enable checkout.');
      return;
    }
    if (!user) {
      setError('Please sign in to complete your purchase.');
      return;
    }
    setError('');
    setResult(null);
    handleFlutterPayment({
      callback: async (response) => {
        closePaymentModal();
        if (response.status === 'successful') {
          setVerifying(true);
          try {
            const verified = await verifyPaymentWithEdge({
              transactionId: response.transaction_id,
              txRef,
              kind,
              courseId,
              planId,
              amount,
              currency,
            });
            setResult({ ok: true, ref: verified.ref });
            onSuccess?.(verified);
          } catch (err) {
            setError(err.message || 'Payment verification failed. If you were charged, contact support.');
          } finally {
            setVerifying(false);
          }
        } else {
          setError('Payment was not completed.');
        }
      },
      onClose: () => {},
    });
  };

  if (verifying) {
    return (
      <div className="pay-btn pay-btn--verifying">
        <Loader2 size={18} className="spin" /> Verifying your payment...
      </div>
    );
  }
  if (result?.ok) {
    return (
      <div className="pay-btn pay-btn--success">
        <CheckCircle2 size={18} /> Payment confirmed
      </div>
    );
  }

  return (
    <div className="pay-btn-wrap">
      <button onClick={handleClick} className={`pay-btn ${className}`} type="button">
        {children || (<><CreditCard size={18} /> {label || `Pay ${currency} ${amount}`}</>)}
      </button>
      {error && <p className="pay-btn__error"><AlertCircle size={14} /> {error}</p>}
      <p className="pay-btn__secure"><Lock size={12} /> Secured by Flutterwave</p>
    </div>
  );
}
