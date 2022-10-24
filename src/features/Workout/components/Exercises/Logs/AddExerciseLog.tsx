import { useParams } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button, MenuItem, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import workoutPartApi from "../../../../../api/workoutPart";
import exerciseApi from "../../../../../api/exercise";
import LoadingSpinner from "../../../../../components/CircularProgress/CircularProgress";
import TextField from "../../../../../components/Forms/TextField";
import Select from "../../../../../components/Forms/Select";
import { Exercise } from "../../../../../types";

type Inputs = {
  exerciseId: number | "";
  reps: { value: number }[];
};

export default function AddExerciseLog() {
  const { category } = useParams();
  const { data: workoutParts, isLoading, isError } = workoutPartApi.useFetchWorkoutParts();
  const mutation = exerciseApi.useAddExerciseLog();
  const defaultFormValues: Inputs = { exerciseId: "", reps: [{ value: 0 }] };

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<Inputs>({ defaultValues: defaultFormValues });

  const { fields: reps, append: appendRep } = useFieldArray({ name: "reps", control });

  const exercise = getValues("exerciseId");

  const getLabelForReps = (exercises: Exercise[] | undefined, exerciseId: number | "") => {
    const exercise = exercises?.find(exercise => exercise.id === exerciseId);
    if (!exercise) {
      return "reps";
    } else {
      return exercise.lvl1.includes("x") ? "reps" : "secs";
    }
  };

  const onAddSet = () => {
    appendRep({ value: 0 });
  };

  const onSubmitExerciseLog: SubmitHandler<Inputs> = (data, e) => {
    mutation.mutate({
      reps: data.reps.map(rep => rep.value),
      exercise: data.exerciseId as number,
    });
    reset(defaultFormValues);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  let exercises: Exercise[] = workoutParts?.find(
    workoutPart => workoutPart.category === category
  )?.exercises;

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmitExerciseLog)} sx={{ padding: 1, mb: 1 }}>
      <Stack flexDirection="row" flexWrap="wrap">
        <Select
          name="exerciseId"
          control={control}
          rules={{ required: true }}
          sx={{ width: "8.75rem", mr: "0.5rem", mb: "0.5rem" }}
        >
          {exercises?.map(exercise => (
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
            error={errors.reps?.[i] ? true : false}
            sx={{ maxWidth: "4.125rem", mr: "0.5rem", mb: "0.5rem" }}
          />
        ))}

        <Button onClick={onAddSet} variant="outlined" startIcon={<AddIcon />} sx={{ mb: "0.5rem" }}>
          Set
        </Button>
      </Stack>

      <Stack flexDirection="row" justifyContent="flex-end">
        <Button type="submit" variant="contained" fullWidth={false}>
          Add
        </Button>
      </Stack>
    </Paper>
  );
}
