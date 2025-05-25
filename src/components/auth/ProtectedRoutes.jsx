import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function ProtectedRoutes() {
    const { auth } = useAuth();

    return auth ? <Outlet /> : <Navigate to="/login" replace />;
}