import { motion } from "framer-motion";
import { Droplets, Thermometer, FlaskConical, Recycle } from "lucide-react";

const intro = [
  "Kami berpengalaman menghadirkan teknologi lingkungan yang efektif untuk berbagai sektor industri dan perkotaan. Sejak tahun 2019, kami juga membentuk unit bisnis baru yaitu penyediaan chemical dan kontrak service untuk pemeliharaan cooling tower, boiler, dan chiller.",
];

const categories = [
  {
    icon: Recycle,
    title: "Waste Water Treatment",
    groups: [
      {
        subtitle: "Biological Treatment (BIO LS)",
        icon: Droplets,
        items: ["Bio LS 05", "Bio LS", "Bio LS Communal"],
      },
      {
        subtitle: "Chemical Treatment",
        icon: FlaskConical,
        items: ["PAC", "Chlorine", "Bio Drain"],
      },
    ],
  },
  {
    icon: Thermometer,
    title: "Cooling Tower, Boiler & Chiller",
    groups: [
      {
        subtitle: "Chemical Cooling Tower",
        icon: FlaskConical,
        items: [
          "Solchem CT7741 — Scale & Corrosion Inhibitor",
          "Solchem CT7901 — Biocide",
        ],
      },
      {
        subtitle: "Chemical Chiller",
        icon: FlaskConical,
        items: ["Solchem CH7771 — Scale & Corrosion Inhibitor"],
      },
      {
        subtitle: "Chemical Boiler",
        icon: FlaskConical,
        items: [
          "Solchem BW160 S — Scale Inhibitor",
          "Solchem BW160 C — Corrosion Inhibitor",
        ],
      },
    ],
  },
];

const ScopeOfWorkSection = () => {
  return (
    <section id="lingkup-pekerjaan" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Lingkup Pekerjaan
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
            Solusi Total Manajemen Air & Chemical Treatment
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-left md:text-center">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 md:p-8 shadow-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center">
                  <cat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-5">
                {cat.groups.map((g) => (
                  <div key={g.subtitle} className="rounded-lg border border-border/60 bg-section-gradient p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <g.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground text-sm">{g.subtitle}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScopeOfWorkSection;
