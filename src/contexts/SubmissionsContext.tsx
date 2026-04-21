import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SubmissionStatus = "new" | "in_progress" | "done";

export type ContactSubmission = {
  id: string;
  type: "contact";
  createdAt: string;
  status: SubmissionStatus;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type QuoteItem = {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
};

export type QuoteSubmission = {
  id: string;
  type: "quote";
  createdAt: string;
  status: SubmissionStatus;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  items: QuoteItem[];
  totalEstimate: number;
};

export type ApplicationSubmission = {
  id: string;
  type: "application";
  createdAt: string;
  status: SubmissionStatus;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  cvLink?: string;
  message?: string;
};

export type Submission = ContactSubmission | QuoteSubmission | ApplicationSubmission;

type NewSubmission =
  | Omit<ContactSubmission, "id" | "createdAt" | "status">
  | Omit<QuoteSubmission, "id" | "createdAt" | "status">
  | Omit<ApplicationSubmission, "id" | "createdAt" | "status">;

type SubmissionsContextType = {
  submissions: Submission[];
  addSubmission: (s: NewSubmission) => void;
  updateStatus: (id: string, status: SubmissionStatus) => void;
  deleteSubmission: (id: string) => void;
  clearAll: () => void;
};

const STORAGE_KEY = "lion_submissions_v1";
const SubmissionsContext = createContext<SubmissionsContextType | undefined>(undefined);

export const SubmissionsProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (data: NewSubmission) => {
    const newSub = {
      ...data,
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: "new" as SubmissionStatus,
    } as Submission;
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const updateStatus = (id: string, status: SubmissionStatus) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => setSubmissions([]);

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, updateStatus, deleteSubmission, clearAll }}>
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = () => {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error("useSubmissions must be used within SubmissionsProvider");
  return ctx;
};
