import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Profesional | HABITADAS",
  description: "Gestión de citas, ingresos y disponibilidad",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F4F0FA]">{children}</div>;
}
