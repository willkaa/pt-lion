import { Users, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RoleSelect = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="Logo PT. Lion Solusi Sejahtera" className="h-12 w-12 object-contain" />
            <span className="font-display font-bold text-3xl text-foreground">
              PT. Lion <span className="text-primary">Solusi Sejahtera</span>
            </span>
          </div>
          <p className="text-muted-foreground">Pilih halaman yang ingin Anda akses</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/beranda"
              className="flex flex-col items-center gap-4 p-8 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="font-display font-bold text-lg text-foreground">User / Pelanggan</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Lihat produk, layanan, dan buat pesanan
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/admin-login"
              className="flex flex-col items-center gap-4 p-8 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="font-display font-bold text-lg text-foreground">Admin</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Kelola produk dan data master
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
