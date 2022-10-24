import { useLocation } from "react-router-dom";

const useBackgroundLocation = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return state?.backgroundLocation;
};

export default useBackgroundLocation;
