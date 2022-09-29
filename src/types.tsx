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
}

export interface ExerciseLog {
  id: number;
  user_id: string;
  created_at: Date;
  exercise: {
    category: string;
    name: string;
    step: number;
  };
  reps: number[];
}

export interface WorkoutPart {
  id: number;
  category: ExerciseCategory;
  exercises: Exercise[];
}
