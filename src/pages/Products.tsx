import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/contexts/ProductContext";
import type { Product } from "@/data/products";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { products, categories } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === "Semua" || p.category === activeCategory;
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-hero-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Katalog Produk
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-xl mx-auto">
              Temukan produk chemical berkualitas tinggi untuk kebutuhan pengolahan air Anda.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Menampilkan {filtered.length} produk
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-lg border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                  onClick={() => openDetail(product)}
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
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

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Tidak ada produk yang ditemukan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <ProductDetailDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Products;
