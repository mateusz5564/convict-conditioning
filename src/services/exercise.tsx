import { supabase } from "../supabaseClient";
import { ExerciseCategory } from "../types";

const getExerciseLogsByCategory = async (category: ExerciseCategory) => {
  try {
    let { data } = await supabase
      .from("workout_logs")
      .select("id,created_at,reps,exercise!inner(name,step)")
      .eq("exercise.category", category);
    if (data) {
      return data;
    } else throw new Error("Couldn't fetch the data");
  } catch (e) {
    console.log(e);
  }
};

const exerciseService = {
  getExerciseLogsByCategory,
};

export default exerciseService;
