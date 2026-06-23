import { type ReactNode } from "react";

import type { NonSensitiveDiaryEntry } from "../types";
import Diary from "./Diary";

interface DiariesProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = ({ diaries }: DiariesProps) => {
  const renderDiaries = (): ReactNode => {
    return diaries.map((d) => <Diary key={d.id} diary={d}></Diary>);
  };

  if (!diaries) {
    return null;
  }

  return (
    <div>
      <h2>Flight Diaries</h2>
      <div>{renderDiaries()}</div>
    </div>
  );
};

export default DiaryList;
