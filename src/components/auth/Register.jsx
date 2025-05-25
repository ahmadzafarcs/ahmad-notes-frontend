import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({
        email: "", password: ""
    });
    const { register, loading } = useAuth();
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();

        if (user.email && user.password) {
            register(user.email, user.password, navigate);
        } else {
            toast.error("Please fill in all fields");
        }
 
    }

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div>
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                
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
                        Register
                    </Button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="bg-slate-200 hover:underline">Login</Link>
                </p>
            </div>
        </section>
    );
}