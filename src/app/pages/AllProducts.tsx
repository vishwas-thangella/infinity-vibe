import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/client';
import { useWishlist } from '../contexts/WishlistContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
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
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl mb-4 tracking-tighter">
              ALL COLLECTIONS
            </h1>
            <p className="text-gray-400 tracking-widest text-sm">
              DISCOVER OUR COMPLETE ARCHIVE
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div 
            className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-xs tracking-widest border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/20 hover:border-white'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 tracking-widest">LOADING PRODUCTS...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-red-400 tracking-widest">{error}</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-white text-black px-3 py-1 text-[10px] tracking-widest font-bold">
                  {product.badge}
                </div>
              )}

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={18}
                  className={`transition-colors ${
                    isInWishlist(product.id) ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </motion.button>

              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-zinc-800">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  animate={{
                    scale: hoveredId === product.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* Product Info Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg tracking-widest leading-tight">{product.name}</h3>
                  <p className="text-2xl font-light">{product.price}</p>
                </div>
              </motion.div>

              {/* Static Info for Mobile/Non-hover */}
              <div className="p-4 bg-zinc-900 group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm tracking-widest truncate mr-2">{product.name}</h3>
                  <span className="text-sm">{product.price}</span>
                </div>
                <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-3">
                  {product.category}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="mt-1 w-full border border-white/30 text-[10px] tracking-[0.2em] py-2 hover:bg-white hover:text-black transition-colors"
                >
                  {isInWishlist(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        )}
        {(!loading && !error && filteredProducts.length === 0) && (
          <div className="py-24 text-center">
            <p className="text-gray-500 tracking-widest">NO PRODUCTS FOUND IN THIS CATEGORY.</p>
          </div>
        )}
      </div>
    </div>
  );
}
