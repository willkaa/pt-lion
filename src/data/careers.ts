export type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
  postedDate: string;
  isActive: boolean;
};

export const defaultJobs: JobListing[] = [
  {
    id: "1",
    title: "Water Treatment Engineer",
    department: "Engineering",
    location: "Jakarta Selatan",
    type: "Full-time",
    description: "Bertanggung jawab dalam perancangan dan implementasi sistem pengolahan air untuk klien industri dan komersial.",
    requirements: [
      "S1 Teknik Lingkungan / Teknik Kimia",
      "Pengalaman minimal 2 tahun di bidang water treatment",
      "Memahami standar kualitas air PDAM dan industri",
      "Mampu bekerja di lapangan dan kantor",
    ],
    postedDate: "2026-04-01",
    isActive: true,
  },
  {
    id: "2",
    title: "Sales Executive - Chemical Products",
    department: "Sales & Marketing",
    location: "Jakarta & Sekitarnya",
    type: "Full-time",
    description: "Mengelola dan mengembangkan jaringan klien untuk produk chemical water treatment di area Jabodetabek.",
    requirements: [
      "S1 segala jurusan (diutamakan Teknik/Sains)",
      "Pengalaman sales B2B minimal 1 tahun",
      "Memiliki SIM A dan kendaraan pribadi",
      "Target-oriented dan komunikatif",
    ],
    postedDate: "2026-04-05",
    isActive: true,
  },
  {
    id: "3",
    title: "Lab Analyst",
    department: "Quality Control",
    location: "Jakarta Selatan",
    type: "Full-time",
    description: "Melakukan analisis kualitas air dan chemical di laboratorium perusahaan untuk memastikan standar mutu produk.",
    requirements: [
      "D3/S1 Kimia atau Teknik Kimia",
      "Menguasai alat-alat laboratorium analitik",
      "Teliti, rapi, dan mampu bekerja sesuai SOP",
      "Fresh graduate dipersilakan melamar",
    ],
    postedDate: "2026-04-10",
    isActive: true,
  },
  {
    id: "4",
    title: "Digital Marketing Intern",
    department: "Sales & Marketing",
    location: "Jakarta Selatan",
    type: "Internship",
    description: "Membantu tim marketing dalam pengelolaan media sosial, content creation, dan digital campaign perusahaan.",
    requirements: [
      "Mahasiswa aktif atau fresh graduate",
      "Memahami platform media sosial dan tools desain",
      "Kreatif dan up-to-date dengan tren digital",
      "Bersedia magang minimal 3 bulan",
    ],
    postedDate: "2026-04-12",
    isActive: true,
  },
];
