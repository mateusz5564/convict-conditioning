import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkoutParts } from "../../context/WorkoutPart/WorkoutPart";
import exerciseService from "../../services/exercise";
import { Exercise, ExerciseLog } from "../../types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Rep {
  value: number;
  error: Boolean;
}

export default function AddExerciseLog({ setLogs }: { setLogs: Function }) {
  const [exercise, setExercise] = useState<number | "">("");
  const [exerciseError, setExerciseError] = useState<string>("");
  const [reps, setReps] = useState<Array<Rep>>([{ value: 0, error: false }]);
  const { category } = useParams();
  const context = useWorkoutParts();

  const exercises = context?.workoutParts.find(
    workoutPart => workoutPart.category === category
  )?.exercises;

  const handleExerciseChange = (e: SelectChangeEvent<number>) => {
    setExercise(e.target.value as number);
  };

  const handleRepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(reps => {
      const newReps = [...reps];
      newReps[parseInt(e.target.id)].value = parseInt(e.target.value);
      return newReps;
    });
  };

  const handleAddSet = () => {
    setReps(reps => reps.concat([{ value: 0, error: false }]));
  };

  const handleAddExerciseLog = () => {
    let hasError = false;

    if (isNaN(exercise as number) || !exercise) {
      setExerciseError("invalid exercise id");
      hasError = true;
    } else {
      setExerciseError("");
    }

    const getRepsErrors = () =>
      reps.map(rep => {
        if (isNaN(rep.value) === true || rep.value <= 0) {
          rep.error = true;
          hasError = true;
        } else {
          rep.error = false;
        }

        return rep;
      });

    setReps(getRepsErrors());

    const insertLog = async () => {
      const data = await exerciseService.insertLog({
        reps: reps.map(rep => rep.value),
        exercise: exercise as number,
      });
      if (data) {
        setExercise("");
        setReps([{ value: 0, error: false }]);
        setLogs((logs: ExerciseLog[]) => data.concat(logs));
      }
    };

    if (!hasError) {
      insertLog();
    }
  };

  const getLabelForReps = (exercises: Exercise[] | undefined, exerciseId: number | "") => {
    const exercise = exercises?.find(exercise => exercise.id === exerciseId);
    if (!exercise) {
      return "reps";
    } else {
      return exercise.lvl1.includes("x") ? "reps" : "secs";
    }
  };

  return (
    <Paper sx={{ padding: 1, mb: 1 }}>
      <Stack flexDirection="row" flexWrap="wrap">
        <FormControl sx={{ width: "8.75rem", mr: "0.5rem", mb: "0.5rem" }} size="small">
          <InputLabel id="exercise-select-label">Exercise</InputLabel>
          <Select
            labelId="exercise-select-label"
            label="Exercise"
            id="exercise-select"
            value={exercise}
            error={exerciseError ? true : false}
            onChange={handleExerciseChange}
          >
            {exercises?.map(exercise => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.name} - {exercise.step}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {reps.map((rep, i) => (
          <TextField
            key={i}
            id={i.toString()}
            type="number"
            label={getLabelForReps(exercises, exercise)}
            value={rep.value}
            error={rep.error ? true : false}
            onChange={handleRepChange}
            size="small"
            sx={{ maxWidth: "4.125rem", mr: "0.5rem", mb: "0.5rem" }}
          />
        ))}

        <Button
          onClick={handleAddSet}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mb: "0.5rem" }}
        >
          Set
        </Button>
      </Stack>

      <Stack flexDirection="row" justifyContent="flex-end">
        <Button onClick={handleAddExerciseLog} variant="contained" fullWidth={false}>
          Add
        </Button>
      </Stack>
    </Paper>
  );
}
