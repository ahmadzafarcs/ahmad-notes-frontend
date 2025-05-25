import { Palette } from "lucide-react";
import ColorPicker from "./ColorPicker";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNotes } from "../../contexts/NotesProvider";

export default function NoteModel({ note, setNoteModelOpen, noteModelOpen }) {
    const [color, setColor] = useState(note?.color);
    const [editedNote, setEditedNote] = useState({
        _id: note?._id || '',
        title: note?.title || '',
        content: note?.content || '',
        color: note?.color || 'bg-white'
    });
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { updateNote } = useNotes();

    function handleSave(e) {
        e.preventDefault();
        setLoading(true);
        updateNote(editedNote)
            .then(() => {
                toast.success("Note updated successfully!");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Error updating note");
            });
    }

    useEffect(() => {
        setEditedNote({
            ...editedNote,
            color: color
        })
    }, [color])

    
    return (
        <div className="fixed p-2 top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div onSubmit={handleSave} className={`${color} max-w-[400px] w-full mx-auto rounded-lg grid gap-8 grid-rows-[1fr_auto] pb-5 pr-5 pl-5 pt-2 items-center shadow-md`}>
                <form onSubmit={handleSave} className="grid gap-2 grid-rows-[1fr_auto]">
                <input 
                    className="outline-none font-semibold text-lg" 
                    type="text" 
                    placeholder="Title" 
                    value={editedNote.title} 
                    onChange={e => setEditedNote({...editedNote, title: e.target.value})} 
                    disabled={loading}
                />
                <textarea 
                    className="outline-none" 
                    type="text" 
                    placeholder="Take a note..." 
                    value={editedNote.content} 
                    onChange={e => setEditedNote({...editedNote, content: e.target.value})} 
                    disabled={loading}
                />
                </form>
                <div className="flex items-center justify-between">
                    <button className="relative cursor-pointer" onClick={() => setColorPickerOpen(!colorPickerOpen)} disabled={loading}>
                        <Palette className="h-5 w-5 text-stone-700" />
                        {colorPickerOpen &&
                            <div className="absolute top-8 left-0">
                                <form onSubmit={handleSave}>
                                    <ColorPicker color={color} setColor={setColor} />
                                </form>
                            </div> 
                        }
                </button>
                <div className="flex items-center justify-end">
                    <form onSubmit={handleSave}>
                        <button className="text-slate-800 hover:text-slate-500 cursor-pointer mr-8" disabled={loading}>
                            {loading ? <span className="loading loading-dots loaing-md"></span> : "Save"}
                        </button>
                    </form>
                    <button className="text-slate-800 hover:text-slate-700 cursor-pointer" onClick={() => setNoteModelOpen(!noteModelOpen)} disabled={loading}>Close</button>
                </div>
            </div>
            </div>
        </div>
    )
}