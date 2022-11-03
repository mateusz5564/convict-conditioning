import { useEffect } from "react";
import { Location, useNavigate } from "react-router-dom";

const useNavigateOnSuccess = (
  isSuccess: boolean,
  backgroundLocation: Partial<Location> | undefined,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && backgroundLocation) {
      navigate(backgroundLocation);
    }
  }, [backgroundLocation, isSuccess, navigate]);
};

export default useNavigateOnSuccess;
