import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients.ts";
import type {
  NewPatient,
  NonSensitivePatient,
  Patient,
  NewEntry,
  Entry,
} from "../types.ts";

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

const create = (newPatient: NewPatient): Patient => {
  const createdPatient: Patient = {
    ...newPatient,
    id: uuid(),
    entries: [],
  };

  patients = patients.concat(createdPatient);
  return createdPatient;
};

const createEntry = (patientId: string, newEntry: NewEntry) => {
  const matchedPatient = patients.find((p) => p.id === patientId);
  if (!matchedPatient) return null;

  const createdEntry: Entry = {
    id: uuid(),
    ...newEntry,
  };

  const updatedPatient: Patient = {
    ...matchedPatient,
    entries: matchedPatient.entries.concat(createdEntry),
  };

  patients = patients.map((p) =>
    p.id === updatedPatient.id ? updatedPatient : p,
  );

  return updatedPatient;
};

export default {
  getAll,
  getAllNonSensitive,
  getOne,
  create,
  createEntry,
};
