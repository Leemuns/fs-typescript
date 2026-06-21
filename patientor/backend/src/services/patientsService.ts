import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients.ts";
import type {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types.ts";

let patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};

const addEntry = (newEntry: NewPatientEntry) => {
  const newPatient: PatientEntry = {
    ...newEntry,
    id: uuid(),
  };

  patients = patients.concat(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
