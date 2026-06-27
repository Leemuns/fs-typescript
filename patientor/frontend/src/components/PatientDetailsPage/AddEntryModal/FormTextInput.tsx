import { TextField } from "@mui/material";

interface FormTextInputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}

const FormTextInput = ({
  label,
  value,
  setValue,
  type = "text",
}: FormTextInputProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={type}
      slotProps={type === "date" ? { inputLabel: { shrink: true } } : undefined}
      variant="outlined"
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
    />
  );
};

export default FormTextInput;
