import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { defaultJobs, type JobListing } from "@/data/careers";

type CareerContextType = {
  jobs: JobListing[];
  activeJobs: JobListing[];
  departments: string[];
  addJob: (job: Omit<JobListing, "id">) => void;
  updateJob: (id: string, updates: Partial<JobListing>) => void;
  deleteJob: (id: string) => void;
};

const CareerContext = createContext<CareerContextType | undefined>(undefined);

const STORAGE_KEY = "aquachem-careers";

export const CareerProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<JobListing[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultJobs;
    } catch {
      return defaultJobs;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const activeJobs = jobs.filter((j) => j.isActive);
  const departments = ["Semua", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const addJob = (job: Omit<JobListing, "id">) => {
    setJobs((prev) => [...prev, { ...job, id: crypto.randomUUID() }]);
  };

  const updateJob = (id: string, updates: Partial<JobListing>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <CareerContext.Provider value={{ jobs, activeJobs, departments, addJob, updateJob, deleteJob }}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareers = () => {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error("useCareers must be used within CareerProvider");
  return ctx;
};
