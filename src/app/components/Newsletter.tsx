import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl mb-6 tracking-tight">
            JOIN THE MOVEMENT.
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Get exclusive drops before anyone else. Be the first to know about new
            collections, limited releases, and insider access.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-black border-2 border-white/20 focus:border-white text-white placeholder:text-gray-500 outline-none transition-all duration-300"
              required
            />
            <motion.button
              type="submit"
              className="px-10 py-4 bg-white text-black tracking-widest text-sm hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET EARLY ACCESS
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <p className="text-xs text-gray-500 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
