import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (location.pathname === "/beranda" && href.startsWith("/beranda#")) {
      const sectionId = href.split("#")[1];
      const el = document.querySelector(`#${sectionId}`);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Logo PT. Lion Solusi Sejahtera" className="h-7 w-7 object-contain" />
              <span className="font-display font-bold text-lg text-background">
                PT. Lion Solusi Sejahtera
              </span>
            </div>
            <p className="text-background/60 text-sm max-w-sm leading-relaxed">
              Solusi sanitasi dan pengolahan air terdepan di Indonesia. Menyediakan chemical berkualitas tinggi untuk berbagai sektor industri.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-3 text-sm">Layanan</h4>
            <div className="space-y-2">
              {["Perumahan", "Rumah Sakit", "Hotel & Resort", "Industri"].map((s) => (
                <p key={s} className="text-background/50 text-sm hover:text-background/80 cursor-pointer transition-colors">{s}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-3 text-sm">Perusahaan</h4>
            <div className="space-y-2">
              {[
                { label: "Tentang Kami", href: "/beranda#tentang" },
                { label: "Karir", href: "/karir" },
                { label: "Kontak", href: "/beranda#kontak" },
                { label: "Staff Portal", href: "/admin-login" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-background/50 text-sm hover:text-background/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center">
          <p className="text-background/40 text-sm">
            © 2026 PT. Lion Solusi Sejahtera. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
