import { motion } from "motion/react";
import { Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  shop: ["New Arrivals", "Collections", "Sale", "Gift Cards"],
  about: ["Our Story", "Sustainability", "Press", "Careers"],
  support: ["Contact Us", "FAQs", "Shipping & Returns", "Size Guide"],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              className="text-3xl tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bold">Infinity Vibe</span>
            </motion.div>
            <p className="text-sm text-gray-400 mb-6">
              Premium streetwear for those who dare to be different.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/infinity_vibe.1" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm tracking-widest mb-6">SHOP</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm tracking-widest mb-6">ABOUT</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm tracking-widest mb-6">SUPPORT</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm tracking-widest mb-6">LEGAL</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Infinity Vibe. All rights reserved.
          </p>
          <a
            href="https://texsky.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-sm text-gray-500">
              Designed and developed by Texsky.
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
