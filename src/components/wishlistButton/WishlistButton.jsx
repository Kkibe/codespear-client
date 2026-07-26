import { useEffect, useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../../api';
import './WishlistButton.css';

export function WishlistButton({ courseId, onToggle }) {
  const { user } = useAuth();
  const [wished, setWished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !courseId) return;
    fetchWishlist(user.id)
      .then((items) => setWished(items.some((w) => w.course_id === courseId)))
      .catch(() => {});
  }, [user, courseId]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setLoading(true);
    try {
      if (wished) {
        await removeFromWishlist(user.id, courseId);
        setWished(false);
      } else {
        await addToWishlist(user.id, courseId);
        setWished(true);
      }
      onToggle?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`wishlist-btn ${wished ? 'wishlist-btn--active' : ''}`}
      onClick={handleClick}
      disabled={loading || !user}
      aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      title={user ? (wished ? 'Saved to wishlist' : 'Save to wishlist') : 'Sign in to save'}
    >
      {loading ? <Loader2 size={16} className="spin" /> : <Heart size={16} fill={wished ? 'currentColor' : 'none'} />}
    </button>
  );
}
