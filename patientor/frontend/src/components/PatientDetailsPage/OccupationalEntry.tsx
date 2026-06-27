import { Typography, Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";

interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = ({ entry, diagnoses }: OccupationalEntryProps) => {
  return (
    <Box sx={{ p: "12px", mt: "4px", border: "2px solid grey" }}>
      <Typography variant="body1">
        {entry.date}
        <WorkIcon
          sx={{
            ml: "8px",
            mr: "8px",
            verticalAlign: "text-bottom",
          }}
        />
        {entry.employerName}
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
      {entry.sickLeave && (
        <Typography variant="body1">
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalEntry;
