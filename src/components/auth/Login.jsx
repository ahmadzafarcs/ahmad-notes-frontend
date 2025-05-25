import Input from "../ui/Input"
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast"; 
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({
        email: "", password: "" 
    });
    const { login, loading } = useAuth(); 
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();

        if (user.email && user.password) {
            login(user.email, user.password, navigate); 
        } else {
            toast.error("Please fill in all fields");
        };
 
    }

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className=" max-w-[300px]">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} 
                        disabled={loading}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} 
                        disabled={loading}
                        required
                    />
                    <Button
                        type="submit" 
                        disabled={loading}
                    >
                        Login
                    </Button>
                    
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="bg-slate-200 hover:underline">Register</Link>
                </p>
            </div>
        </section>
    )
}