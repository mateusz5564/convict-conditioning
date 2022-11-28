import { useOutletContext } from "react-router-dom";

import { WorkoutPart as WorkoutPartType } from "types";

type ContextType = { workoutPart: WorkoutPartType };

export default () => useOutletContext<ContextType>();
