import axios from "axios";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState();

    async function login(email, password, navigate) {
        try {
            setLoading(true);
            const response = await axios.post("/login", { email, password });
            const data = response.data;
            localStorage.setItem("accessToken", data.data.accessToken);
            setAuth(true);
            navigate("/")
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    async function register(email, password, navigate) {
        try {
            setLoading(true);
            const response = await axios.post("/register", { email, password });
            const data = response.data;
            localStorage.setItem("accessToken", data.data.accessToken);
            setAuth(true);
            navigate("/")
            toast.success("Registration successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setAuth(null);
        localStorage.removeItem("accessToken");
        toast.success("Logout successful");
    }

    useLayoutEffect(() => {

        const token = localStorage.getItem('accessToken');

        if (token) {
            setToken(token);
            setAuth(true);
            return;
        } else {
            setToken(null)
            setAuth(false)
        }

    }, [token, auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, login, register, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}