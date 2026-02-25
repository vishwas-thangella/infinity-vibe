import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
