import { professionals } from "@/data/professionals";
import { AgendarClient } from "./AgendarClient";

export function generateStaticParams() {
  return professionals.map((p) => ({ slug: p.slug }));
}

export default function AgendarPage() {
  return <AgendarClient />;
}
