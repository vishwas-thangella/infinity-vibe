import { motion } from 'motion/react';
import { Package, Zap, Truck, RotateCcw } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Premium Quality Fabrics',
    description: 'Sourced from the finest materials worldwide',
  },
  {
    icon: Zap,
    title: 'Limited Edition Drops',
    description: 'Exclusive pieces, never mass-produced',
  },
  {
    icon: Truck,
    title: 'Shipping & Delivery',
    description: 'Coming soon for online orders',
  },
  {
    icon: RotateCcw,
    title: 'Returns & Exchanges',
    description: 'Coming soon with flexible options',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl mb-4 tracking-tight">
            WHY CHOOSE INFINITY VIBE
          </h2>
          <p className="text-gray-400 tracking-wide">
            Premium quality meets uncompromising style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 border border-white/10 hover:border-white/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 border-2 border-white mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon size={28} strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg tracking-widest mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
