import { motion } from 'motion/react';

export function CTASection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Grain/Noise Texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-tight">
            READY TO OWN
            <br />
            THE STREET?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands who've already made the switch to premium.
          </p>
          <motion.button
            className="px-16 py-5 bg-white text-black tracking-widest text-sm hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SHOP NOW
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
