import { supabase } from "../supabaseClient";

const getWorkoutParts = async () => {
  try {
    const { data, error } = await supabase
      .from("workout_part")
      .select(`*, exercises:exercise(*)`)
      .order("step", { foreignTable: "exercise" });

    if (error) {
      console.error(error);
    }

    if (data) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const workoutPartService = { getWorkoutParts };

export default workoutPartService;
