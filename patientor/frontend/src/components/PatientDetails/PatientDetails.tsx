import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import type { Entry, Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";

interface PatientDetailsProps {
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ diagnoses }: PatientDetailsProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const getPatient = async () => {
      if (!id) return;
      const patientData = await patientService.getOne(id);
      setPatient(patientData);
    };
    void getPatient();
  }, [id]);

  if (!patient) return null;

  const genderSymbol = () => {
    const iconSx = {
      marginLeft: "8px",
      verticalAlign: "text-bottom",
    };

    switch (patient.gender) {
      case "female":
        return <FemaleIcon sx={iconSx} fontSize="large" />;
      case "male":
        return <MaleIcon sx={iconSx} fontSize="large" />;
      case "other":
        return <TransgenderIcon sx={iconSx} fontSize="large" />;
      default:
        const exhaustiveCheck: never = patient.gender;
        return exhaustiveCheck;
    }
  };

  const renderEntries = () => {
    return (
      <>
        <Typography variant="h5" sx={{ pt: "16px" }}>
          entries
        </Typography>
        {patient.entries.map((e: Entry) => renderEntry(e))}
      </>
    );
  };

  const renderEntry = (e: Entry) => {
    return (
      <Typography variant="body1">
        {e.date} <em>{e.description}</em>
        {e.diagnosisCodes && (
          <ul>
            {e.diagnosisCodes.map((c: string) => (
              <li>
                {c} {diagnoses.find((d) => d.code === c)?.name}
              </li>
            ))}
          </ul>
        )}
      </Typography>
    );
  };

  return (
    <div>
      <div>
        <Typography variant="h4">
          {patient.name}
          {genderSymbol()}
        </Typography>

        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
        <Typography variant="body1">
          date of birth: {patient.dateOfBirth}
        </Typography>

        {patient.entries.length > 0 && renderEntries()}
      </div>
    </div>
  );
};

export default PatientDetails;
