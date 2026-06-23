export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartEntry extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartEntry {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartEntry {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;
