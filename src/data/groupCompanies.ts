import { Wrench, Settings, Cog, Zap, Droplets, ShieldCheck, Rocket, MessagesSquare, Lightbulb, Award, Leaf, HardHat, Factory, Building, Stethoscope, Copyright, FileCheck, LucideIcon } from "lucide-react";
import argaWiyartaLogo from "@/assets/arga-wiyarta-logo.png";
import menaraAnugerahLogo from "@/assets/menara-anugerah-logo.png";
import argaTerminalBanjar from "@/assets/projects/arga/terminal-banjar.png";
import argaSpringResidence from "@/assets/projects/arga/spring-residence.png";
import argaScientiaSquare from "@/assets/projects/arga/scientia-square.png";
import argaPuslabfor from "@/assets/projects/arga/puslabfor.png";
import argaMieBurungDara from "@/assets/projects/arga/mie-burung-dara.png";
import argaSantikaBintaro from "@/assets/projects/arga/santika-bintaro.png";
import argaIzzara from "@/assets/projects/arga/izzara.png";
import argaAllianz from "@/assets/projects/arga/allianz.png";
import argaPeakSudirman from "@/assets/projects/arga/peak-sudirman.png";
import argaThePark from "@/assets/projects/arga/the-park.png";
import argaRni from "@/assets/projects/arga/rni.png";
import argaVivo from "@/assets/projects/arga/vivo.png";
import menaraMayapada from "@/assets/projects/menara/mayapada.png";
import menaraAgungPodomoro from "@/assets/projects/menara/agung-podomoro.png";
import menaraArchipelago from "@/assets/projects/menara/archipelago.png";
import menaraNorbuMedika from "@/assets/projects/menara/norbu-medika.png";
import menaraSinarmasLand from "@/assets/projects/menara/sinarmas-land.png";
import menaraBritishSchool from "@/assets/projects/menara/british-school.png";
import menaraAccor from "@/assets/projects/menara/accor.png";
import menaraAlamSutera from "@/assets/projects/menara/alam-sutera.png";
import menaraAdPremier from "@/assets/projects/menara/ad-premier.png";
import menaraGrandMansion from "@/assets/projects/menara/grand-mansion.png";
import menaraJayaKencana from "@/assets/projects/menara/jaya-kencana.png";
import menaraSovereign from "@/assets/projects/menara/sovereign.png";
import menaraHutamaKarya from "@/assets/projects/menara/hutama-karya.png";
import menaraHotelSantika from "@/assets/projects/menara/hotel-santika.png";
import menaraKaryaBahanaUnigam from "@/assets/projects/menara/karya-bahana-unigam.png";
import menaraPesonaSquare from "@/assets/projects/menara/pesona-square.png";
import menaraSwissBelhotel from "@/assets/projects/menara/swiss-belhotel.png";
import menaraIkea from "@/assets/projects/menara/ikea.png";
import menaraJiks from "@/assets/projects/menara/jiks.png";
import menaraAeon from "@/assets/projects/menara/aeon.png";
import menaraMandaya from "@/assets/projects/menara/mandaya.png";
import menaraPancoranRiverside from "@/assets/projects/menara/pancoran-riverside.png";
import menaraHarita from "@/assets/projects/menara/harita.png";
import menaraKaryaBahanaGroup from "@/assets/projects/menara/karya-bahana-group.png";

export interface GroupCompany {
  slug: string;
  name: string;
  focus: string;
  tagline: string;
  icon: LucideIcon;
  logo?: string;
  description: string;
  longDescription: string;
  generalInformation?: string;
  vision?: string;
  mission?: string;
  services: { title: string; detail: string; icon?: LucideIcon }[];
  commitments?: { title: string; detail: string; icon: LucideIcon }[];
  history?: string;
  businessCategories?: { title: string; icon: LucideIcon; items: string[] }[];
  partners: { name: string; sector: string }[];
  projects?: { image: string; caption?: string }[];
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  stats: { value: string; label: string }[];
}

