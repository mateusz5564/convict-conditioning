/* All this level related logic should be done using SQL functions, but it requires more advanced SQL skills,
unfortunatelly mine are only basic. In the future I'm gonna learn more advanced SQL, for now I want to focus on frontend */
// calculate lvl reached in exercise from table of reps
type Levels = Array<{ sets: number; reps: number }>;

const getLevelsObjects = (levels: string[]) => {
  const levelsSetsAndReps: Levels = [];

  // format "1x10" -> number of reps or "30" -> number of seconds
  if (levels[0].includes("x")) {
    levels.forEach((lvl) => {
      const setsAndReps = lvl.split("x").map((item) => Number(item));
      levelsSetsAndReps.push({ sets: setsAndReps[0], reps: setsAndReps[1] });
    });
  } else {
    levels
      .map((rep) => Number(rep))
      .forEach((rep, index) => {
        levelsSetsAndReps.push({ sets: index + 1, reps: rep });
      });
  }

  return levelsSetsAndReps;
};

const getLvlReached = (reps: number[], levels: string[]) => {
  const levelsObjects = getLevelsObjects(levels);
  let bestLvlReached = 0;

  levelsObjects.forEach((lvl, index) => {
    let setsAbove = 0;
    reps.forEach((rep) => {
      setsAbove = rep >= lvl.reps ? setsAbove + 1 : setsAbove;
    });
    bestLvlReached = setsAbove >= lvl.sets ? index + 1 : bestLvlReached;
  });

  return bestLvlReached;
};

// calculate max lvl reached in each category
type Progress = {
  exercise_category: string;
  exercise_step: number;
  exercise_lvl_reached: number;
};

type GroupedProgress = { [key: string]: Array<Progress> };

type TopProgress = { [key: string]: Progress };

const groupProgressByCategory = (data: Array<Progress>) => {
  const newData: GroupedProgress = {};

  data.forEach((log) => {
    if (newData[log.exercise_category]) {
      newData[log.exercise_category].push(log);
    } else {
      newData[log.exercise_category] = [log];
    }
  });

  return newData;
};

const getTopLevelsReached = (data: Array<Progress>) => {
  const groupedProgress = groupProgressByCategory(data);
  const groupedSortedProgress: GroupedProgress = JSON.parse(
    JSON.stringify(groupedProgress),
  );

  Object.entries(groupedSortedProgress).forEach(([, value]) => {
    value
      .sort((a, b) => b.exercise_lvl_reached - a.exercise_lvl_reached)
      .sort((a, b) => b.exercise_step - a.exercise_step);
  });

  const topProgress: TopProgress = {};
  Object.entries(groupedSortedProgress).forEach(([key, value]) => {
    const [top] = value;
    topProgress[key] = top;
  });

  return topProgress;
};

// eslint-disable-next-line import/prefer-default-export
export { getTopLevelsReached, getLvlReached };
