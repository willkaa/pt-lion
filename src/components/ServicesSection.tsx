import { motion } from "framer-motion";
import { Building2, Hotel, Hospital, Factory, Home, Waves } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Perumahan",
    description: "Sistem pengolahan air bersih dan limbah untuk kawasan perumahan dengan standar kesehatan tinggi.",
  },
  {
    icon: Hospital,
    title: "Rumah Sakit",
    description: "Sanitasi air steril untuk kebutuhan medis, sesuai regulasi dan standar rumah sakit.",
  },
  {
    icon: Hotel,
    title: "Hotel & Resort",
    description: "Pengelolaan air untuk kolam renang, spa, dan kebutuhan operasional hotel.",
  },
  {
    icon: Factory,
    title: "Industri",
    description: "Solusi water treatment skala besar untuk proses produksi dan limbah industri.",
  },
  {
    icon: Building2,
    title: "Perkantoran",
    description: "Sistem filtrasi dan sanitasi untuk gedung komersial dan perkantoran modern.",
  },
  {
    icon: Waves,
    title: "Kolam & Water Park",
    description: "Treatment chemical untuk menjaga kualitas air di kolam renang dan wahana air.",
  },
];

const ServicesSection = () => {
  return (
    <section id="layanan" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Layanan Kami</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Solusi untuk Berbagai Sektor
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Kami melayani berbagai jenis properti dan industri dengan solusi sanitasi air yang disesuaikan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
