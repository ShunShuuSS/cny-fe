'use client';

import { motion } from 'framer-motion';

interface InvitationFormProps {
  onSubmit: () => void;
  loading: boolean;
}

export default function InvitationForm({ onSubmit, loading }: InvitationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🏮</div>
            <h2 className="text-3xl font-bold text-cny-red mb-2">Welcome!</h2>
            <p className="text-gray-600">Let's get you ready for the lucky draw</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cny-red focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cny-red focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cny-red text-white font-semibold rounded-lg hover:bg-cny-red-dark transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Continue to Lucky Draw 🎊'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
