export type Beneficiary = "yo" | "otra";

export type IntakeData = {
  truthAccepted: boolean;
  privacyAccepted: boolean;
  beneficiary: Beneficiary;
  contactFirstName: string;
  contactLastName: string;
  relationship: string;
  patientFirstName: string;
  patientLastName: string;
  age: string;
  gender: string;
  idNumber: string;
  city: string;
  country: string;
  serviceType: string;
  modality: string;
  reason: string;
  homework: string;
  riskLast3Months: string;
  payer: string;
  employment: string;
  income: string;
  incomeSource: string;
  leftover: string;
  economicNote: string;
  willingPay: string;
  availableSlots: string[]; // e.g. "Lunes-09:00"
  therapistGender: string;
  dialogueStyle: string;
  timeFocus: string;
  billingUnderstood: boolean;
  heardFrom: string;
  phone: string;
  procedureUnderstood: boolean;
  notificationsAccepted: boolean;
};

export const emptyIntake = (): IntakeData => ({
  truthAccepted: false,
  privacyAccepted: false,
  beneficiary: "yo",
  contactFirstName: "",
  contactLastName: "",
  relationship: "",
  patientFirstName: "",
  patientLastName: "",
  age: "",
  gender: "",
  idNumber: "",
  city: "Quito",
  country: "Ecuador",
  serviceType: "",
  modality: "",
  reason: "",
  homework: "",
  riskLast3Months: "",
  payer: "Yo",
  employment: "",
  income: "",
  incomeSource: "",
  leftover: "",
  economicNote: "",
  willingPay: "",
  availableSlots: [],
  therapistGender: "",
  dialogueStyle: "",
  timeFocus: "",
  billingUnderstood: false,
  heardFrom: "",
  phone: "",
  procedureUnderstood: false,
  notificationsAccepted: false,
});

export const INTAKE_OPTIONS = {
  relationships: [
    "Madre / Padre",
    "Pareja",
    "Familiar",
    "Tutor/a legal",
    "Amistad",
    "Otro",
  ],
  genders: ["Femenino", "Masculino", "Prefiero no decirlo", "Otro"],
  services: [
    "Acompañamiento psicológico",
    "Terapia individual",
    "Terapia de pareja",
    "Terapia familiar",
    "Talleres psicoeducativos",
  ],
  modalities: ["Presencial (oficina)", "Virtual (Google Meet o Zoom)"],
  homework: [
    "Sí, quiero aplicar lo aprendido",
    "Puede ser, me gustaría intentarlo",
    "No, no quisiera tareas",
    "Aún no lo tengo claro",
  ],
  risk: ["No", "Sí"],
  payer: ["Yo", "Alguien más"],
  employment: [
    "Estudio sin empleo",
    "Estudio con empleo",
    "Empleado/a",
    "Buscando empleo",
    "Otro",
  ],
  income: [
    "Menos de $50",
    "$50 a $100",
    "$100 a $300",
    "$300 a $600",
    "$600 a $1000",
    "Más de $1000",
  ],
  willingPay: [
    "$5 a $8",
    "$9 a $12",
    "$13 a $15",
    "$16 a $20",
    "$21 a $25",
    "$26 a $30",
    "$31 a $35",
  ],
  therapistGender: [
    "Prefiero mujer",
    "Prefiero hombre",
    "Quien se adecúe al motivo",
    "Sin preferencia",
  ],
  dialogue: [
    "Profundizar y ser escuchado/a",
    "Acciones concretas",
    "Equilibrio entre ambas",
    "Aún no lo tengo claro",
  ],
  timeFocus: [
    "Pasado (infancia / adolescencia)",
    "Presente (temas actuales)",
    "Ambas",
    "Aún no lo tengo claro",
  ],
  heardFrom: [
    "Publicidad en redes",
    "Recomendación",
    "Página web",
    "Otro",
  ],
  weekdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  hours: [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ],
};

export const PRIVACY_SUMMARY =
  "HABITADAS tratará tus datos personales con confidencialidad para gestionar tu proceso terapéutico, facturación y comunicaciones. No compartimos tu información con terceros ajenos a la atención, salvo obligación legal. Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a contacto@habitadas.site.";

export function patientFullName(data: IntakeData) {
  if (data.beneficiary === "yo") {
    return `${data.contactFirstName} ${data.contactLastName}`.trim();
  }
  return `${data.patientFirstName} ${data.patientLastName}`.trim();
}

export function contactFullName(data: IntakeData) {
  return `${data.contactFirstName} ${data.contactLastName}`.trim();
}

export function intakeReasonSummary(data: IntakeData) {
  return [
    data.serviceType,
    data.modality,
    data.reason,
    `Disposición a pagar: ${data.willingPay || "—"}`,
    `Riesgo 3 meses: ${data.riskLast3Months || "—"}`,
  ]
    .filter(Boolean)
    .join(" · ");
}
