import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "/beranda#beranda" },
  { label: "Layanan", href: "/beranda#layanan" },
  { label: "Produk", href: "/beranda#produk" },
  { label: "Tentang Kami", href: "/beranda#tentang" },
  { label: "Karir", href: "/karir" },
  { label: "Kontak", href: "/beranda#kontak" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (location.pathname === "/beranda" && href.startsWith("/beranda#")) {
      const sectionId = href.split("#")[1];
      const el = document.querySelector(`#${sectionId}`);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/beranda" className="flex items-center gap-2">
          <img src={logo} alt="Logo PT. Lion Solusi Sejahtera" className="h-8 w-8 object-contain" />
          <span className="font-display font-bold text-xl text-foreground">
            PT. Lion <span className="text-primary">Solusi Sejahtera</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-muted-foreground hover:text-primary transition-colors"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <Button size="sm" asChild>
            <Link to="/beranda#kontak" onClick={() => handleNavClick("/beranda#kontak")}>Hubungi Kami</Link>
          </Button>
        </div>

        {/* Mobile toggle + cart */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-3 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="w-full mt-2" asChild>
                <Link to="/beranda#kontak" onClick={() => handleNavClick("/beranda#kontak")}>Hubungi Kami</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
