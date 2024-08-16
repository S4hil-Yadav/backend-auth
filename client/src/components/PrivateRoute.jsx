import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { authUser } = useSelector((state) => state.user);
  return authUser ? <Outlet /> : <Navigate to="/login" />;
}
