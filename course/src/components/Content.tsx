import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((p) => (
        <Part part={p}></Part>
      ))}
    </div>
  );
};

export default Content;
