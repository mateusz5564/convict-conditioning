import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exerciseService from "../../services/exercise";
import { ExerciseCategory, ExerciseLog as ExerciseLogType } from "../../types";
import ExerciseLog from "./ExerciseLog";

export default function ExerciseLogs() {
  const { category } = useParams();
  const [logs, setLogs] = useState<ExerciseLogType[] | undefined>();

  useEffect(() => {
    const getLogs = async () => {
      const logs = await exerciseService.getExerciseLogsByCategory(category as ExerciseCategory);
      setLogs(logs);
    };

    getLogs();
  }, [category]);

  if (!logs) return <div>Loading...</div>;

  return (
    <h1>
      {logs.map(log => (
        <ExerciseLog
          key={log.id}
          exerciseLog={{
            created_at: log.created_at,
            name: log.exercise.name,
            step: log.exercise.step,
            reps: log.reps,
          }}
        />
      ))}
    </h1>
  );
}
