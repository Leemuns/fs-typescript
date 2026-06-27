import { Typography, Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import type { HospitalEntry, Diagnosis } from "../../types";

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <Box sx={{ p: "12px", mt: "4px", border: "2px solid grey" }}>
      <Typography variant="body1">
        {entry.date}
        <MedicalServicesIcon
          sx={{
            ml: "8px",
            verticalAlign: "text-bottom",
          }}
        />
      </Typography>
      <Typography variant="body1" sx={{ fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((c: string) => (
            <li key={c}>
              {c} {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.discharge && (
        <Typography variant="body1">
          Discharged on {entry.discharge.date}, for criteria "
          {entry.discharge.criteria}".
        </Typography>
      )}
      <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntry;
