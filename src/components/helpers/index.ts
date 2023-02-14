import { PathMatch } from "react-router-dom";

export const getHashMessage = (hash: string) => {
  const hashName = hash.substring(0, 8);
  const hashContent = hash.substring(9);

  if (hashName === "#message") {
    return hashContent.replaceAll("+", " ");
  }

  return null;
};

type Match = PathMatch<string> | null;

export const getBottomNavValue = (
  matchesOverview: Match,
  matchesWorkoutParts: Match,
) => {
  if (!(matchesOverview || matchesWorkoutParts)) {
    return null;
  }

  return matchesOverview ? 0 : 1;
};
