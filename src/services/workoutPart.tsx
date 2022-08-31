import { supabase } from "../supabaseClient";

const getWorkoutParts = async () => {
  try {
    const { data } = await supabase
      .from("workout_part")
      .select(`*, exercises:exercise(*)`)
      .order("step", { foreignTable: "exercise" });
    if (data) {
      return data;
    } else throw new Error("Couldn't fetch the data");
  } catch (e) {
    console.log(e);
  }
};

const workoutPartService = { getWorkoutParts };

export default workoutPartService;
