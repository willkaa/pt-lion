import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { groupCompanies } from "@/data/groupCompanies";

const GroupCompaniesSection = () => {
  return (
    <section id="grup" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Grup Perusahaan</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Di Bawah Naungan PT. Lion Solusi Sejahtera
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            PT. Lion Solusi Sejahtera berfokus pada penyediaan produk chemical, didukung oleh dua perusahaan grup
            yang melengkapi layanan perbaikan dan maintenance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {groupCompanies.map((company, i) => {
            const Icon = company.icon;
            return (
              <motion.div
                key={company.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-hero-gradient flex items-center justify-center flex-shrink-0">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-1.5">
                      Fokus: {company.focus}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
                      {company.name}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{company.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{company.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{company.contact.email}</span>
                  </div>
                </div>

                <Button asChild className="w-full gap-2">
                  <Link to={`/grup/${company.slug}`}>
                    Lihat Detail Perusahaan <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GroupCompaniesSection;
