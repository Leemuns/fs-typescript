import express, { type Response, type Request } from "express";

import patientsService from "../services/patientsService.ts";
import {
  type NewPatientEntry,
  type NonSensitivePatientEntry,
  type PatientEntry,
} from "../types.ts";
import { errorMiddleware, newPatientParser } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedEntry = patientsService.addEntry(req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
