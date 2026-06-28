import { bankInfo } from "@/lib/booking-storage";
import type { Appointment, Professional } from "@/types";
import { jsPDF } from "jspdf";

const PURPLE = [112, 48, 160] as const;
const DARK = [45, 27, 78] as const;

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function downloadAppointmentPdf(
  appointment: Appointment,
  professional: Professional,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(...PURPLE);
  doc.rect(0, 0, pageW, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("HABITADAS", 20, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Comprobante de cita agendada", 20, 28);
  doc.text(`Ref: ${appointment.id}`, 20, 35);

  // Status badge
  doc.setFillColor(198, 164, 230);
  doc.roundedRect(pageW - 55, 14, 40, 10, 2, 2, "F");
  doc.setTextColor(...DARK);
  doc.setFontSize(9);
  doc.text("PENDIENTE", pageW - 50, 20.5);

  let y = 55;
  doc.setTextColor(...DARK);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Detalle de la cita", 20, y);
  y += 10;

  const rows: [string, string][] = [
    ["Profesional", professional.name],
    ["Especialidad", professional.title],
    ["Fecha", formatDate(appointment.date)],
    ["Hora", appointment.time],
    ["Valor sesión", `$${professional.sessionPrice.toLocaleString("es-CO")} COP`],
    ["Motivo", appointment.reason],
  ];

  doc.setFontSize(10);
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(112, 48, 160);
    doc.text(label.toUpperCase(), 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 40, 80);
    const lines = doc.splitTextToSize(value, pageW - 80);
    doc.text(lines, 70, y);
    y += Math.max(8, lines.length * 5 + 2);
  });

  y += 6;
  doc.setDrawColor(198, 164, 230);
  doc.line(20, y, pageW - 20, y);
  y += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Datos del paciente", 20, y);
  y += 10;

  const clientRows: [string, string][] = [
    ["Nombre", appointment.clientName],
    ["Documento", appointment.clientId],
    ["Correo", appointment.clientEmail],
    ["Teléfono", appointment.clientPhone],
  ];

  doc.setFontSize(10);
  clientRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(112, 48, 160);
    doc.text(label, 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 40, 80);
    doc.text(value, 70, y);
    y += 8;
  });

  y += 6;
  doc.line(20, y, pageW - 20, y);
  y += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Pago por transferencia", 20, y);
  y += 10;

  const payRows: [string, string][] = [
    ["Banco", bankInfo.bank],
    ["Tipo cuenta", bankInfo.accountType],
    ["Número", bankInfo.accountNumber],
    ["Titular", bankInfo.holder],
    ["NIT", bankInfo.nit],
    ["Referencia", appointment.paymentReference],
  ];

  doc.setFontSize(10);
  payRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(112, 48, 160);
    doc.text(label, 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 40, 80);
    doc.text(value, 70, y);
    y += 8;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFillColor(250, 247, 252);
  doc.rect(0, footerY - 8, pageW, 28, "F");
  doc.setFontSize(8);
  doc.setTextColor(120, 100, 140);
  doc.text(
    "Este comprobante fue generado al agendar tu cita en HABITADAS. Conserva este documento.",
    20,
    footerY,
  );
  doc.text(`Generado: ${new Date(appointment.createdAt).toLocaleString("es-CO")}`, 20, footerY + 5);

  doc.save(`cita-habitadas-${appointment.id}.pdf`);
}
