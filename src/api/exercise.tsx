import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

import supabase from "supabase/supabaseClient";
import { Exercise, ExerciseCategory } from "types";

import { getLvlReached, getTopLevelsReached } from "./helpers";

const getExerciseLogsByCategory = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("id, created_at, reps, exercise!inner(id, category, name, step)")
    .eq("exercise.category", queryKey[1])
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

const getExerciseLogsPerDay = async () => {
  const { data, error } = await supabase.rpc("exercises_per_day");

  if (error) throw new Error(error.message);

  return data;
};

const getProgressTable = async () => {
  const { data, error } = await supabase.rpc("progress_table");

  if (error) throw new Error(error.message);

  return getTopLevelsReached(data);
};

const insertLog = async (exerciseLog: {
  reps: Array<number>;
  exercise: Exercise;
}) => {
  const levels = [
    exerciseLog.exercise.lvl1,
    exerciseLog.exercise.lvl2,
    exerciseLog.exercise.lvl3,
  ];

  const newRow = {
    reps: exerciseLog.reps,
    exercise: exerciseLog.exercise.id,
    lvl_reached: getLvlReached(exerciseLog.reps, levels),
  };

  const { data, error } = await supabase
    .from("workout_logs")
    .insert([newRow])
    .select("id, created_at, reps, exercise!inner(id, category, name, step)");

  if (error) throw new Error(error.message);

  return data;
};

const useFetchExericeLogs = (category: ExerciseCategory) =>
  useQuery(["exercise-logs", category], getExerciseLogsByCategory);

const useFetchProgressTable = () =>
  useQuery(["progress-table"], getProgressTable);

const useFetchExerciseLogsPerDay = () =>
  useQuery(["exercise-logs"], getExerciseLogsPerDay);

const useAddExerciseLog = () => {
  const queryClient = useQueryClient();

  return useMutation(insertLog, {
    onSuccess: () => {
      queryClient.invalidateQueries("exercise-logs");
    },
  });
};

const exerciseApi = {
  useAddExerciseLog,
  useFetchExericeLogs,
  useFetchExerciseLogsPerDay,
  useFetchProgressTable,
};

export default exerciseApi;
