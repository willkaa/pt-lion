import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, Save, X, Package, ArrowLeft, Briefcase, ToggleLeft, ToggleRight, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/contexts/ProductContext";
import { useCareers } from "@/contexts/CareerContext";
import { useToast } from "@/hooks/use-toast";
import { useSubmissions } from "@/contexts/SubmissionsContext";
import { Link } from "react-router-dom";
import SubmissionsPanel from "@/components/admin/SubmissionsPanel";
import type { Product } from "@/data/products";
import type { JobListing } from "@/data/careers";

// ── Product Form ──
type ProductForm = {
  name: string; category: string; price: string; description: string;
  badge: string; image: string; volume: string; usage: string; benefits: string;
};

const emptyProductForm: ProductForm = {
  name: "", category: "", price: "", description: "",
  badge: "", image: "", volume: "", usage: "", benefits: "",
};

const productToForm = (p: Product): ProductForm => ({
  name: p.name, category: p.category, price: p.price, description: p.description,
  badge: p.badge || "", image: p.image, volume: p.details.volume,
  usage: p.details.usage, benefits: p.details.benefits.join("\n"),
});

// ── Job Form ──
type JobForm = {
  title: string; department: string; location: string;
  type: JobListing["type"]; description: string; requirements: string;
};

const emptyJobForm: JobForm = {
  title: "", department: "", location: "", type: "Full-time",
  description: "", requirements: "",
};