export const groupCompanies: GroupCompany[] = [
  {
    slug: "arga-wiyarta-langgeng",
    name: "PT Arga Wiyarta Langgeng",
    focus: "Service dan Maintenance",
    tagline: "Solusi Elektrikal, Mekanikal, Plumbing & HVAC Terpadu",
    icon: Wrench,
    logo: argaWiyartaLogo,
    description:
      "Spesialis layanan perbaikan elektrikal, mekanikal, plumbing, dan HVAC sistem untuk berbagai sektor industri.",
    longDescription:
      "PT Arga Wiyarta Langgeng berfokus pada layanan perbaikan menyeluruh di bidang elektrikal, mekanikal, plumbing, dan HVAC. Tim teknisi bersertifikat siap menangani berbagai kebutuhan teknis dengan respon cepat untuk memastikan operasional klien kembali optimal dalam waktu sesingkat mungkin.",
    generalInformation:
      "PT Arga Wiyarta Langgeng tumbuh lebih kuat dan lebih inovatif untuk mencapai kompetensi dan kinerja yang tinggi untuk memenuhi harapan client yang terus berkembang dan beragam. Kami memiliki konsentrasi yang tinggi untuk memenuhi kebutuhan pekerjaan dengan sumber daya manusia yang memiliki skill, visi, dan profesionalisme yang tinggi untuk mencapai hasil kerja yang berkualitas dari berbagai disiplin ilmu dan memaksimalkan tingkat kualitas dan ketepatan hasil pekerjaan yang sesuai.",
    vision:
      "Menjadi perusahaan multinasional yang kompeten dalam memberikan layanan di bidang elektrikal, mekanikal, plumbing, HVAC sistem, jasa dan pemeliharaan yang lebih baik menuju masa depan.",
    mission:
      "Menyediakan layanan elektrikal, mekanikal, plumbing, HVAC sistem jasa dan pemeliharaan dengan kualitas terbaik dan membangun hubungan dengan client untuk jangka panjang melalui inovasi dan perkembangan teknologi.",
    services: [
      {
        title: "Mechanical",
        detail:
          "Mengerjakan pekerjaan yang berhubungan dengan alat mesin besar, seperti lift dan eskalator, HVAC, serta pompa air dan instalasi penunjang lainnya.",
        icon: Cog,
      },
      {
        title: "Electrical",
        detail: "Pengadaan, pemasangan instalasi listrik, dan perubahan sistem listrik.",
        icon: Zap,
      },
      {
        title: "Plumbing",
        detail:
          "Pemasangan dan penginstalasian pompa transfer, booster, pemipaan plumbing, serta pengolahan air baku dan air limbah/WTP & WWTP Plant.",
        icon: Droplets,
      },
      {
        title: "Service and Maintenance",
        detail:
          "Operasional, maintenance, dan cleaning WTP, STP, WWTP, Cooling Tower, Boiler, Chiller, serta penggantian media filter.",
        icon: ShieldCheck,
      },
    ],
    commitments: [
      {
        title: "Proaktif",
        detail: "Berpikiran luas dan terinformasi dengan baik untuk bertindak cepat dan tegas.",
        icon: Rocket,
      },
      {
        title: "Berkomunikasi dengan Baik",
        detail:
          "Menyelaraskan beragam keterampilan dengan berpikir di luar kebiasaan dan berkomunikasi secara efektif dengan orang lain.",
        icon: MessagesSquare,
      },
      {
        title: "Lihat Pengetahuan Baru",
        detail:
          "Merintis potensi baru melalui pembelajaran mandiri dan keingintahuan yang tidak dapat dipisahkan.",
        icon: Lightbulb,
      },
      {
        title: "Tampilan Integritas",
        detail: "Bekerja dengan ketekunan dan ketulusan sebagai individu yang bertanggung jawab.",
        icon: Award,
      },
    ],
    partners: [
      { name: "RS Siloam", sector: "Rumah Sakit" },
      { name: "Hotel Aryaduta", sector: "Hospitality" },
      { name: "Apartemen Paramount", sector: "Residensial" },
      { name: "Pabrik Mayora", sector: "Industri" },
      { name: "RS Premier Bintaro", sector: "Rumah Sakit" },
      { name: "Swiss-Belhotel", sector: "Hospitality" },
    ],
    projects: [
      { image: argaTerminalBanjar, caption: "Terminal Banjar" },
      { image: argaSpringResidence, caption: "The Spring Residence Ciputat" },
      { image: argaScientiaSquare, caption: "Scientia Square Park" },
      { image: argaPuslabfor, caption: "Puslabfor Pontianak dan Manado" },
      { image: argaMieBurungDara, caption: "Mie Burung Dara" },
      { image: argaSantikaBintaro, caption: "Hotel Santika Bintaro" },
      { image: argaIzzara, caption: "Izzara Apartment" },
      { image: argaAllianz, caption: "Allianz" },
      { image: argaPeakSudirman, caption: "The Peak Sudirman" },
      { image: argaThePark, caption: "The Park Sawangan" },
      { image: argaRni, caption: "PT Rajawali Nusantara Indonesia (RNI)" },
      { image: argaVivo, caption: "Vivo" },
    ],
    contact: {
      phone: "021-5568-0185",
      email: "sales@aw-langgeng.com",
      address:
        "Gedung Educenter Lt. 2 Unit 22181, Kav. Commercial International School Lot 2 No. 8, BSD City - Tangerang",
      hours: "Senin - Sabtu, 08:00 - 18:00 (Darurat 24/7)",
    },
    stats: [
      { value: "300+", label: "Proyek Selesai" },
      { value: "<24j", label: "Respon Darurat" },
      { value: "10+", label: "Tahun Pengalaman" },
    ],
  },
  {
    slug: "medikara",
    name: "PT Menara Anugerah Sukses",
    focus: "Konsultan Perizinan",
    tagline: "Konsultan Profesional untuk Perizinan, Sertifikasi & Training",
    icon: FileCheck,
    logo: menaraAnugerahLogo,
    description:
      "Konsultan perizinan, sertifikasi, dan training dengan pengalaman di sektor properti, industri, hingga pertambangan.",
    longDescription:
      "PT Menara Anugerah Sukses merupakan perusahaan konsultan yang berfokus pada layanan perizinan, sertifikasi, dan training. Didukung sumber daya manusia profesional, inovatif, serta berpengalaman lintas sektor properti, industri, hingga pertambangan.",
    history:
      "Merupakan perusahaan (konsultan) yang didirikan dalam bidang perizinan, sertifikasi, dan training. Dan juga memiliki sumber daya manusia yang mumpuni (profesional, inovatif, serta memiliki solusi pada pekerjaan) dan berpengalaman di bidang properti, industri hingga pertambangan.",
    vision:
      "Menjadi salah satu konsultan yang profesional dan berkualitas skala nasional.",
    mission:
      "Berkomitmen terhadap kepuasan pelanggan serta patuh terhadap regulasi pemerintah Indonesia.",
    services: [
      { title: "Perizinan", detail: "Pengurusan perizinan lingkungan, K3, ESDM, bangunan gedung, kesehatan, hingga HKI.", icon: FileCheck },
      { title: "Sertifikasi", detail: "Pendampingan sertifikasi sesuai standar dan regulasi pemerintah Indonesia.", icon: Award },
      { title: "Training", detail: "Program pelatihan profesional untuk meningkatkan kompetensi tim klien.", icon: Lightbulb },
    ],
    businessCategories: [
      {
        title: "Lingkungan",
        icon: Leaf,
        items: [
          "Izin/Persetujuan Lingkungan",
          "AMDAL",
          "Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan (UKL UPL)",
          "Dokumen Evaluasi Lingkungan Hidup (DELH)",
          "Dokumen Pengelolaan Lingkungan Hidup (DPLH)",
          "Surat Pernyataan Pengelolaan Lingkungan (SPPL)",
          "Persetujuan Teknis (PERTEK) Pembuangan Air Limbah",
          "Surat Kelayakan Operasional (SLO) Pembuangan Air Limbah",
          "Persetujuan Teknis (PERTEK) Pemanfaatan Air Limbah",
          "Surat Kelayakan Operasional (SLO) Pemanfaatan Air Limbah",
          "Persetujuan Teknis (PERTEK) Pembuangan Emisi",
          "Surat Kelayakan Operasional (SLO) Pembuangan Emisi",
          "Rincian Teknis Penyimpanan Sementara Limbah B3",
          "Persetujuan Teknis (PERTEK) Pengelolaan Limbah B3",
          "Surat Kelayakan Operasional (SLO) Pengelolaan Limbah B3",
          "Implementasi RKL RPL, UKL UPL, DPLH, DELH",
          "Pelaporan Lingkungan Triwulan (Pengelolaan Limbah Cair dan Limbah B3)",
          "Audit Lingkungan",
        ],
      },
      {
        title: "Keselamatan dan Kesehatan Kerja (K3)",
        icon: HardHat,
        items: [
          "Riksa Uji Alat K3 Pesawat Angkat Angkut (PAA)",
          "Riksa Uji Alat K3 Pesawat Uap Bejana Tekan (PUBT)",
          "Riksa Uji Alat K3 Instalasi Listrik dan Instalasi Penyalur Listrik (ILIPP)",
          "Riksa Uji Alat K3 Pesawat Tenaga Produksi (PTP)",
          "Riksa Uji Alat K3 Eskalator dan Elevator",
          "Riksa Uji Alat K3 Sistem Proteksi Kebakaran",
          "Contractor Safety Management System (CSMS)",
          "Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)",
        ],
      },
      {
        title: "ESDM",
        icon: Factory,
        items: [
          "Izin Operasi Usaha Penyediaan Tenaga Listrik (IO Genset)",
          "Sertifikat Laik Operasi Instalasi Ketenagalistrikan (SLO, TR, TM, Genset)",
          "Surat Izin Pengusahaan/Pemanfaatan Air Tanah (SIPA)",
          "Izin Pengeboran Air Tanah (IPAT)",
          "Izin Usaha Jasa Pertambangan (IUJP)",
          "Izin Usaha Pertambangan (IUP)",
        ],
      },
      {
        title: "Bangunan Gedung",
        icon: Building,
        items: [
          "Izin Mendirikan Bangunan (IMB)/Persetujuan Bangunan Gedung (PBG)",
          "Rekomendasi Keselamatan Kebakaran (RKK)",
          "Sertifikat Keselamatan Kebakaran (SKK)",
          "Surat Keterangan Pemeriksaan Sistem Proteksi Kebakaran (Suket Damkar)",
          "Sertifikat Laik Fungsi (SLF)",
          "Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)",
        ],
      },
      {
        title: "Kesehatan",
        icon: Stethoscope,
        items: [
          "Sertifikat Laik Sehat (SLS)",
          "Izin Edar Alat Kesehatan",
        ],
      },
      {
        title: "Hak Kekayaan Intelektual",
        icon: Copyright,
        items: ["Merek", "Paten", "Hak Cipta"],
      },
    ],
    partners: [
      { name: "RS Mitra Keluarga", sector: "Rumah Sakit" },
      { name: "Hotel Santika", sector: "Hospitality" },
      { name: "Lippo Mall", sector: "Komersial" },
      { name: "PT Indofood", sector: "Industri" },
      { name: "RS Pondok Indah", sector: "Rumah Sakit" },
      { name: "Summarecon Mall", sector: "Komersial" },
    ],
    projects: [
      { image: menaraMayapada, caption: "Mayapada Hospital" },
      { image: menaraAgungPodomoro, caption: "Agung Podomoro Land" },
      { image: menaraArchipelago, caption: "Archipelago" },
      { image: menaraNorbuMedika, caption: "Norbu Medika" },
      { image: menaraSinarmasLand, caption: "Sinarmas Land" },
      { image: menaraBritishSchool, caption: "British School Jakarta" },
      { image: menaraAccor, caption: "Accor Hotels" },
      { image: menaraAlamSutera, caption: "Alam Sutera" },
      { image: menaraAdPremier, caption: "AD Premier" },
      { image: menaraGrandMansion, caption: "The Grand Mansion Menteng" },
      { image: menaraJayaKencana, caption: "PT Jaya Kencana" },
      { image: menaraSovereign, caption: "Sovereign" },
      { image: menaraHutamaKarya, caption: "PT Hutama Karya (Persero)" },
      { image: menaraHotelSantika, caption: "Hotel Santika" },
      { image: menaraKaryaBahanaUnigam, caption: "PT Karya Bahana Unigam" },
      { image: menaraPesonaSquare, caption: "Pesona Square" },
      { image: menaraSwissBelhotel, caption: "Swiss-Belhotel" },
      { image: menaraIkea, caption: "IKEA" },
      { image: menaraJiks, caption: "Jakarta Indonesia Korean School" },
      { image: menaraAeon, caption: "AEON" },
      { image: menaraMandaya, caption: "Mandaya Hospital Group" },
      { image: menaraPancoranRiverside, caption: "Pancoran Riverside" },
      { image: menaraHarita, caption: "Harita Group" },
      { image: menaraKaryaBahanaGroup, caption: "PT Karya Bahana Group" },
    ],
    contact: {
      phone: "021-5568-0085",
      email: "sales@menaraanses.com",
      address: "Jl. Boulevard Ruko Taman Tekno Widya Blok D No. 1, BSD City, Kelurahan Setu, Kecamatan Tangerang Selatan 15314",
      hours: "Senin - Jumat, 08:00 - 17:00",
    },
    stats: [
      { value: "200+", label: "Perizinan Diurus" },
      { value: "100%", label: "Patuh Regulasi" },
      { value: "10+", label: "Tahun Pengalaman" },
    ],
  },
];

export const getCompanyBySlug = (slug: string) =>
  groupCompanies.find((c) => c.slug === slug);
