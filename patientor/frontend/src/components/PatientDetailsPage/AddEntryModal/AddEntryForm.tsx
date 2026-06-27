import axios from "axios";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import z from "zod";

import FormTextInput from "./FormTextInput";
import {
  healthCheckRatingSchema,
  EntryType,
  type NewEntry,
  HealthCheckRating,
  Diagnosis,
} from "../../../types";

const todayString = () => {
  return new Date().toLocaleDateString("en-CA");
};

interface Options {
  value: string;
  label: string;
}

const entryTypeOptions: Options[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const healthCheckRatingOptions: Options[] = Object.values(
  HealthCheckRating,
).map((v) => ({
  value: v.toString(),
  label: v.toString(),
}));

interface NewEntryFormProps {
  onSubmit: (newEntry: NewEntry) => Promise<void>;
  onCancel: () => void;
  displayError: (message: string) => void;
  diagnoses: Diagnosis[];
}

const NewEntryForm = ({
  onSubmit,
  onCancel,
  displayError,
  diagnoses,
}: NewEntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [date, setDate] = useState(todayString());
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const onEntryTypeChange = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    if (typeof e.target.value === "string") {
      const value = e.target.value;
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value,
      );
      if (entryType) {
        setEntryType(entryType);
      }
    }
  };

  const onHealthCheckRatingChange = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    if (typeof e.target.value === "string") {
      const value = e.target.value;
      const healthCheckRating = Object.values(HealthCheckRating)
        .find((e) => e.toString() === value)
        ?.toString();
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  const onDiagnosisCodesChange = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let newEntry: NewEntry;

      switch (entryType) {
        case "HealthCheck": {
          newEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            healthCheckRating: healthCheckRatingSchema.parse(
              Number(healthCheckRating),
            ),
          };
          break;
        }
        case "Hospital": {
          newEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;
        }
        case "OccupationalHealthcare": {
          newEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            employerName: employerName,
            sickLeave: {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd,
            },
          };
          break;
        }
      }

      await onSubmit(newEntry);

      setDate(todayString());
      setDescription("");
      setSpecialist("");
      setHealthCheckRating("0");
      setDischargeDate("");
      setDischargeCriteria("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        if (err.issues[0].code === "invalid_union") {
          console.error("Invalid healthCheckRating score (only 0-3 accepted)");
          displayError("healthCheckRating: Invalid Input");
        } else {
          console.error(err.message);
        }
      } else if (err instanceof axios.AxiosError) {
        if (err.response?.data.error[0].code === "too_small") {
          console.error("Fields except Diagnosis Codes cannot be empty");
          displayError("Mandatory field left empty");
        } else {
          console.log(err.response);
          displayError(err.response?.data.error[0].message);
        }
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl fullWidth sx={{ mb: "4px" }}>
        <InputLabel>Entry type</InputLabel>
        <Select
          label="Entry type"
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormTextInput label="Date" value={date} setValue={setDate} type="date" />
      <FormTextInput
        label="Description"
        value={description}
        setValue={setDescription}
      />
      <FormTextInput
        label="Specialist"
        value={specialist}
        setValue={setSpecialist}
      />
      {entryType === EntryType.HealthCheck && (
        <FormControl
          size="small"
          margin="dense"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderStyle: "dotted",
              },
            },
          }}
        >
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            label="Health Check Rating"
            value={healthCheckRating}
            onChange={onHealthCheckRatingChange}
          >
            {healthCheckRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {entryType === EntryType.Hospital && (
        <FormTextInput
          label="Discharge date"
          value={dischargeDate}
          setValue={setDischargeDate}
        />
      )}
      {entryType === EntryType.Hospital && (
        <FormTextInput
          label="Discharge criteria"
          value={dischargeCriteria}
          setValue={setDischargeCriteria}
        />
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <FormTextInput
          label="Employer"
          value={employerName}
          setValue={setEmployerName}
        />
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <FormTextInput
          label="Sick leave start date"
          value={sickLeaveStart}
          setValue={setSickLeaveStart}
        />
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <FormTextInput
          label="Sick leave end date"
          value={sickLeaveEnd}
          setValue={setSickLeaveEnd}
        />
      )}
      <FormControl
        size="small"
        margin="dense"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderStyle: "dotted",
            },
          },
        }}
      >
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {`${d.code} - ${d.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Grid size="auto">
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid size="auto">
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewEntryForm;

// yea there's no way I'm refactoring all this now...
