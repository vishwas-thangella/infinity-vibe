import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { motion } from 'motion/react';
import { db, auth } from '../../firebase/client';
import { supabase } from '../../supabase/client';

interface ProductForm {
  name: string;
  price: string;
  image: string;
  badge: string;
  category: string;
}

interface Product extends ProductForm {
  id: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    image: '',
    badge: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const productsRef = collection(db, 'products');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        setAuthChecking(false);
        navigate('/login', { replace: true, state: { from: location.pathname } });
      } else {
        setCurrentUser(user);
        setAuthChecking(false);
      }
    });
    return () => unsub();
  }, [navigate, location.pathname]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(productsRef);
      const items: Product[] = snapshot.docs.map((d) => {
        const data = d.data() as ProductForm;
        return {
          id: d.id,
          ...data,
        };
      });
      setProducts(items);
    } catch (err) {
      console.error(err);
      setError('Failed to load products from Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const bucket = 'product-images';
    const extension = file.name.split('.').pop() || 'jpg';
    const filePath = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      throw new Error('Image upload to Supabase failed.');
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    if (!data?.publicUrl) {
      throw new Error('Could not get public URL from Supabase.');
    }

    return data.publicUrl;
  };

  useEffect(() => {
    if (!authChecking && currentUser) {
      fetchProducts();
    }
  }, [authChecking, currentUser]);

  const handleChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!imageFile) {
      setError('Please upload a product image.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const priceWithRupee = form.price.startsWith('₹')
        ? form.price
        : `₹${form.price.replace(/^[^0-9]*/, '')}`;

      const imageUrl = await uploadImageToSupabase(imageFile);

      await addDoc(productsRef, {
        name: form.name,
        price: priceWithRupee,
        image: imageUrl,
        badge: form.badge || undefined,
        category: form.category,
      });
      setForm({ name: '', price: '', image: '', badge: '', category: '' });
      setImageFile(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to save product to Firebase.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete product.');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 tracking-widest text-sm">
          CHECKING ADMIN SESSION...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-black text-white pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 space-y-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Admin Panel
            </h1>
            <p className="text-gray-400 mt-2 tracking-widest text-xs">
              MANAGE PRODUCTS FROM FIREBASE
            </p>
          </div>
          <div className="text-right space-y-2">
            <p className="text-[11px] text-gray-500 tracking-widest">
              {currentUser.email}
            </p>
            <button
              onClick={handleLogout}
              className="text-xs tracking-widest border border-white/30 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              LOG OUT
            </button>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900 border border-white/10 p-6 md:p-8"
        >
          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            Add / Edit Product
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-500/40 px-4 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Name *
              </label>
              <input
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Infinity Vibe Essential Hoodie"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Price (₹ INR) *
              </label>
              <input
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="₹189"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Product Image *
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:tracking-widest file:bg-white file:text-black hover:file:bg-gray-200"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                }}
              />
              {imageFile && (
                <p className="text-[11px] text-gray-500 tracking-widest">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Category *
              </label>
              <input
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Hoodies"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Badge (optional)
              </label>
              <input
                className="w-full bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-white"
                value={form.badge}
                onChange={(e) => handleChange('badge', e.target.value)}
                placeholder="NEW DROP / LIMITED / BESTSELLER"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-white text-black text-xs tracking-widest font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? 'SAVING...' : 'SAVE PRODUCT'}
              </button>
            </div>
          </form>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 border border-white/10 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-wide">Products</h2>
            <button
              onClick={fetchProducts}
              className="text-xs tracking-widest border border-white/30 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              REFRESH
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading products from Firebase...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products found. Add your first one above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="border-b border-white/20 text-xs uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Badge</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5">
                      <td className="py-2 pr-4">{product.name}</td>
                      <td className="py-2 pr-4">{product.price}</td>
                      <td className="py-2 pr-4">{product.category}</td>
                      <td className="py-2 pr-4">{product.badge || '-'}</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-xs tracking-widest text-red-400 hover:text-red-300"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

