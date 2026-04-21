import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import aboutImage from "@/assets/about-water.jpg";

const highlights = [
  "Bersertifikat ISO 9001 & ISO 14001",
  "Tim ahli kimia berpengalaman 15+ tahun",
  "Produk ramah lingkungan & berkelanjutan",
  "Layanan konsultasi dan after-sales 24/7",
];

const AboutSection = () => {
  return (
    <section id="tentang" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img
                src={aboutImage}
                alt="Kualitas air bersih"
                className="rounded-lg shadow-card w-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-hero-gradient rounded-lg -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Tentang Kami</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Lebih dari 15 Tahun Memastikan Air Bersih & Aman
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              PT. Lion Solusi Sejahtera adalah perusahaan terdepan di bidang chemical water treatment yang berdedikasi
              menyediakan solusi sanitasi air berkualitas tinggi. Kami melayani ratusan klien di seluruh Indonesia,
              dari perumahan hingga industri besar.
            </p>

            <div className="space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
