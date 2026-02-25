import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1650464595868-fd12e3047d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTk3MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fashion Model"
          className="w-full h-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            WE DON'T FOLLOW TRENDS.
            <br />
            <span className="italic">WE CREATE THEM.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Premium streetwear crafted for those who stand different.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-10 py-4 bg-white text-black tracking-widest text-sm hover:bg-black hover:text-white border-2 border-white transition-all duration-300 min-w-[220px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              SHOP THE DROP
            </motion.button>
            <motion.button
              className="px-10 py-4 bg-transparent text-white tracking-widest text-sm border-2 border-white hover:bg-white hover:text-black transition-all duration-300 min-w-[220px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              EXPLORE COLLECTION
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="w-px h-16 bg-white/50"
            animate={{ height: [40, 64, 40] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
