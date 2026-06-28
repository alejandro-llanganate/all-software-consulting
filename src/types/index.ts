export type AreaSlug =
  | "ansiedad-estres"
  | "nna-infancia"
  | "neuropsicologia"
  | "bienestar-laboral"
  | "trauma-duelo"
  | "pareja-familia"
  | "mujeres"
  | "comunitaria";

export type AppointmentStatus = "pendiente" | "completada" | "cancelada";

export type PaymentMethod = "transferencia";

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Professional {
  id: string;
  slug: string;
  name: string;
  title: string;
  areas: AreaSlug[];
  specializations: string[];
  image: string;
  gallery: string[];
  bio: string;
  shortBio: string;
  approach: string;
  sessionPrice: number;
  featured?: boolean;
  education: Education[];
  certifications: Certification[];
}

export interface Appointment {
  id: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  reason: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientId: string;
  paymentMethod: PaymentMethod;
  paymentReference: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface DayAvailability {
  date: string;
  slots: string[];
}

export interface ProfessionalAvailability {
  professionalId: string;
  days: DayAvailability[];
}
