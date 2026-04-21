import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CareerProvider } from "@/contexts/CareerContext";
import { SubmissionsProvider } from "@/contexts/SubmissionsContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";

import Index from "./pages/Index";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Admin /> : <Navigate to="/admin-login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <CareerProvider>
              <SubmissionsProvider>
                <CartProvider>
                  <CartDrawer />
                  <Routes>
                    <Route path="/" element={<Navigate to="/beranda" replace />} />
                    <Route path="/beranda" element={<Index />} />
                    <Route path="/produk" element={<Products />} />
                    <Route path="/karir" element={<Career />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin" element={<ProtectedAdmin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </CartProvider>
              </SubmissionsProvider>
            </CareerProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
