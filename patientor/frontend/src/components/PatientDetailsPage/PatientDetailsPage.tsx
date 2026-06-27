import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Entry, NewEntry, Patient, Diagnosis, Gender } from "../../types";
import patientService from "../../services/patients";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import AddEntryModal from "./AddEntryModal/AddEntryModal";

let notificationTimeout: number;

interface PatientDetailsProps {
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ diagnoses }: PatientDetailsProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams() as { id: string };

  useEffect(() => {
    const getPatient = async () => {
      const patientData = await patientService.getOne(id);
      setPatient(patientData);
    };
    void getPatient();
  }, [id]);

  if (!patient) return null;

  const displayError = (message: string) => {
    setError(message);
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => setError(undefined), 3000);
  };

  const submitEntry = async (newEntry: NewEntry) => {
    const updatedPatient = await patientService.createEntry(id, newEntry);
    if (updatedPatient) setPatient(updatedPatient);
  };

  return (
    <div>
      <div>
        <Typography variant="h4">
          {patient.name}
          {genderSymbol(patient.gender)}
        </Typography>

        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
        <Typography variant="body1">
          date of birth: {patient.dateOfBirth}
        </Typography>

        <Typography variant="h5" sx={{ pt: "16px" }}>
          entries
        </Typography>
        {renderEntries(patient.entries, diagnoses)}

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitEntry}
          error={error}
          onClose={closeModal}
          displayError={displayError}
          diagnoses={diagnoses}
        />
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ mt: "8px" }}
        >
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default PatientDetails;

const genderSymbol = (gender: Gender) => {
  const iconSx = {
    marginLeft: "8px",
    verticalAlign: "text-bottom",
  };

  switch (gender) {
    case Gender.Female:
      return <FemaleIcon sx={iconSx} fontSize="large" />;
    case Gender.Male:
      return <MaleIcon sx={iconSx} fontSize="large" />;
    case Gender.Other:
      return <TransgenderIcon sx={iconSx} fontSize="large" />;
    default:
      const exhaustiveCheck: never = gender;
      return exhaustiveCheck;
  }
};

const renderEntries = (entries: Entry[], diagnoses: Diagnosis[]) => {
  if (entries.length === 0) {
    return <Typography variant="body1">No entries yet</Typography>;
  }

  return entries.map((entry: Entry) => renderEntry(entry, diagnoses));
};

const renderEntry = (entry: Entry, diagnoses: Diagnosis[]) => {
  const entryType = entry.type;
  switch (entryType) {
    case "Hospital": {
      return (
        <HospitalEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
      );
    }
    case "OccupationalHealthcare": {
      return (
        <OccupationalEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
      );
    }
    case "HealthCheck": {
      return (
        <HealthCheckEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
      );
    }
    default: {
      const exhaustiveCheck: never = entryType;
      return exhaustiveCheck;
    }
  }
};
