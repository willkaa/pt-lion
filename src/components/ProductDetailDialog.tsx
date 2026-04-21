import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailDialog = ({ product, open, onOpenChange }: ProductDetailDialogProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-square max-h-64 mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.badge && (
              <Badge className="absolute top-3 right-3">{product.badge}</Badge>
            )}
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs text-muted-foreground">
                Volume: {product.details.volume}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Usage */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-1">Cara Penggunaan</h4>
              <p className="text-sm text-muted-foreground">{product.details.usage}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Keunggulan</h4>
              <ul className="space-y-1.5">
                {product.details.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="font-display text-2xl font-bold text-foreground">{product.price}</span>
            <Button className="gap-2" onClick={() => {
              addItem(product);
              toast({ title: "Ditambahkan ke keranjang", description: product.name });
              onOpenChange(false);
            }}>
              <ShoppingCart className="h-4 w-4" /> Pesan Sekarang
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
