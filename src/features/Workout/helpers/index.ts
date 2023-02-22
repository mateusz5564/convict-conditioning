import { Exercise, ExerciseProgress } from "types";

const getLabelForReps = (
  exercises: Exercise[] | undefined,
  exerciseId: number | "",
) => {
  const exerciseToLabel = exercises?.find(
    (exercise) => exercise.id === exerciseId,
  );
  if (!exerciseToLabel) {
    return "reps";
  }
  return exerciseToLabel?.lvl1.includes("x") ? "reps" : "secs";
};

const getNextLevelGoal = (
  categoryExercises: Exercise[],
  categoryProgress: ExerciseProgress,
) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { exercise_step, exercise_lvl_reached } = categoryProgress;
  let nextStepToReach = exercise_step;
  let nextLvlToReach = exercise_lvl_reached;

  if (exercise_step === 10 && exercise_lvl_reached === 3) {
    return "Max lvl reached :)!!";
  }

  if (exercise_lvl_reached === 3) {
    nextStepToReach += 1;
    nextLvlToReach = 1;
  } else {
    nextLvlToReach += 1;
  }

  const exercise = categoryExercises.find(
    (item) => item.step === nextStepToReach,
  );

  const lvlKey = `lvl${nextLvlToReach}` as keyof Exercise;

  return { name: exercise?.name, lvl: exercise?.[lvlKey] };
};

export { getLabelForReps, getNextLevelGoal };
