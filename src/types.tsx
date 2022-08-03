enum ExerciseCategory {
  Pushups = "Pushups",
  LegRaises = "LegRaises",
  Squats = "Squats",
  Pullups = "Pullups",
  Handstands = "Handstands",
  Bridges = "Bridges",
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

export interface WorkoutPart {
  id: number;
  category: ExerciseCategory;
  exercises: Exercise[];
}
