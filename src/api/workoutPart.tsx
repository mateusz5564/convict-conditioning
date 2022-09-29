import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

const useFetchWorkoutParts = () => useQuery("workout-parts", getWorkoutParts);

const getWorkoutParts = async () => {
  const { data, error } = await supabase
    .from("workout_part")
    .select(`*, exercises:exercise(*)`)
    .order("step", { foreignTable: "exercise" });

  if (error) throw new Error(error.message);

  return data;
};

const workoutPartApi = { useFetchWorkoutParts };

export default workoutPartApi;
