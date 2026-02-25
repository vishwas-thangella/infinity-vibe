import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/client';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  category?: string;
}

export function FeaturedCollection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const items: Product[] = snapshot.docs.map((d) => {
          const data = d.data() as Omit<Product, 'id'>;
          return {
            id: d.id,
            ...data,
          };
        });
        setProducts(items);
      } catch (err) {
        console.error(err);
        setError('Failed to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const featuredProducts = products.slice(0, 4);

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

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
            FEATURED COLLECTION
          </h2>
          <p className="text-gray-400 tracking-wide">
            Limited drops. Exclusive pieces.
          </p>
        </motion.div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 tracking-widest text-sm">
              LOADING FEATURED PRODUCTS...
            </p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-400 tracking-widest text-sm">
              {error}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-white text-black px-3 py-1 text-xs tracking-widest">
                  {product.badge}
                </div>
              )}

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full"
                onClick={() => toggleLike(product.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={20}
                  className={`transition-colors ${
                    likedItems.has(product.id) ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </motion.button>

              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  animate={{
                    scale: hoveredId === product.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Product Info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredId === product.id ? 1 : 0,
                  y: hoveredId === product.id ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg tracking-widest mb-2">{product.name}</h3>
                <p className="text-2xl mb-3">{product.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                  className="mt-1 w-full border border-white/40 text-[10px] tracking-[0.2em] py-2 hover:bg-white hover:text-black transition-colors"
                >
                  {likedItems.has(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-12 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
          >
            VIEW ALL PRODUCTS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
