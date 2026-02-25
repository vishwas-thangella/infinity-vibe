// @ts-ignore
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
// @ts-ignore
import Logo from "../../assets/logo.png";

export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Shop", "Collections", "About", "Contact"];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-3 items-center">
            <Link to="/" className="flex flex-row gap-3 items-center">
              <img src={Logo} alt="Infinity Vibe Logo" className="h-12" />
              {/* Logo */}
              <motion.div
                className="text-2xl tracking-wider cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-bold">Infinity Vibe</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div
                key={link}
                className="text-sm tracking-widest hover:text-gray-400 transition-colors relative group cursor-pointer"
                whileHover={{ y: -2 }}
                onClick={() => {
                  if (link === "Shop" || link === "Collections") {
                    navigate("/products");
                  } else if (link === "Contact") {
                    navigate("/contact");
                  } else if (link === "Admin") {
                    navigate("/admin");
                  } else {
                    navigate("/");
                  }
                }}
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <motion.button
              className="hidden md:block hover:text-gray-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              className="hover:text-gray-400 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              className="hover:text-gray-400 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-white/10 mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link}
                  className="text-lg tracking-widest hover:text-gray-400 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (link === "Shop" || link === "Collections") {
                      navigate("/products");
                    } else if (link === "Contact") {
                      navigate("/contact");
                    } else if (link === "Admin") {
                      navigate("/admin");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  {link}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
