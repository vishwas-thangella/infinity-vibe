import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const instagramImages = [
  'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldHdlYXIlMjBzdHlsZXxlbnwxfHx8fDE3NzE5NTgwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1645997098653-ed4519760b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MTkxNjQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1759933318666-97a7e86c4d76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNsb3RoaW5nJTIwYnJhbmQlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcxOTk3MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1641137806473-5fe07dd62d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzcxOTk3MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/flagged/photo-1553965860-a53f9a484a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaW5zdGFncmFtJTIwZmVlZHxlbnwxfHx8fDE3NzE5OTcxODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1601071824666-dc1fb5c6169d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwcHJvZHVjdCUyMGJsYWNrfGVufDF8fHx8MTc3MTk5NzE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

export function InstagramFeed() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl mb-6 tracking-tight">
            #WEARINFINITYVIBE
          </h2>
          <a
            href="https://instagram.com/infinity_vibe.1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <Instagram size={24} />
            <span className="tracking-widest">FOLLOW US @Infinity_vibe.1</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/infinity_vibe.1"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden group cursor-pointer relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <Instagram
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size={32}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
