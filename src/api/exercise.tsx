import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

import supabase from "supabase/supabaseClient";
import { ExerciseCategory } from "types";

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

const insertLog = async (row: { reps: Array<number>; exercise: number }) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .insert([row])
    .select("id, created_at, reps, exercise!inner(id, category, name, step)");

  if (error) throw new Error(error.message);

  return data;
};

const useFetchExericeLogs = (category: ExerciseCategory) =>
  useQuery(["exercise-logs", category], getExerciseLogsByCategory);

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
};

export default exerciseApi;
