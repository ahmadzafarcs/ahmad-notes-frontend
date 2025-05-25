import { EllipsisVertical, Palette, Trash2 } from "lucide-react";
import { useState } from "react";
import ColorPicker from "../ui/ColorPicker";
import { useNotes } from "../../contexts/NotesProvider";
import NoteModel from "../ui/NoteModel";
import toast from "react-hot-toast";

export default function SingleNote({note}) {
    const [color, setColor] = useState(note?.color || 'bg-white');
    const [noteModelOpen, setNoteModelOpen] = useState(false);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const {deleteNote, fetchNotes} = useNotes();
    const [loading, setLoading] = useState(false)

    function handleDeleteNote(e) {
        e.preventDefault();
        setLoading(true);
        deleteNote(note?._id).then(() => {
            setLoading(false);
            fetchNotes()
            toast.success("Note deleted")
        }).catch(err => {
            toast.error(err.response?.data.message)
            setLoading(false)
        });
    }

    return (
        <article className="relative max-w-[300px] w-full">
            <div  className={`${color} max-w-[300px] min-h-[150px] rounded-lg p-4 items-center border-1 border-slate-300 cursor-pointer`}>
                <div onClick={() => setNoteModelOpen(!noteModelOpen)}>
                    <h3>{note?.title}</    h3>
                    <p className="text-slate-700 mt-2">{note?.content.slice(0, 50) + "..."}</p>
                </div>
                <div className="flex items-center justify-center absolute left-3 bottom-3">
                    <div className="flex items-center justify-between gap-4">
                        <button className="relative cursor-pointer" onClick={() => setColorPickerOpen(!colorPickerOpen)}>
                            <Palette className="h-5 w-5 text-stone-700" />
                            {colorPickerOpen &&
                                <div className="absolute top-8 left-0">
                                    <ColorPicker color={color} setColor={setColor} />
                                </div> 
                            }
                        </button>
                        <form onSubmit={handleDeleteNote} className="flex items-center">
                            <button>
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : <Trash2 className="w-5 h-5 cursor-pointer text-slate-700" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Model */}
            { noteModelOpen &&
                <NoteModel
                    note={note}
                    setNoteModelOpen={setNoteModelOpen}
                    noteModelOpen={noteModelOpen}
                />
            }
        </article>
    )
}