const jobToForm = (j: JobListing): JobForm => ({
  title: j.title, department: j.department, location: j.location,
  type: j.type, description: j.description, requirements: j.requirements.join("\n"),
});

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { jobs, addJob, updateJob, deleteJob } = useCareers();
  const { submissions } = useSubmissions();
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const newSubmissionsCount = submissions.filter((s) => s.status === "new").length;

  // Product state
  const [prodDialogOpen, setProdDialogOpen] = useState(false);
  const [prodEditingId, setProdEditingId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<ProductForm>(emptyProductForm);
  const [prodDeleteConfirm, setProdDeleteConfirm] = useState<string | null>(null);

  // Job state
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [jobEditingId, setJobEditingId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState<JobForm>(emptyJobForm);
  const [jobDeleteConfirm, setJobDeleteConfirm] = useState<string | null>(null);

  // ── Product handlers ──
  const openAddProduct = () => { setProdEditingId(null); setProdForm(emptyProductForm); setProdDialogOpen(true); };
  const openEditProduct = (p: Product) => { setProdEditingId(p.id); setProdForm(productToForm(p)); setProdDialogOpen(true); };
  const handleSaveProduct = () => {
    if (!prodForm.name || !prodForm.category || !prodForm.price) {
      toast({ title: "Error", description: "Nama, Kategori, dan Harga wajib diisi.", variant: "destructive" });
      return;
    }
    const data = {
      name: prodForm.name, category: prodForm.category, price: prodForm.price,
      description: prodForm.description, badge: prodForm.badge || null,
      image: prodForm.image || "/placeholder.svg",
      details: { volume: prodForm.volume, usage: prodForm.usage, benefits: prodForm.benefits.split("\n").filter((b) => b.trim()) },
    };
    if (prodEditingId) { updateProduct(prodEditingId, data); toast({ title: "Berhasil", description: `Produk "${prodForm.name}" diperbarui.` }); }
    else { addProduct(data); toast({ title: "Berhasil", description: `Produk "${prodForm.name}" ditambahkan.` }); }
    setProdDialogOpen(false);
  };
  const handleDeleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    deleteProduct(id); setProdDeleteConfirm(null);
    toast({ title: "Dihapus", description: `Produk "${p?.name}" dihapus.` });
  };

  // ── Job handlers ──
  const openAddJob = () => { setJobEditingId(null); setJobForm(emptyJobForm); setJobDialogOpen(true); };
  const openEditJob = (j: JobListing) => { setJobEditingId(j.id); setJobForm(jobToForm(j)); setJobDialogOpen(true); };
  const handleSaveJob = () => {
    if (!jobForm.title || !jobForm.department || !jobForm.location) {
      toast({ title: "Error", description: "Judul, Departemen, dan Lokasi wajib diisi.", variant: "destructive" });
      return;
    }
    const data = {
      title: jobForm.title, department: jobForm.department, location: jobForm.location,
      type: jobForm.type, description: jobForm.description,
      requirements: jobForm.requirements.split("\n").filter((r) => r.trim()),
      postedDate: new Date().toISOString().split("T")[0], isActive: true,
    };
    if (jobEditingId) { updateJob(jobEditingId, data); toast({ title: "Berhasil", description: `Lowongan "${jobForm.title}" diperbarui.` }); }
    else { addJob(data); toast({ title: "Berhasil", description: `Lowongan "${jobForm.title}" ditambahkan.` }); }
    setJobDialogOpen(false);
  };
  const handleDeleteJob = (id: string) => {
    const j = jobs.find((x) => x.id === id);
    deleteJob(id); setJobDeleteConfirm(null);
    toast({ title: "Dihapus", description: `Lowongan "${j?.title}" dihapus.` });
  };
  const toggleJobActive = (j: JobListing) => {
    updateJob(j.id, { isActive: !j.isActive });
    toast({ title: j.isActive ? "Dinonaktifkan" : "Diaktifkan", description: `"${j.title}" ${j.isActive ? "dinonaktifkan" : "diaktifkan"}.` });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <h1 className="font-display font-bold text-lg text-foreground">Panel Admin</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submissions">
          <TabsList className="mb-6">
            <TabsTrigger value="submissions" className="gap-2 relative">
              <Inbox className="h-4 w-4" /> Permintaan
              {newSubmissionsCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold h-5 min-w-5 px-1.5">
                  {newSubmissionsCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2"><Package className="h-4 w-4" /> Produk</TabsTrigger>
            <TabsTrigger value="careers" className="gap-2"><Briefcase className="h-4 w-4" /> Karir</TabsTrigger>
          </TabsList>

          {/* ══════ Submissions Tab ══════ */}
          <TabsContent value="submissions">
            <SubmissionsPanel />
          </TabsContent>


          {/* ══════ Products Tab ══════ */}
          <TabsContent value="products">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">Master Produk</h2>
                <p className="text-sm text-muted-foreground">{products.length} produk terdaftar</p>
              </div>
              <Button onClick={openAddProduct} className="gap-2"><Plus className="h-4 w-4" /> Tambah Produk</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-muted overflow-hidden flex-shrink-0">
                              <img src={product.image} alt={product.name} className="h-full w-full object-contain p-1" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                        <TableCell className="font-medium">{product.price}</TableCell>
                        <TableCell>
                          {product.badge ? <Badge variant="outline" className="text-primary border-primary/30">{product.badge}</Badge> : <span className="text-muted-foreground text-xs">—</span>}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditProduct(product)}><Pencil className="h-4 w-4" /></Button>
                            {prodDeleteConfirm === product.id ? (
                              <div className="flex items-center gap-1">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>Ya</Button>
                                <Button variant="ghost" size="sm" onClick={() => setProdDeleteConfirm(null)}>Batal</Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="icon" onClick={() => setProdDeleteConfirm(product.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 && (
                      <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">Belum ada produk.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══════ Careers Tab ══════ */}
          <TabsContent value="careers">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">Master Lowongan Karir</h2>
                <p className="text-sm text-muted-foreground">{jobs.length} lowongan ({jobs.filter((j) => j.isActive).length} aktif)</p>
              </div>
              <Button onClick={openAddJob} className="gap-2"><Plus className="h-4 w-4" /> Tambah Lowongan</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posisi</TableHead>
                      <TableHead>Departemen</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} className={!job.isActive ? "opacity-50" : ""}>
                        <TableCell>
                          <p className="font-medium text-foreground">{job.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{job.description}</p>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{job.department}</Badge></TableCell>
                        <TableCell className="text-sm">{job.location}</TableCell>
                        <TableCell><Badge variant="outline">{job.type}</Badge></TableCell>
                        <TableCell>
                          <button onClick={() => toggleJobActive(job)} className="flex items-center gap-1.5 text-sm">
                            {job.isActive ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                            <span className={job.isActive ? "text-primary font-medium" : "text-muted-foreground"}>
                              {job.isActive ? "Aktif" : "Nonaktif"}
                            </span>
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditJob(job)}><Pencil className="h-4 w-4" /></Button>
                            {jobDeleteConfirm === job.id ? (
                              <div className="flex items-center gap-1">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>Ya</Button>
                                <Button variant="ghost" size="sm" onClick={() => setJobDeleteConfirm(null)}>Batal</Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="icon" onClick={() => setJobDeleteConfirm(job.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {jobs.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Belum ada lowongan.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Dialog */}
      <Dialog open={prodDialogOpen} onOpenChange={setProdDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{prodEditingId ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2"><Label>Nama Produk *</Label><Input value={prodForm.name} onChange={(e) => setProdForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nama produk" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Kategori *</Label><Input value={prodForm.category} onChange={(e) => setProdForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. Disinfektan" /></div>
              <div className="space-y-2"><Label>Harga *</Label><Input value={prodForm.price} onChange={(e) => setProdForm((f) => ({ ...f, price: e.target.value }))} placeholder="Rp 450.000" /></div>
            </div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea value={prodForm.description} onChange={(e) => setProdForm((f) => ({ ...f, description: e.target.value }))} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Badge</Label><Input value={prodForm.badge} onChange={(e) => setProdForm((f) => ({ ...f, badge: e.target.value }))} placeholder="Best Seller" /></div>
              <div className="space-y-2"><Label>Volume</Label><Input value={prodForm.volume} onChange={(e) => setProdForm((f) => ({ ...f, volume: e.target.value }))} placeholder="5 Liter" /></div>
            </div>
            <div className="space-y-2"><Label>URL Gambar</Label><Input value={prodForm.image} onChange={(e) => setProdForm((f) => ({ ...f, image: e.target.value }))} placeholder="/placeholder.svg" /></div>
            <div className="space-y-2"><Label>Cara Penggunaan</Label><Textarea value={prodForm.usage} onChange={(e) => setProdForm((f) => ({ ...f, usage: e.target.value }))} rows={2} /></div>
            <div className="space-y-2"><Label>Keunggulan (satu per baris)</Label><Textarea value={prodForm.benefits} onChange={(e) => setProdForm((f) => ({ ...f, benefits: e.target.value }))} rows={4} /></div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setProdDialogOpen(false)}><X className="h-4 w-4 mr-1" /> Batal</Button>
              <Button onClick={handleSaveProduct}><Save className="h-4 w-4 mr-1" /> {prodEditingId ? "Simpan" : "Tambah"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Dialog */}
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{jobEditingId ? "Edit Lowongan" : "Tambah Lowongan Baru"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2"><Label>Judul Posisi *</Label><Input value={jobForm.title} onChange={(e) => setJobForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Water Treatment Engineer" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Departemen *</Label><Input value={jobForm.department} onChange={(e) => setJobForm((f) => ({ ...f, department: e.target.value }))} placeholder="e.g. Engineering" /></div>
              <div className="space-y-2"><Label>Lokasi *</Label><Input value={jobForm.location} onChange={(e) => setJobForm((f) => ({ ...f, location: e.target.value }))} placeholder="Jakarta Selatan" /></div>
            </div>
            <div className="space-y-2">
              <Label>Tipe Pekerjaan</Label>
              <Select value={jobForm.type} onValueChange={(v) => setJobForm((f) => ({ ...f, type: v as JobListing["type"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea value={jobForm.description} onChange={(e) => setJobForm((f) => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="space-y-2"><Label>Persyaratan (satu per baris)</Label><Textarea value={jobForm.requirements} onChange={(e) => setJobForm((f) => ({ ...f, requirements: e.target.value }))} rows={4} placeholder={"S1 Teknik Lingkungan\nPengalaman 2 tahun\n..."} /></div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setJobDialogOpen(false)}><X className="h-4 w-4 mr-1" /> Batal</Button>
              <Button onClick={handleSaveJob}><Save className="h-4 w-4 mr-1" /> {jobEditingId ? "Simpan" : "Tambah"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
