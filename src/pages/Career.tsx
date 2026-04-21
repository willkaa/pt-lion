import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Search, Send, ChevronDown, ChevronUp, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCareers } from "@/contexts/CareerContext";
import { useSubmissions } from "@/contexts/SubmissionsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { JobListing } from "@/data/careers";

const typeColors: Record<string, string> = {
  "Full-time": "bg-primary/10 text-primary",
  "Part-time": "bg-accent/10 text-accent",
  "Contract": "bg-secondary text-secondary-foreground",
  "Internship": "bg-destructive/10 text-destructive",
};

const Career = () => {
  const { activeJobs, departments } = useCareers();
  const { toast } = useToast();
  const { addSubmission } = useSubmissions();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", cvLink: "", message: "" });

  const filtered = activeJobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === "Semua" || job.department === department;
    return matchSearch && matchDept;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    setFormSubmitting(true);
    setTimeout(() => {
      addSubmission({
        type: "application",
        jobId: applyJob.id,
        jobTitle: applyJob.title,
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone,
        cvLink: applyForm.cvLink,
        message: applyForm.message,
      });
      setFormSubmitting(false);
      setApplyJob(null);
      setApplyForm({ name: "", email: "", phone: "", cvLink: "", message: "" });
      toast({ title: "Lamaran Terkirim!", description: "Tim HR kami akan meninjau lamaran Anda. Terima kasih!" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 bg-hero-gradient text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary-foreground/70 font-semibold text-sm tracking-widest uppercase mb-3 block">
                Karir di PT. Lion Solusi Sejahtera
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Bergabunglah dengan Tim Kami
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Bangun karir Anda bersama perusahaan terdepan di bidang pengolahan air dan sanitasi Indonesia. Kami mencari talenta terbaik yang siap membuat dampak nyata.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-section-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Mengapa Bergabung dengan PT. Lion Solusi Sejahtera?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Target, title: "Misi Bermakna", desc: "Berkontribusi langsung terhadap penyediaan air bersih dan sanitasi yang lebih baik untuk Indonesia." },
                { icon: Users, title: "Tim Profesional", desc: "Bekerja bersama tenaga ahli berpengalaman di industri water treatment dan chemical." },
                { icon: Heart, title: "Benefit Kompetitif", desc: "Gaji kompetitif, BPJS, tunjangan kesehatan, pelatihan berkala, dan jenjang karir yang jelas." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center h-full shadow-card hover:shadow-card-hover transition-shadow">
                    <CardContent className="pt-8 pb-6 px-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-foreground text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Lowongan</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
                Posisi yang Tersedia
              </h2>
              <p className="text-muted-foreground mt-2">
                {activeJobs.length} posisi terbuka saat ini
              </p>
            </motion.div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari posisi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {departments.map((d) => (
                  <Button
                    key={d}
                    size="sm"
                    variant={department === d ? "default" : "outline"}
                    onClick={() => setDepartment(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            <div className="max-w-3xl mx-auto space-y-4">
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-display font-bold text-foreground text-lg">{job.title}</h3>
                            <Badge variant="secondary" className={typeColors[job.type]}>{job.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.department}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {new Date(job.postedDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}>
                            Detail {expandedId === job.id ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
                          </Button>
                          <Button size="sm" onClick={() => setApplyJob(job)} className="gap-1">
                            <Send className="h-3.5 w-3.5" /> Lamar
                          </Button>
                        </div>
                      </div>

                      {expandedId === job.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          <p className="text-sm text-foreground mb-3">{job.description}</p>
                          <h4 className="font-semibold text-sm text-foreground mb-2">Persyaratan:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Tidak ada lowongan yang sesuai dengan pencarian Anda.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Apply Dialog */}
      <Dialog open={!!applyJob} onOpenChange={() => setApplyJob(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lamar: {applyJob?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Lengkap *</Label>
                <Input placeholder="Nama Anda" required value={applyForm.name} onChange={(e) => setApplyForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" placeholder="email@contoh.com" required value={applyForm.email} onChange={(e) => setApplyForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>No. Telepon *</Label>
                <Input placeholder="+62 812 3456 7890" required value={applyForm.phone} onChange={(e) => setApplyForm((f) => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Link CV / Portfolio</Label>
                <Input placeholder="https://..." value={applyForm.cvLink} onChange={(e) => setApplyForm((f) => ({ ...f, cvLink: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pesan Tambahan</Label>
              <Textarea placeholder="Ceritakan tentang diri Anda dan mengapa tertarik dengan posisi ini..." rows={4} value={applyForm.message} onChange={(e) => setApplyForm((f) => ({ ...f, message: e.target.value }))} />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={formSubmitting}>
              {formSubmitting ? "Mengirim..." : <><Send className="h-4 w-4" /> Kirim Lamaran</>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Career;
