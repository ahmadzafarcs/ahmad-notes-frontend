import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function PublicRoutes() {
    const { auth } = useAuth();

    return !auth ? <Outlet /> : <Navigate to="/" replace />;
}