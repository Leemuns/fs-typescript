import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const renderDetails = () => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <em>{part.description}</em>
          </div>
        );
      case "group":
        return <div>project exercises {part.groupProjectCount}</div>;
      case "background":
        return (
          <>
            <div>
              <em>{part.description}</em>
            </div>
            <div>{part.backgroundMaterial}</div>
          </>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <p>
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
      </div>
      {renderDetails()}
    </p>
  );
};

export default Part;
