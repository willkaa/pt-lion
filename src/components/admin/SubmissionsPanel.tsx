import { useMemo, useState } from "react";
import { useSubmissions, type Submission, type SubmissionStatus } from "@/contexts/SubmissionsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Building2, Briefcase, ShoppingCart, MessageSquare, Trash2, Eye, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formatRupiah = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const typeMeta: Record<Submission["type"], { label: string; icon: typeof MessageSquare; color: string }> = {
  contact: { label: "Konsultasi", icon: MessageSquare, color: "bg-primary/10 text-primary border-primary/20" },
  quote: { label: "Penawaran", icon: ShoppingCart, color: "bg-accent/10 text-accent border-accent/20" },
  application: { label: "Lamaran", icon: Briefcase, color: "bg-secondary text-secondary-foreground border-border" },
};

const statusMeta: Record<SubmissionStatus, { label: string; className: string }> = {
  new: { label: "Baru", className: "bg-primary text-primary-foreground" },
  in_progress: { label: "Diproses", className: "bg-accent text-accent-foreground" },
  done: { label: "Selesai", className: "bg-muted text-muted-foreground" },
};

type FilterType = "all" | Submission["type"];

const SubmissionsPanel = () => {
  const { submissions, updateStatus, deleteSubmission } = useSubmissions();
  const { toast } = useToast();
  const [filter, setFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
  const [viewing, setViewing] = useState<Submission | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = submissions.length;
    const newCount = submissions.filter((s) => s.status === "new").length;
    const byType = {
      contact: submissions.filter((s) => s.type === "contact").length,
      quote: submissions.filter((s) => s.type === "quote").length,
      application: submissions.filter((s) => s.type === "application").length,
    };
    return { total, newCount, byType };
  }, [submissions]);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (filter !== "all" && s.type !== filter) return false;
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      return true;
    });
  }, [submissions, filter, statusFilter]);

  const handleDelete = (id: string) => {
    deleteSubmission(id);
    setConfirmDelete(null);
    toast({ title: "Permintaan dihapus" });
  };

  const handleStatusChange = (id: string, status: SubmissionStatus) => {
    updateStatus(id, status);
    toast({ title: "Status diperbarui", description: `Diubah menjadi "${statusMeta[status].label}".` });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">Permintaan Masuk</h2>
          <p className="text-sm text-muted-foreground">
            {stats.total} total permintaan{stats.newCount > 0 && ` • ${stats.newCount} baru`}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total" value={stats.total} icon={Inbox} active={filter === "all"} onClick={() => setFilter("all")} />
        <StatCard label="Konsultasi" value={stats.byType.contact} icon={MessageSquare} active={filter === "contact"} onClick={() => setFilter("contact")} />
        <StatCard label="Penawaran" value={stats.byType.quote} icon={ShoppingCart} active={filter === "quote"} onClick={() => setFilter("quote")} />
        <StatCard label="Lamaran" value={stats.byType.application} icon={Briefcase} active={filter === "application"} onClick={() => setFilter("application")} />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-muted-foreground">Status:</span>
        {(["all", "new", "in_progress", "done"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={statusFilter === s ? "default" : "outline"}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all" ? "Semua" : statusMeta[s].label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipe</TableHead>
                <TableHead>Pengirim</TableHead>
                <TableHead>Ringkasan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sub) => {
                const meta = typeMeta[sub.type];
                const Icon = meta.icon;
                return (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <Badge variant="outline" className={meta.color}>
                        <Icon className="h-3 w-3 mr-1" /> {meta.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">{sub.email}</p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-foreground line-clamp-1">
                        {sub.type === "contact" && sub.subject}
                        {sub.type === "quote" && `${sub.items.length} produk • ${formatRupiah(sub.totalEstimate)}`}
                        {sub.type === "application" && `Posisi: ${sub.jobTitle}`}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(sub.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Select value={sub.status} onValueChange={(v) => handleStatusChange(sub.id, v as SubmissionStatus)}>
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Baru</SelectItem>
                          <SelectItem value="in_progress">Diproses</SelectItem>
                          <SelectItem value="done">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setViewing(sub)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {confirmDelete === sub.id ? (
                          <div className="flex items-center gap-1">
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(sub.id)}>Ya</Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>Batal</Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="icon" onClick={() => setConfirmDelete(sub.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    <Inbox className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    Belum ada permintaan masuk.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Badge variant="outline" className={typeMeta[viewing.type].color}>
                    {typeMeta[viewing.type].label}
                  </Badge>
                  <Badge className={statusMeta[viewing.status].className}>{statusMeta[viewing.status].label}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2 text-sm">
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <p className="font-semibold text-foreground">{viewing.name}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /> {viewing.email}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {viewing.phone}</p>
                  {viewing.type === "quote" && viewing.company && (
                    <p className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> {viewing.company}</p>
                  )}
                  <p className="text-xs text-muted-foreground pt-1">Dikirim: {formatDate(viewing.createdAt)}</p>
                </div>

                {viewing.type === "contact" && (
                  <>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Subjek</p>
                      <p className="text-muted-foreground">{viewing.subject}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Pesan</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{viewing.message}</p>
                    </div>
                  </>
                )}

                {viewing.type === "quote" && (
                  <>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Produk Diminta</p>
                      <div className="space-y-2">
                        {viewing.items.map((it) => (
                          <div key={it.productId} className="flex justify-between items-center bg-muted/30 rounded p-2">
                            <div>
                              <p className="font-medium text-foreground">{it.productName}</p>
                              <p className="text-xs text-muted-foreground">{it.price} × {it.quantity}</p>
                            </div>
                            <Badge variant="secondary">{it.quantity}x</Badge>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                        <span className="text-muted-foreground">Total Estimasi</span>
                        <span className="font-bold text-foreground">{formatRupiah(viewing.totalEstimate)}</span>
                      </div>
                    </div>
                    {viewing.notes && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">Catatan</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{viewing.notes}</p>
                      </div>
                    )}
                  </>
                )}

                {viewing.type === "application" && (
                  <>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Posisi Dilamar</p>
                      <p className="text-muted-foreground">{viewing.jobTitle}</p>
                    </div>
                    {viewing.cvLink && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">CV / Portfolio</p>
                        <a href={viewing.cvLink} target="_blank" rel="noreferrer" className="text-primary underline break-all">{viewing.cvLink}</a>
                      </div>
                    )}
                    {viewing.message && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">Pesan Pelamar</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{viewing.message}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatCard = ({
  label, value, icon: Icon, active, onClick,
}: {
  label: string; value: number; icon: typeof MessageSquare; active: boolean; onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`text-left rounded-lg border p-4 transition-all ${
      active ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/50"
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
    </div>
    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
  </button>
);

export default SubmissionsPanel;
