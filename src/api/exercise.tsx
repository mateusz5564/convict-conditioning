import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import supabase from "supabase/supabaseClient";
import {
  Exercise,
  ExerciseCategory,
  ExerciseLog,
  ExerciseLogPerDay,
  LatestExerciseLogLastMonth,
  TopExerciseProgress,
} from "types";

import { getLvlReached, getPagination, getTopLevelsReached } from "./helpers";

const getPaginatedExerciseLogsByCategory = async (
  category: ExerciseCategory,
  page: number,
  size: number,
) => {
  const { from, to } = getPagination(page, size);

  const { data, count, error } = await supabase
    .from("workout_logs")
    .select<string, ExerciseLog>(
      "id, created_at, reps, exercise!inner(id, category, name, step)",
      {
        count: "exact",
      },
    )
    .eq("exercise.category", category)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { count, data };
};

const getExerciseLogsPerDay = async (): Promise<ExerciseLogPerDay[]> => {
  const { data, error } = await supabase.rpc("exercises_per_day");

  if (error) throw new Error(error.message);

  return data;
};

const getLatestExerciseLogsLastMonth = async (
  category: ExerciseCategory,
): Promise<LatestExerciseLogLastMonth[]> => {
  const { data, error } = await supabase.rpc("get_logs_last_month", {
    log_category: category,
  });

  if (error) throw new Error(error.message);

  return data;
};

const getProgressTable = async (): Promise<TopExerciseProgress> => {
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
    .select<string, ExerciseLog>(
      "id, created_at, reps, exercise!inner(id, category, name, step)",
    );

  if (error) throw new Error(error.message);

  return data;
};

const deleteLog = async (id: string) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};

const useFetchPaginatedExerciseLogsByCategory = (
  category: ExerciseCategory,
  page: number,
  size: number,
) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["exercise-logs", category, page, size],
    () => getPaginatedExerciseLogsByCategory(category, page, size),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        queryClient.invalidateQueries("progress-table");
      },
    },
  );
};

const useFetchProgressTable = () =>
  useQuery(["progress-table"], getProgressTable);

const useFetchExerciseLogsPerDay = () =>
  useQuery(["exercise-logs"], getExerciseLogsPerDay);

const useFetchLatestExerciseLogsLastMonth = (category: ExerciseCategory) =>
  useQuery(["exercise-logs-last-month", category], () =>
    getLatestExerciseLogsLastMonth(category),
  );

const createExerciseLogMutation = (mutationFn: MutationFunction) => () => {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("exercise-logs");
      queryClient.invalidateQueries("exercise-logs-last-month");
    },
  });
};

const useAddExerciseLog = createExerciseLogMutation(
  insertLog as MutationFunction,
);
const useDeleteExerciseLog = createExerciseLogMutation(
  deleteLog as MutationFunction,
);

const exerciseApi = {
  useAddExerciseLog,
  useDeleteExerciseLog,
  useFetchExerciseLogsPerDay,
  useFetchLatestExerciseLogsLastMonth,
  useFetchProgressTable,
  useFetchPaginatedExerciseLogsByCategory,
};

export default exerciseApi;
