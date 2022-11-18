import { Exercise } from "types";

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

// eslint-disable-next-line import/prefer-default-export
export { getLabelForReps };
