import { z } from "zod";

// sub-types

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

// entries

const newBaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.iso.date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(), // assume its always correct from client
});

export const newHospitalEntrySchema = newBaseEntrySchema.extend({
  discharge: z
    .object({
      date: z.iso.date(),
      criteria: z.string(),
    })
    .optional(),
  type: z.literal("Hospital"),
});

export const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
  type: z.literal("OccupationalHealthcare"),
});

export const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
  type: z.literal("HealthCheck"),
});

export const newEntrySchema = z.union([
  newHospitalEntrySchema,
  newOccupationalHealthcareEntrySchema,
  newHealthCheckEntrySchema,
]);
export type NewEntry = z.infer<typeof newEntrySchema>;

// type WithId<T> = T & { id: string };
// export type Entry = WithId<NewEntry>;
// export interface Entry extends NewEntry {
//   id: string
// }

type NewHospitalEntry = z.infer<typeof newHospitalEntrySchema>;
interface HospitalEntry extends NewHospitalEntry {
  id: string;
}

type NewOccupationalHealthcareEntry = z.infer<
  typeof newOccupationalHealthcareEntrySchema
>;
interface OccupationalHealthcareEntry extends NewOccupationalHealthcareEntry {
  id: string;
}

type NewHealthCheckEntry = z.infer<typeof newHealthCheckEntrySchema>;
interface HealthCheckEntry extends NewHealthCheckEntry {
  id: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// patients

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
