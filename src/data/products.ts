import aquacleanPro from "@/assets/products/aquaclean-pro.jpg";
import chlorguard500 from "@/assets/products/chlorguard-500.jpg";
import phBalancePlus from "@/assets/products/ph-balance-plus.jpg";
import filtermaxUltra from "@/assets/products/filtermax-ultra.jpg";
import biotreatEnzyme from "@/assets/products/biotreat-enzyme.jpg";
import antiscale200 from "@/assets/products/antiscale-200.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  badge: string | null;
  image: string;
  details: {
    volume: string;
    usage: string;
    benefits: string[];
  };
};

export const categories = [
  "Semua",
  "Disinfektan",
  "Klorinasi",
  "pH Control",
  "Filtrasi",
  "Biologis",
  "Anti Kerak",
];

export const products: Product[] = [
  {
    id: "aquaclean-pro",
    name: "AquaClean Pro",
    category: "Disinfektan",
    price: "Rp 450.000",
    description: "Disinfektan konsentrat untuk pengolahan air minum dan sanitasi umum.",
    badge: "Best Seller",
    image: aquacleanPro,
    details: {
      volume: "5 Liter",
      usage: "Campurkan 10ml per 1000 liter air. Cocok untuk sistem pengolahan air skala kecil hingga menengah.",
      benefits: [
        "Efektif membunuh 99.9% bakteri dan virus",
        "Aman untuk air minum sesuai standar WHO",
        "Tidak meninggalkan rasa atau bau pada air",
        "Tahan lama dan ekonomis",
      ],
    },
  },
  {
    id: "chlorguard-500",
    name: "ChlorGuard 500",
    category: "Klorinasi",
    price: "Rp 380.000",
    description: "Tablet klorin untuk treatment kolam renang dan water park.",
    badge: null,
    image: chlorguard500,
    details: {
      volume: "500 Tablet (200g/tablet)",
      usage: "Gunakan 1-2 tablet per 10.000 liter air kolam. Tambahkan secara berkala sesuai kebutuhan.",
      benefits: [
        "Mudah digunakan dalam bentuk tablet",
        "Larut perlahan untuk efek berkepanjangan",
        "Menjaga kejernihan air kolam",
        "Cocok untuk kolam renang komersial",
      ],
    },
  },
  {
    id: "ph-balance-plus",
    name: "pH Balance Plus",
    category: "pH Control",
    price: "Rp 275.000",
    description: "Pengatur pH air untuk menjaga keseimbangan asam-basa optimal.",
    badge: null,
    image: phBalancePlus,
    details: {
      volume: "2.5 Liter",
      usage: "Tambahkan 5-10ml per 1000 liter air, ukur pH secara berkala dengan test kit.",
      benefits: [
        "Menjaga pH air pada level optimal 6.5-7.5",
        "Meningkatkan efektivitas disinfektan",
        "Mencegah korosi pada sistem perpipaan",
        "Formulasi cair mudah dosis",
      ],
    },
  },
  {
    id: "filtermax-ultra",
    name: "FilterMax Ultra",
    category: "Filtrasi",
    price: "Rp 1.250.000",
    description: "Media filtrasi premium untuk sistem pengolahan air berskala besar.",
    badge: "Premium",
    image: filtermaxUltra,
    details: {
      volume: "25 Kg",
      usage: "Isi media filter sesuai spesifikasi tangki. Ganti setiap 12-18 bulan tergantung kualitas air masuk.",
      benefits: [
        "Menyaring partikel hingga 5 mikron",
        "Umur pakai panjang dan hemat biaya",
        "Cocok untuk industri dan rumah sakit",
        "Bersertifikat NSF/ANSI",
      ],
    },
  },
  {
    id: "biotreat-enzyme",
    name: "BioTreat Enzyme",
    category: "Biologis",
    price: "Rp 520.000",
    description: "Enzim biologis untuk pengolahan limbah cair secara ramah lingkungan.",
    badge: "New",
    image: biotreatEnzyme,
    details: {
      volume: "10 Liter",
      usage: "Campurkan 50ml per 1000 liter limbah cair. Aplikasikan secara rutin setiap minggu.",
      benefits: [
        "100% ramah lingkungan dan biodegradable",
        "Mengurai limbah organik secara efektif",
        "Mengurangi bau tidak sedap",
        "Aman untuk lingkungan perairan",
      ],
    },
  },
  {
    id: "antiscale-200",
    name: "AntiScale 200",
    category: "Anti Kerak",
    price: "Rp 340.000",
    description: "Pencegah kerak dan korosi untuk pipa dan sistem pendingin.",
    badge: null,
    image: antiscale200,
    details: {
      volume: "5 Liter",
      usage: "Injeksikan 20-50 ppm ke dalam sistem sirkulasi air. Sesuaikan dosis berdasarkan kekerasan air.",
      benefits: [
        "Mencegah pembentukan kerak kalsium",
        "Melindungi pipa dari korosi",
        "Memperpanjang umur peralatan",
        "Hemat biaya perawatan jangka panjang",
      ],
    },
  },
];
