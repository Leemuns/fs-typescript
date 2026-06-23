import { useState } from "react";

import { type NewDiaryEntry } from "../types";
import FormInput from "./FormInput";

const today = new Date().toLocaleDateString("en-CA");

interface newDiaryFormProps {
  addDiary: (newDiary: NewDiaryEntry) => Promise<void>;
}

const NewDiaryForm = ({ addDiary }: newDiaryFormProps) => {
  const [date, setDate] = useState<string>(today);
  console.log(date);
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

      <div>
        <label>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <span style={{ marginRight: "14px" }}>visibility</span>
        <label>
          great
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
            defaultChecked
          />
        </label>
        <label>
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
        </label>
        <label>
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
        </label>
        <label>
          poor
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
        </label>
      </div>

      <div>
        <span style={{ marginRight: "14px" }}>weather</span>
        <label>
          sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("sunny")}
            defaultChecked
          />
        </label>
        <label>
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("rainy")}
          />
        </label>
        <label>
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("cloudy")}
          />
        </label>
        <label>
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("stormy")}
          />
        </label>
        <label>
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("windy")}
          />
        </label>
      </div>

      <FormInput label="comment" value={comment} setValue={setComment} />
      <button type="submit">add</button>
    </form>
  );
};

export default NewDiaryForm;
