import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Vijay S.',
    review: 'The fit is insane. Pure quality.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Tharun kumar K.',
    review: 'Minimal. Bold. Perfect.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Zubair',
    review: 'Feels luxury. Worth every penny.',
    rating: 5,
  },
];

export function CustomerReviews() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl mb-4 tracking-tight">
            WHAT THEY SAY
          </h2>
          <p className="text-gray-400 tracking-wide">
            Real people. Real experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-zinc-900 p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="white" strokeWidth={0} />
                ))}
              </div>
              <p className="text-xl mb-6 italic leading-relaxed">
                "{review.review}"
              </p>
              <p className="text-sm text-gray-400 tracking-widest">{review.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">★★★★★ 4.9/5 from 2,847 reviews</p>
        </motion.div>
      </div>
    </section>
  );
}
