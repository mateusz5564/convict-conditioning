import { useQuery } from "react-query";

import supabase from "../supabase/supabaseClient";

const getWorkoutParts = async () => {
  const { data, error } = await supabase
    .from("workout_part")
    .select("*, exercises:exercise(*)")
    .order("step", { foreignTable: "exercise" });

  if (error) throw new Error(error.message);

  return data;
};

const useFetchWorkoutParts = () => useQuery("workout-parts", getWorkoutParts);

const workoutPartApi = { useFetchWorkoutParts };

export default workoutPartApi;
