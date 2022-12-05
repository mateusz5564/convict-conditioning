/* eslint-disable @typescript-eslint/no-shadow */
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, MenuItem, Paper, Stack } from "@mui/material";
import exerciseApi from "api/exercise";
import workoutPartApi from "api/workoutPart";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import Select from "components/Forms/Select";
import TextField from "components/Forms/TextField";
import { Exercise } from "types";

import { getLabelForReps } from "../../../helpers";

type Inputs = {
  exerciseId: number | "";
  reps: { value: number }[];
};

const AddExerciseLog = () => {
  const { category } = useParams();
  const {
    data: workoutParts,
    isLoading,
    isError,
  } = workoutPartApi.useFetchWorkoutParts();
  const mutation = exerciseApi.useAddExerciseLog();

  const defaultFormValues: Inputs = { exerciseId: "", reps: [{ value: 0 }] };
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<Inputs>({ defaultValues: defaultFormValues });
  const {
    fields: reps,
    append: appendRep,
    remove: removeRep,
  } = useFieldArray({
    name: "reps",
    control,
  });

  const exercise = watch("exerciseId");

  const exercises: Exercise[] = workoutParts?.find(
    (workoutPart) => workoutPart.category === category,
  )?.exercises;

  const onAddSet = () => {
    appendRep({ value: 0 });
  };

  const onRemoveSet = () => {
    if (reps.length <= 1) return;
    removeRep(reps.length - 1);
  };

  const onSubmitExerciseLog: SubmitHandler<Inputs> = (data) => {
    const exercise = exercises.find(
      (exercise) => exercise.id === data.exerciseId,
    );
    mutation.mutate({
      reps: data.reps.map((rep) => rep.value),
      exercise: exercise as Exercise,
    });
    reset(defaultFormValues);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmitExerciseLog)}
      sx={{ padding: 2, mb: 1 }}
    >
      <Stack flexDirection="row" flexWrap="wrap">
        <Select
          name="exerciseId"
          control={control}
          rules={{ required: true }}
          sx={{ width: "8.75rem", mr: "0.5rem", mb: "0.5rem" }}
        >
          {exercises?.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.id}>
              {exercise.name} - {exercise.step}
            </MenuItem>
          ))}
        </Select>

        {reps.map((rep, i) => (
          <TextField
            name={`reps.${i}.value`}
            key={rep.id}
            control={control}
            rules={{
              required: true,
              min: 1,
            }}
            size="small"
            type="number"
            label={getLabelForReps(exercises, exercise)}
            error={!!errors.reps?.[i]}
            sx={{ maxWidth: "4.125rem", mr: "0.5rem", mb: "0.5rem" }}
          />
        ))}
        <Button
          onClick={onAddSet}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem" }}
        >
          Set
        </Button>
        {reps.length > 1 && (
          <Button
            onClick={onRemoveSet}
            color="error"
            variant="outlined"
            startIcon={<RemoveIcon />}
            sx={{ mb: "0.5rem" }}
          >
            Set
          </Button>
        )}
      </Stack>

      <Stack flexDirection="row" justifyContent="flex-end">
        <Button type="submit" variant="contained" fullWidth={false}>
          Add
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddExerciseLog;
