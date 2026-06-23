import { useState, useEffect } from "react";

import { type NewDiaryEntry, type NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaries";
import NewDiaryForm from "./components/NewDiaryForm";
import DiaryList from "./components/DiaryList";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>("");
  let notificationTimeout: number | undefined = 0;

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaryData = await diaryService.getAll();
      setDiaries(diaryData);
    };
    fetchDiaries();
  }, []);

  const addDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const createdDiary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(createdDiary));
    } catch (err) {
      if (err instanceof Error) {
        displayNotification(`Diary creation error. ${err.message}`);
      }
    }
  };

  const displayNotification = (message: string) => {
    setNotification(message);
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div>
      <Notification notification={notification} />
      <NewDiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
