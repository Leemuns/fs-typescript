import type { Dispatch, SetStateAction } from "react";

interface FormInputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FormInput = ({ label, value, setValue }: FormInputProps) => {
  return (
    <div>
      <label>
        {label}
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </div>
  );
};

export default FormInput;
