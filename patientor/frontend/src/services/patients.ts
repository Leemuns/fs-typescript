import axios from "axios";
import { NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);
  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, object);
  return data;
};

const createEntry = async (patientId: string, object: NewEntry) => {
  const { data } = await axios.post<Patient>(
    `${baseUrl}/${patientId}/entries`,
    object,
  );
  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry,
};
