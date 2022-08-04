import { createContext, useContext, useEffect, useState } from "react";
import workoutPartService from "../../services/workoutPart";
import { WorkoutPart } from "../../types";

interface ContextInterface {
  workoutParts: WorkoutPart[];
  getWorkoutParts: Function;
}

const Context = createContext<ContextInterface | null>(null);

const WorkoutPartProvider = ({ children }: { children: any }) => {
  const [workoutParts, setWorkoutParts] = useState<WorkoutPart[]>([]);

  const getWorkoutParts = async () => {
    const data: WorkoutPart[] | undefined = await workoutPartService.getWorkoutParts();
    if (data) {
      setWorkoutParts(data);
    }
  };

  useEffect(() => {
    getWorkoutParts();
  }, []);

  return <Context.Provider value={{ workoutParts, getWorkoutParts }}>{children}</Context.Provider>;
};

export const useWorkoutParts = () => {
  const context = useContext(Context);

  return context;
};

export default WorkoutPartProvider;
