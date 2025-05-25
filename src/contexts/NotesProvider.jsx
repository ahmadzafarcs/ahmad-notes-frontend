import axios from "axios";
import { createContext, use, useContext, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const NotesContext = createContext();

export default function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, auth } = useAuth();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    async function fetchNotes() {
        try {
            setLoading(true);
            const response = await axios.get("/notes");
            const data = await response.data; 
            setNotes([...data.notes]);
        } catch (error) {
            toast.error( error.response?.data?.message || "Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }

    async function addNote(note) {
        const response = await axios.post("/note", {...note});
        const data = await response.data;

        if (data.success === true ) {
            setNotes((prevNotes) => [...prevNotes, data.note]);
        }

        return data;
    }

    async function updateNote(note) {
        const response = await axios.patch(`/note/${note._id}`, {...note});
        const data = await response.data;

        if (data.success === true) {
            fetchNotes();
        }

        return data;
    }

    async function deleteNote(id) {
        const response = await axios.delete(`/note/${id}`)
        const data = await response.data;
        return data
    } 

    useLayoutEffect(() => {
        if (auth) {
            fetchNotes();
        } 
    }, [auth]);

    return (
        <NotesContext.Provider value={{ notes, setNotes, loading, fetchNotes, addNote, updateNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
}