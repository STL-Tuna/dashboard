import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../authUtils";

const AuthGuard = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default AuthGuard;