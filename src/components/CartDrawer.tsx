import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Keranjang ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-muted-foreground">Keranjang masih kosong</p>
            <Button variant="outline" size="sm" onClick={() => setIsCartOpen(false)}>
              Lanjut Belanja
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-md bg-muted p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Estimasi</span>
                <span className="font-display text-lg font-bold text-foreground">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                *Harga final akan dikonfirmasi oleh tim sales kami.
              </p>
              <Button className="w-full gap-2" onClick={handleCheckout}>
                Lanjut ke Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
