import { supabase } from "../supabaseClient";
import { ExerciseCategory } from "../types";

const getExerciseLogsByCategory = async (category: ExerciseCategory) => {
  try {
    let { data, error } = await supabase
      .from("workout_logs")
      .select("id,created_at,reps,exercise!inner(name,step)")
      .eq("exercise.category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

const insertLog = async (row: { reps: Array<number>; exercise: number }) => {
  try {
    let { data, error } = await supabase
      .from("workout_logs")
      .insert([row])
      .select("id,created_at,reps,exercise!inner(name,step)");

    if (error) {
      console.error(error);
    }

    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

const exerciseService = {
  getExerciseLogsByCategory,
  insertLog,
};

export default exerciseService;
