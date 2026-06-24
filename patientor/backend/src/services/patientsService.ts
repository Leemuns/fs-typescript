import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";

let patients: Patient[] = patientsData;

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};

const getOne = (patientId: string): Patient | undefined => {
  return patients.find((p) => p.id === patientId);
};

const create = (newEntry: NewPatient) => {
  const newPatient: Patient = {
    ...newEntry,
    id: uuid(),
    entries: [],
  };

  patients = patients.concat(newPatient);
  return newPatient;
};

export default {
  getAll,
  getAllNonSensitive,
  getOne,
  create,
};
