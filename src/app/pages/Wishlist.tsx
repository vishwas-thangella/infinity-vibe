import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
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

export default function Wishlist() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.size === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, 'products'), where('__name__', 'in', Array.from(wishlist)));
        const snapshot = await getDocs(q);
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
        setError('Failed to load wishlist products.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  const wishlistProducts = products.filter(product => wishlist.has(product.id));

  return (
    <div className="bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <motion.button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl mb-4 tracking-tighter">
              WISHLIST
            </h1>
            <p className="text-gray-400 tracking-widest text-sm">
              {wishlist.size} {wishlist.size === 1 ? 'ITEM' : 'ITEMS'}
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 tracking-widest">LOADING WISHLIST...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-red-400 tracking-widest">{error}</p>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="py-24 text-center">
            <Heart size={64} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl mb-4 tracking-widest">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-gray-400 mb-8 tracking-widest text-sm">
              START ADDING ITEMS YOU LOVE
            </p>
            <motion.button
              className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              BROWSE PRODUCTS
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-white text-black px-3 py-1 text-[10px] tracking-widest font-bold">
                    {product.badge}
                  </div>
                )}

                {/* Remove from Wishlist Button */}
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
                    className="fill-white text-white"
                  />
                </motion.button>

                {/* Image Container */}
                <div className="aspect-[3/4] overflow-hidden bg-zinc-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 bg-zinc-900">
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
                    className="w-full border border-white/30 text-[10px] tracking-[0.2em] py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    REMOVE FROM WISHLIST
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}