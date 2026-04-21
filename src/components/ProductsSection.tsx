import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";
import type { Product } from "@/data/products";
import ProductDetailDialog from "./ProductDetailDialog";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { products, categories } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = activeCategory === "Semua"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <section id="produk" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Produk Kami</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Chemical Berkualitas Tinggi
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Produk chemical terbaik untuk kebutuhan pengolahan dan sanitasi air Anda.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-lg border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
              onClick={() => openDetail(product)}
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> Lihat Detail
                  </span>
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-display text-xl font-bold text-foreground">{product.price}</span>
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                      toast({ title: "Ditambahkan ke keranjang", description: product.name });
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" /> Pesan
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to full catalog */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link to="/produk">
              Lihat Semua Produk <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProductDetailDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
};

export default ProductsSection;
