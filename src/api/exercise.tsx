import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

import supabase from "supabase/supabaseClient";
import { Exercise, ExerciseCategory } from "types";

import { getLvlReached, getPagination, getTopLevelsReached } from "./helpers";

const getPaginatedExerciseLogsByCategory = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const { from, to } = getPagination(queryKey[2] as number, 2);

  const { data, count, error } = await supabase
    .from("workout_logs")
    .select("id, created_at, reps, exercise!inner(id, category, name, step)", {
      count: "exact",
    })
    .eq("exercise.category", queryKey[1])
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { count, data };
};

const getExerciseLogsPerDay = async () => {
  const { data, error } = await supabase.rpc("exercises_per_day");

  if (error) throw new Error(error.message);

  return data;
};

const getLatestExerciseLogsLastMonth = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const { data, error } = await supabase.rpc("get_logs_last_month", {
    log_category: queryKey[1],
  });

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

const useFetchPaginatedExerciseLogsByCategory = (
  category: ExerciseCategory,
  page: number,
) =>
  useQuery(
    ["exercise-logs", category, page],
    getPaginatedExerciseLogsByCategory,
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

const useFetchProgressTable = () =>
  useQuery(["progress-table"], getProgressTable);

const useFetchExerciseLogsPerDay = () =>
  useQuery(["exercise-logs"], getExerciseLogsPerDay);

const useFetchLatestExerciseLogsLastMonth = (category: ExerciseCategory) =>
  useQuery(
    ["exercise-logs-last-month", category],
    getLatestExerciseLogsLastMonth,
  );

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
  useFetchExerciseLogsPerDay,
  useFetchLatestExerciseLogsLastMonth,
  useFetchProgressTable,
  useFetchPaginatedExerciseLogsByCategory,
};

export default exerciseApi;
