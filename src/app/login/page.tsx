'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { FiShield, FiMail, FiLock, FiUser, FiAlertCircle, FiActivity } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { login, loginAsGuest } = useAuth();
  const router = useRouter();

  // Cursor tracking for login page
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add particles occasionally
      if (Math.random() > 0.8) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY
        };
        setParticles(prev => [...prev.slice(-10), newParticle]);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 2000));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      toast.success('Login successful!');
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
      toast.error(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    toast.success('Logged in as guest');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cursor tracking effect */}
      <div
        className="cursor-trail"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isHovering ? 1 : 0.7,
        }}
      />
      
      {/* Glow effect following cursor */}
      <div
        className="cursor-glow"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />
      
      {/* Particle effects */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="cursor-particle"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 2 }}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        />
      ))}
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ff0040_1px,transparent_1px),linear-gradient(to_bottom,#ff0040_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-pulse"></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism card */}
        <div className="relative backdrop-blur-xl bg-gray-900/20 rounded-2xl border border-red-500/30 shadow-2xl overflow-hidden">
          {/* Glow border */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-blue-500/30 to-red-500/30 opacity-50 blur-sm"></div>
          
          <div className="relative p-8">
            {/* Logo and title */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl mb-4 shadow-lg shadow-red-500/25">
                <FiShield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-modnument)' }}>Oct4crypt</h1>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-neue-machania)' }}>Secure Access Portal</p>
            </motion.div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 input rounded-lg border-red-500/30 focus:border-red-400"
                    required
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 input rounded-lg border-red-500/30 focus:border-red-400"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 btn btn-primary font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </span>
                ) : (
                  'Secure Login'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/20 text-gray-500">or</span>
              </div>
            </div>

            {/* Guest login */}
            <motion.button
              onClick={handleGuestLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 btn btn-outline font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <FiUser className="w-4 h-4" />
              Continue as Guest
            </motion.button>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">Think Secure. Build Smart.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
