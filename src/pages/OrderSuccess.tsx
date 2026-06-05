import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-3">
                Permintaan Terkirim!
              </h1>
              <p className="text-muted-foreground mb-2">
                Terima kasih atas permintaan penawaran Anda. Tim sales kami akan segera menghubungi Anda untuk konfirmasi pesanan dan harga final.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Estimasi waktu respons: <strong className="text-foreground">1x24 jam kerja</strong>
              </p>

              <div className="bg-card rounded-lg border border-border p-5 mb-8">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                  Langkah Selanjutnya
                </h3>
                <ol className="text-sm text-muted-foreground text-left space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">1.</span>
                    Tim sales akan mereview pesanan Anda
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">2.</span>
                    Anda akan menerima penawaran harga via email/telepon
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">3.</span>
                    Konfirmasi pesanan dan lakukan pembayaran
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">4.</span>
                    Produk akan dikirim setelah pembayaran diterima
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/"><Home className="h-4 w-4" /> Kembali ke Beranda</Link>
                </Button>
                <Button asChild className="gap-2">
                  <Link to="/produk"><ShoppingBag className="h-4 w-4" /> Lihat Produk Lain</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
