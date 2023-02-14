import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import NoUser from "components/NoUser/NoUser";
import {
  LoginDialog,
  RegisterDialog,
  useAuthContext,
  useBackgroundLocation,
} from "features/Auth";
import ChangeEmail from "features/Auth/components/ChangeEmail";
import ChangePassword from "features/Auth/components/ChangePassword";
import NewPassword from "pages/NewPassword";
import WorkoutParts from "pages/WorkoutParts";
import WorkoutPart from "pages/WorkoutParts/WorkoutPart";
import ExerciseInstructions from "pages/WorkoutParts/WorkoutPart/ExerciseInstructions";
import ExerciseLogs from "pages/WorkoutParts/WorkoutPart/ExerciseLogs";

import AccountSettings from "./pages/AccountSettings";
import Overview from "./pages/Overview";

const AppRoutes = () => {
  const user = useAuthContext();
  const location = useLocation();
  const backgroundLocation = useBackgroundLocation();

  const appLocation =
    backgroundLocation ||
    (location.pathname === "/register" || location.pathname === "/login"
      ? "/"
      : location);

  return (
    <>
      <Routes location={appLocation}>
        <Route path="/" element={<Overview />} />
        <Route path="/workout-parts" element={<WorkoutParts />}>
          <Route path=":category" element={<WorkoutPart />}>
            <Route index element={<Navigate to="logs" />} />
            <Route
              path="logs"
              element={
                user ? (
                  <ExerciseLogs />
                ) : (
                  <NoUser text="You must be logged in to view and add logs" />
                )
              }
            />
            <Route path="instructions" element={<ExerciseInstructions />} />
          </Route>
        </Route>
        <Route
          path="account"
          element={user ? <AccountSettings /> : <Navigate to="/" />}
        >
          <Route index element={<Navigate to="change-password" />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="change-email" element={<ChangeEmail />} />
        </Route>
        <Route path="/recover" element={<NewPassword />} />
        <Route path="/login" element={<Overview />} />
        <Route path="/register" element={<Overview />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      {/* Auth modals have own paths, when those paths are active the main app routes are also rendered in the background. */}
      <Routes>
        <Route path="/login" element={<LoginDialog />} />
        <Route path="/register" element={<RegisterDialog />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
};

export default AppRoutes;
