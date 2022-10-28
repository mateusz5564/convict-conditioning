import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, SvgIcon, Tab, Tabs } from "@mui/material";

import workoutPartApi from "../../../../../api/workoutPart";
import { ReactComponent as PushUpsSvg } from "../../../../../assets/icons/pushups.svg";
import { ReactComponent as LegRaisesSvg } from "../../../../../assets/icons/leg-raises.svg";
import { ReactComponent as SquatsSvg } from "../../../../../assets/icons/squats.svg";
import { ReactComponent as PullUpsSvg } from "../../../../../assets/icons/pullups.svg";
import { ReactComponent as HandstandsSvg } from "../../../../../assets/icons/handstands.svg";
import { ReactComponent as BridgesSvg } from "../../../../../assets/icons/bridges.svg";
import { ExerciseCategory } from "../../../../../types";

export default function WorkoutPartNavigation() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: workoutParts, isError } = workoutPartApi.useFetchWorkoutParts();
  const [value, setValue] = useState(params.category);

  const icons = {
    pushups: PushUpsSvg,
    "leg-raises": LegRaisesSvg,
    squats: SquatsSvg,
    pullups: PullUpsSvg,
    handstands: HandstandsSvg,
    bridges: BridgesSvg,
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="Workout parts navigation"
      >
        {workoutParts?.map(workoutPart => (
          <Tab
            key={workoutPart.category}
            value={workoutPart.category}
            icon={
              <SvgIcon component={icons[workoutPart.category as ExerciseCategory]} inheritViewBox />
            }
            label={workoutPart.category}
            onClick={() => navigate(`${workoutPart.category}/logs`)}
          />
        ))}
      </Tabs>
      <Divider />
    </>
  );
}
