import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import AuthProvider from "./contexts/AuthProvider";
import Register from "./components/auth/Register";
import PublicRoutes from "./components/auth/PublicRoutes";
import NotFound from "./components/pages/NotFound";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Notes from "./components/pages/Notes";
import axios from "axios";
import NotesProvider from "./contexts/NotesProvider";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Notes />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-left" />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}