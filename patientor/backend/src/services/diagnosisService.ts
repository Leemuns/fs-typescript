import diagnosesData from "../../data/diagnoses.ts";
import type { DiagnosisEntry } from "../types.ts";

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
