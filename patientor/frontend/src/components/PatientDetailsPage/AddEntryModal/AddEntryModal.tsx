import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { Diagnosis, NewEntry } from "../../../types";
import Notification from "./Notification";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => Promise<void>;
  error?: string;
  displayError: (message: string) => void;
  diagnoses: Diagnosis[];
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  displayError,
  diagnoses,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New HealthCheck Entry</DialogTitle>
    <Divider />
    <DialogContent>
      <Notification notification={error} />
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        displayError={displayError}
        diagnoses={diagnoses}
      />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
