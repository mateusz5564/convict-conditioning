export enum ExerciseCategory {
  Pushups = "pushups",
  LegRaises = "leg-raises",
  Squats = "squats",
  Pullups = "pullups",
  Handstands = "handstands",
  Bridges = "bridges",
}

export interface Exercise {
  id: number;
  workout_part_id: number;
  category: ExerciseCategory;
  name: string;
  description: string;
  step: number;
  lvl1: string;
  lvl2: string;
  lvl3: string;
  yt_video_id: string;
}

export interface ExerciseLog {
  id: number;
  user_id: string;
  created_at: string;
  exercise: {
    id: string;
    category: string;
    name: string;
    step: number;
  };
  reps: number[];
}

export interface ExerciseLogPerDay {
  day: string;
  value: number;
}

export interface LatestExerciseLogLastMonth {
  id: number;
  created_at: string;
  reps: number[];
  exercise: number;
  category: ExerciseCategory;
  name: string;
  step: number;
}

export interface ExerciseProgress {
  exercise_category: ExerciseCategory;
  exercise_step: number;
  exercise_lvl_reached: number;
}

export interface TopExerciseProgress {
  [key: string]: ExerciseProgress;
}

export interface WorkoutPart {
  id: number;
  category: ExerciseCategory;
  exercises: Exercise[];
}

export type ChildrenProp = {
  children: React.ReactNode;
};
