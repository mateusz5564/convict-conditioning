import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../supabase/supabaseClient";
import { ExerciseCategory } from "../types";

const useFetchExericeLogs = (category: ExerciseCategory) =>
  useQuery(["exercise-logs", category], getExerciseLogsByCategory);

const useAddExerciseLog = () => {
  const queryClient = useQueryClient();

  return useMutation(insertLog, {
    onSuccess: () => {
      queryClient.invalidateQueries("exercise-logs");
    },
  });
};

const getExerciseLogsByCategory = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("id, created_at, reps, exercise!inner(category, name, step)")
    .eq("exercise.category", queryKey[1])
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

const insertLog = async (row: { reps: Array<number>; exercise: number }) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .insert([row])
    .select("id, created_at, reps, exercise!inner(category, name, step)");

  if (error) throw new Error(error.message);

  return data;
};

const exerciseApi = {
  useAddExerciseLog,
  useFetchExericeLogs,
};

export default exerciseApi;
