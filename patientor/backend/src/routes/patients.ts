import express, { type Response, type Request } from "express";

import patientsService from "../services/patientsService.ts";
import {
  type NewPatient,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";
import { errorMiddleware, newPatientParser } from "../utils.ts";

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

router.use(errorMiddleware);

export default router;
