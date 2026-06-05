import { motion } from "framer-motion";
import { Award, Zap, Lightbulb, ShieldCheck } from "lucide-react";

const commitments = [
  {
    icon: Award,
    title: "Kualitas",
    description:
      "Memberikan produk terbaik dan berkualitas tinggi yang memenuhi kebutuhan client serta menjunjung tinggi kepuasan terhadap produk dan jasa yang kami sediakan.",
  },
  {
    icon: Zap,
    title: "Cepat & Tepat",
    description:
      "Berpikir luas dan terinformasi dengan baik untuk bertindak cepat dan tepat dalam setiap situasi.",
  },
  {
    icon: Lightbulb,
    title: "Solusi",
    description:
      "Membangun hubungan jangka panjang dengan client dan menyediakan pelayanan yang memuaskan.",
  },
  {
    icon: ShieldCheck,
    title: "Konsisten",
    description:
      "Bekerja dengan ketekunan dan ketulusan sebagai perusahaan yang bertanggung jawab.",
  },
];

const KomitmenSection = () => {
  return (
    <section id="komitmen" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Komitmen Kami
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Nilai yang Kami Pegang Teguh
          </h2>
          <p className="text-muted-foreground mt-3">
            Empat prinsip utama yang menjadi dasar setiap layanan dan produk kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <c.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KomitmenSection;
