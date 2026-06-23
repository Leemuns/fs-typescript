import { type NonSensitiveDiaryEntry } from "../types";

interface DiaryProps {
  diary: NonSensitiveDiaryEntry;
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <p key={diary.id}>
      <strong>{diary.date}</strong>
      <br />
      {diary.visibility}
      <br />
      {diary.weather}
    </p>
  );
};

export default Diary;
