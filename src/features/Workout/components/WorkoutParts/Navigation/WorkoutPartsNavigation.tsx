/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Divider, SvgIcon, Tab, Tabs } from "@mui/material";
import { ReactComponent as BridgesSvg } from "assets/icons/bridges.svg";
import { ReactComponent as HandstandsSvg } from "assets/icons/handstands.svg";
import { ReactComponent as LegRaisesSvg } from "assets/icons/leg-raises.svg";
import { ReactComponent as PullUpsSvg } from "assets/icons/pullups.svg";
import { ReactComponent as PushUpsSvg } from "assets/icons/pushups.svg";
import { ReactComponent as SquatsSvg } from "assets/icons/squats.svg";
import { ExerciseCategory, WorkoutPart } from "types";

type Props = {
  workoutParts: WorkoutPart[];
  workoutPart: WorkoutPart;
};

const WorkoutPartsNavigation = ({ workoutParts, workoutPart }: Props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(workoutPart.category);

  const icons = {
    pushups: PushUpsSvg,
    "leg-raises": LegRaisesSvg,
    squats: SquatsSvg,
    pullups: PullUpsSvg,
    handstands: HandstandsSvg,
    bridges: BridgesSvg,
  };

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
        {workoutParts?.map((workoutPart) => (
          <Tab
            key={workoutPart.category}
            value={workoutPart.category}
            icon={
              <SvgIcon
                component={icons[workoutPart.category as ExerciseCategory]}
                inheritViewBox
              />
            }
            label={workoutPart.category}
            onClick={() => navigate(`${workoutPart.category}/logs`)}
          />
        ))}
      </Tabs>
      <Divider />
    </>
  );
};

export default WorkoutPartsNavigation;
