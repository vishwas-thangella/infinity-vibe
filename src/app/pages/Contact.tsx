import { motion } from 'motion/react';

const INSTAGRAM_HANDLE = '@infinity_vibe.1';
const PHONE_NUMBER = '+91 6304-776448';
const MAP_URL = 'https://maps.app.goo.gl/WrcUHpUHRtxuVjUd8';
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=https://maps.app.goo.gl/WrcUHpUHRtxuVjUd8&output=embed';

export default function Contact() {
  return (
    <div className="bg-black text-white pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-3">
            GET IN TOUCH
          </p>
          <h1 className="text-4xl md:text-6xl tracking-tight">
            Contact <span className="font-light">Infinity Vibe</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl">
            Questions, collaborations, or custom pieces? Reach out directly via
            phone or Instagram, or find us via the map below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: contact details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h2 className="text-sm tracking-[0.3em] text-gray-500 mb-2">
                PHONE
              </h2>
              <a
                href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`}
                className="text-xl tracking-wide hover:underline"
              >
                {PHONE_NUMBER}
              </a>
            </div>

            <div>
              <h2 className="text-sm tracking-[0.3em] text-gray-500 mb-2">
                INSTAGRAM
              </h2>
              <a
                href="https://instagram.com/infinity_vibe.1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xl tracking-wide hover:underline"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>

            <div>
              <h2 className="text-sm tracking-[0.3em] text-gray-500 mb-2">
                LOCATION
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                Tap below to open the exact Infinity Vibe location in Google
                Maps.
              </p>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2 border border-white text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-colors"
              >
                OPEN IN MAPS
              </a>
            </div>
          </motion.div>

          {/* Right: map preview */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="aspect-[16/9] w-full overflow-hidden border border-white/10 bg-zinc-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3794.3128973411585!2d79.5623948!3d18.0106768!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3345005bfc560f%3A0xcb3acd157904184f!2sInfinity%20Vibe!5e0!3m2!1sen!2sin!4v1772003821021!5m2!1sen!2sin"
                title="Infinity Vibe Location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

