import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, ArrowRight, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmissions } from "@/contexts/SubmissionsContext";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z.string().trim().email("Email tidak valid").max(255, "Email maksimal 255 karakter"),
  phone: z.string().trim().min(1, "Nomor telepon wajib diisi").max(20, "Nomor telepon maksimal 20 karakter"),
  subject: z.string().trim().min(1, "Subjek wajib diisi").max(200, "Subjek maksimal 200 karakter"),
  message: z.string().trim().min(1, "Pesan wajib diisi").max(2000, "Pesan maksimal 2000 karakter"),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const { addSubmission } = useSubmissions();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    // Simulate sending (replace with real API later)
    setTimeout(() => {
      addSubmission({
        type: "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });
      setLoading(false);
      setSubmitted(true);
      toast({ title: "Pesan terkirim!", description: "Tim kami akan segera menghubungi Anda." });
    }, 1200);
  };

  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Kontak</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Konsultasi & Request Penawaran
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Konsultasikan kebutuhan sanitasi air Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-hero-gradient rounded-2xl p-8 text-primary-foreground flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">Informasi Kontak</h3>
              <p className="text-primary-foreground/70 mb-8 text-sm">
                Jangan ragu untuk menghubungi kami melalui salah satu cara di bawah ini.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "(021) 55680161", sub: "Senin - Jumat, 08:00 - 17:00" },
                  { icon: Mail, label: "info@lionsolusi.co.id", sub: "Respon dalam 24 jam" },
                  { icon: MapPin, label: "Paramount Serpong, Tangerang", sub: "Ruko Tematik, Ps. Modern Paramount Serpong, Jl. Boulevard Raya Gading Serpong No.28 Blok P" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-primary-foreground/60 text-sm">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-primary-foreground/10">
              <p className="text-primary-foreground/60 text-xs">
                © {new Date().getFullYear()} PT. Lion Solusi Sejahtera. Semua hak dilindungi.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card rounded-2xl border border-border p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle className="h-16 w-16 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Pesan Terkirim!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Terima kasih telah menghubungi kami. Tim kami akan merespon dalam waktu 1x24 jam.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                  Kirim Pesan Lagi
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Masukkan nama Anda" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                    {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" placeholder="+62 812 3456 7890" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input id="subject" placeholder="Tentang apa?" value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} />
                    {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea id="message" placeholder="Tuliskan kebutuhan atau pertanyaan Anda..." rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
                  {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                  {loading ? "Mengirim..." : <><Send className="h-4 w-4" /> Kirim Pesan</>}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
