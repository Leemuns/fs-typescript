import { type NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Failed to fetch diaries");
  return await res.json();
};

export const create = async (newDiary: NewDiaryEntry) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDiary),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error[0].message);
  }

  return await res.json();
};

export default {
  getAll,
  create,
};
