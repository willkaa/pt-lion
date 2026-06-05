import { motion } from "framer-motion";
import { FlaskConical, Wrench, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: FlaskConical,
    badge: "PT Lion Solusi Sejahtera",
    title: "Produk Chemical & Water Treatment",
    description:
      "Sebagai induk grup, kami fokus pada penyediaan produk chemical untuk pengolahan air dan limbah, serta perawatan cooling tower, boiler, dan chiller.",
    items: [
      "Waste Water Treatment (BIO LS, PAC, Chlorine, Bio Drain)",
      "Chemical Cooling Tower, Chiller & Boiler (seri Solchem)",
      "Konsultasi formulasi & dosing chemical",
    ],
    href: "#lingkup-pekerjaan",
    cta: "Lihat lingkup produk",
    external: false,
  },
  {
    icon: Wrench,
    badge: "PT Arga Wiyarta Langgeng",
    title: "Service & Maintenance MEP / HVAC",
    description:
      "Perusahaan grup yang menangani layanan teknis lapangan: perbaikan dan pemeliharaan elektrikal, mekanikal, plumbing, hingga HVAC.",
    items: [
      "Mechanical (lift, eskalator, HVAC, pompa)",
      "Electrical (instalasi & sistem kelistrikan)",
      "Plumbing & pemeliharaan rutin",
    ],
    href: "/grup/arga-wiyarta-langgeng#layanan",
    cta: "Lihat layanan",
    external: false,
  },
  {
    icon: FileCheck,
    badge: "PT Menara Anugerah Sukses",
    title: "Konsultan Perizinan, Sertifikasi & Training",
    description:
      "Perusahaan grup yang membantu klien mengurus perizinan, sertifikasi, dan pelatihan profesional sesuai regulasi yang berlaku.",
    items: [
      "Pengurusan perizinan & legalitas usaha",
      "Sertifikasi standar industri",
      "Training & pengembangan SDM",
    ],
    href: "/grup/menara-anugerah-sukses#layanan",
    cta: "Lihat layanan",
    external: false,
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
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Layanan Kami</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Tiga Pilar Solusi dari Lion Group
          </h2>
          <p className="text-muted-foreground mt-3">
            PT Lion Solusi Sejahtera berfokus pada produk chemical & water treatment, didukung dua perusahaan grup
            yang menangani layanan service-maintenance dan konsultan perizinan agar kebutuhan klien terpenuhi
            secara menyeluruh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="inline-block w-fit text-[11px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full mb-2">
                  {p.badge}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>

                <ul className="space-y-1.5 mb-5">
                  {p.items.map((it) => (
                    <li key={it} className="text-sm text-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  {p.href.startsWith("/") ? (
                    <Link
                      to={p.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a
                      href={p.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
