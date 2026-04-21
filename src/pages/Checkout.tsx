import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Minus, Plus, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmissions } from "@/contexts/SubmissionsContext";
import { z } from "zod";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const parsePrice = (price: string): number =>
  parseInt(price.replace(/[^\d]/g, ""), 10) || 0;

const checkoutSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  company: z.string().optional(),
  notes: z.string().optional(),
});

const Checkout = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addSubmission } = useSubmissions();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Simulate sending request quote
    await new Promise((r) => setTimeout(r, 1500));
    addSubmission({
      type: "quote",
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      notes: form.notes,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      totalEstimate: totalPrice,
    });
    clearCart();
    setSubmitting(false);
    navigate("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Keranjang Kosong
            </h1>
            <p className="text-muted-foreground mb-6">
              Anda belum menambahkan produk ke keranjang.
            </p>
            <Button onClick={() => navigate("/produk")} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Lihat Produk
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="bg-hero-gradient py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Checkout
            </h1>
            <p className="text-primary-foreground/80 mt-2">
              Lengkapi data Anda untuk mengajukan penawaran
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-card rounded-lg border border-border p-5 sticky top-24">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">
                    Ringkasan Pesanan
                  </h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 p-3 rounded-lg bg-secondary/50">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-contain rounded-md bg-muted p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">{item.product.price}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                          {formatRupiah(parsePrice(item.product.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Estimasi</span>
                      <span className="font-display text-xl font-bold text-foreground">
                        {formatRupiah(totalPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      *Harga final dikonfirmasi oleh tim sales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-5">
                    Data Pemesanan
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Nama Anda"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">No. Telepon *</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="08xxxxxxxxxx"
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company">Perusahaan</Label>
                        <Input
                          id="company"
                          value={form.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          placeholder="Nama perusahaan (opsional)"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="notes">Catatan Tambahan</Label>
                      <Textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        placeholder="Informasi tambahan tentang kebutuhan Anda..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
                      {submitting ? (
                        "Mengirim..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Kirim Permintaan Penawaran
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Tim sales kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
