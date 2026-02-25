import { motion } from 'motion/react';

export function BrandStory() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-6 tracking-tight leading-tight">
              THIS IS MORE
              <br />
              THAN FASHION.
            </h2>
            <div className="w-20 h-px bg-white mb-8" />
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              We create pieces that speak louder than words. Every stitch, every
              fabric choice, every design decision is intentional. This isn't about
              following the crowd—it's about defining your own path.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Born from the streets, refined in the studio. Infinity Vibe represents
              the intersection of raw authenticity and premium craftsmanship. We don't
              compromise on quality, and neither should you.
            </p>
            <blockquote className="border-l-2 border-white pl-6 py-2 italic text-xl mb-8">
              "Wear who you are."
            </blockquote>
            <motion.button
              className="px-10 py-4 bg-white text-black tracking-widest text-sm hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OUR STORY
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621423938441-5a7346cb2213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5JTIwYnd8ZW58MXx8fHwxNzcxOTk3MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Brand Story"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-white/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
