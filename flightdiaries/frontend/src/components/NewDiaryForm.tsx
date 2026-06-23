import { useState } from "react";

import { type NewDiaryEntry } from "../types";
import FormInput from "./FormInput";

interface newDiaryFormProps {
  addDiary: (newDiary: NewDiaryEntry) => Promise<void>;
}

const NewDiaryForm = ({ addDiary }: newDiaryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleAddDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addDiary({ date, weather, visibility, comment });

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={handleAddDiary}>
      <h2>Add Diary</h2>
      <FormInput label="date" value={date} setValue={setDate} />
      <FormInput
        label="visibility"
        value={visibility}
        setValue={setVisibility}
      />
      <FormInput label="weather" value={weather} setValue={setWeather} />
      <FormInput label="comment" value={comment} setValue={setComment} />
      <button type="submit">add</button>
    </form>
  );
};

export default NewDiaryForm;
