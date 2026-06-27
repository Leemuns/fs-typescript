import express, { type Response, type Request } from "express";

import patientsService from "../services/patientsService.ts";
import type {
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import { errorMiddleware, newPatientParser, entryParser } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getAllNonSensitive();
  res.send(data);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const data = patientsService.getOne(req.params.id);
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const createdPatient = patientsService.create(req.body);
    res.json(createdPatient);
  },
);

type PatientIdParams = { id: string };
router.post(
  "/:id/entries",
  entryParser,
  (
    req: Request<PatientIdParams, unknown, NewEntry>,
    res: Response<Patient>,
  ) => {
    const { id } = req.params;
    const updatedPatient = patientsService.createEntry(id, req.body);
    if (!updatedPatient) return res.status(400).end();
    return res.json(updatedPatient);
  },
);

router.use(errorMiddleware);

export default router;
