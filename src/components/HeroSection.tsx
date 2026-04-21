import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Beaker } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";

const HeroSection = () => {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fasilitas pengolahan air modern"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Beaker className="h-4 w-4" />
              Solusi Sanitasi Air Terpercaya
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-primary-foreground mb-6"
          >
            Air Bersih untuk{" "}
            <span className="text-accent">Kehidupan</span> yang Lebih Sehat
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-primary-foreground/80 mb-8 max-w-lg"
          >
            Kami menyediakan solusi lengkap pengelolaan sanitasi air untuk perumahan, rumah sakit, hotel, dan industri dengan teknologi chemical terdepan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="font-semibold gap-2"
              onClick={() => document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" })}
            >
              Lihat Produk <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Shield className="h-4 w-4 mr-2" />
              Konsultasi Gratis
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-8 mt-12"
          >
            {[
              { value: "500+", label: "Klien Aktif" },
              { value: "15+", label: "Tahun Pengalaman" },
              { value: "99%", label: "Kepuasan Klien" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
