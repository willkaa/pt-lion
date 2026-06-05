import { useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle2, Building2, Users, ArrowRight, Eye, Target, Info, HeartHandshake, History, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCompanyBySlug } from "@/data/groupCompanies";

const GroupCompany = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const company = slug ? getCompanyBySlug(slug) : undefined;

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash, slug]);

  if (!company) return <Navigate to="/beranda" replace />;

  const Icon = company.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-gradient py-20">
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to="/beranda#grup"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke Grup Perusahaan
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                {company.logo ? (
                  <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center flex-shrink-0 p-2 shadow-lg">
                    <img src={company.logo} alt={`Logo ${company.name}`} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                )}
                <span className="inline-block text-xs font-semibold text-primary-foreground bg-primary-foreground/15 px-3 py-1.5 rounded-full">
                  Fokus: {company.focus}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                {company.name}
              </h1>
              <p className="text-xl text-primary-foreground/85 mb-8">{company.tagline}</p>
              <p className="text-primary-foreground/75 leading-relaxed max-w-2xl">{company.longDescription}</p>

              <div className="grid grid-cols-3 gap-6 mt-10 max-w-md">
                {company.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{s.value}</p>
                    <p className="text-xs text-primary-foreground/70 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* General Information / History + Visi & Misi */}
        {(company.generalInformation || company.history || company.vision || company.mission) && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              {company.generalInformation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Tentang Perusahaan
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-[17px]">
                    {company.generalInformation}
                  </p>
                </motion.div>
              )}

              {company.history && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <History className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      History
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-[17px]">
                    {company.history}
                  </p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.vision && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl border border-border p-7 shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Visi</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{company.vision}</p>
                  </motion.div>
                )}
                {company.mission && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-card rounded-2xl border border-border p-7 shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
                        <Target className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Misi</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{company.mission}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Our Solutions */}
        <section id="layanan" className="py-20 bg-section-gradient scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Solutions</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Layanan yang Kami Tawarkan
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {company.services.map((s, i) => {
                const ServiceIcon = s.icon ?? CheckCircle2;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center flex-shrink-0">
                        <ServiceIcon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1.5 text-lg">{s.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        {company.commitments && company.commitments.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-3">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Commitment</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Komitmen Kami
                </h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  Nilai-nilai yang kami pegang dalam setiap pekerjaan untuk memberikan hasil terbaik bagi klien.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {company.commitments.map((c, i) => {
                  const CIcon = c.icon;
                  return (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CIcon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-foreground mb-2 uppercase tracking-wide text-sm">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Bisnis Kami (Business Categories) */}
        {company.businessCategories && company.businessCategories.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Bisnis Kami</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Layanan Perizinan
                </h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  Kami melayani berbagai kategori perizinan dari lingkungan, K3, ESDM, bangunan gedung, kesehatan, hingga hak kekayaan intelektual.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {company.businessCategories.map((cat, i) => {
                  const CatIcon = cat.icon;
                  return (
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                        <div className="w-11 h-11 rounded-lg bg-hero-gradient flex items-center justify-center flex-shrink-0">
                          <CatIcon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground">{cat.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Our Project */}
        <section className="py-20 bg-section-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Project</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Dipercaya oleh Brand Terkemuka
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                Kami telah bekerja sama dengan berbagai institusi di sektor kesehatan, hospitality, dan industri.
              </p>
            </div>
            {company.projects && company.projects.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                {company.projects.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="aspect-[4/3] bg-secondary/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.caption ?? `Project ${i + 1}`}
                        className="w-full h-full object-contain p-3"
                        loading="lazy"
                      />
                    </div>
                    {p.caption && (
                      <div className="p-3 text-center border-t border-border">
                        <p className="text-sm font-semibold text-foreground">{p.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {company.partners.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-lg border border-border p-5 text-center hover:border-primary/30 transition-colors"
                  >
                    <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-foreground text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.sector}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-section-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card">
              <div className="text-center mb-10">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Kontak</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Hubungi {company.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, label: "Telepon", value: company.contact.phone },
                  { icon: Mail, label: "Email", value: company.contact.email },
                  { icon: MapPin, label: "Alamat", value: company.contact.address },
                  { icon: Clock, label: "Jam Operasional", value: company.contact.hours },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/40">
                    <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" asChild>
                  <Link to="/beranda#kontak" className="gap-2">
                    <Users className="h-4 w-4" /> Konsultasi via Lion Solusi <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GroupCompany;
