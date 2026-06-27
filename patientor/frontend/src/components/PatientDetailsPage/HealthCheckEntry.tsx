import { Typography, Box } from "@mui/material";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import FavoriteIcon from "@mui/icons-material/Favorite";

import type {
  HealthCheckEntry,
  Diagnosis,
  HealthCheckRating,
} from "../../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <Box sx={{ p: "12px", mt: "4px", border: "2px solid grey" }}>
      <Typography variant="body1">
        {entry.date}
        <TroubleshootIcon
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
      {renderHealthCheckRating(entry.healthCheckRating)}
      <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;

const renderHealthCheckRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: "green " }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "#E9DB5D" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "orange" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "red" }} />;
    default:
      const exhaustiveCheck: never = rating;
      return exhaustiveCheck;
  }
};
