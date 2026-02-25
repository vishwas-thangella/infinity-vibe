import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/client';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8">
        <h1 className="text-3xl font-semibold mb-2 tracking-tight">
          Admin Login
        </h1>
        <p className="text-xs text-gray-400 tracking-widest mb-6">
          SIGN IN TO MANAGE PRODUCTS
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-500/40 px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs tracking-widest text-gray-400 uppercase">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs tracking-widest text-gray-400 uppercase">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-6 py-2 bg-white text-black text-xs tracking-widest font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 tracking-widest">
          Use the admin email/password you created in the Firebase console (Email/Password auth).
        </p>
      </div>
    </div>
  );
}

