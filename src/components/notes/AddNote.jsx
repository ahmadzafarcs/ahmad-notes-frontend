import { useState, useEffect } from "react";
import { useNotes } from "../../contexts/NotesProvider";
import button from "daisyui/components/button";
import { Palette } from "lucide-react";
import ColorPicker from "../ui/ColorPicker";
import AddNoteBox from "../ui/AddNoteBox";
import toast from "react-hot-toast";


export default function AddNote() {
    const [color, setColor] = useState('bg-white');
    const [note, setNote] = useState({
        title: '',
        content: '',
        color: color,
        completed: false,
        pinned: false,
    });
    const [loading, setLoading] = useState(false);
    const [addModelOpen, setAddModelOpen] = useState(false);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const { addNote } = useNotes();

    function handleAddNote(e) {
        e.preventDefault(); 
        setLoading(true);
        addNote(note)
            .then(() => {
                setLoading(false);
                setAddModelOpen(false);
                setNote({
                    title: '',
                    content: '',
                    color: 'bg-white',
                    completed: false,
                    pinned: false,
                });
                toast.success("Note added successfully!");
            })
            .catch((error) => {
                toast.error(error.response.data.message || "Error adding note"); 
                setLoading(false);
            });
    }
 
    useEffect(() => {
        setNote((prev) => ({
            ...prev,
            color: color,
        }));
    }, [color]); 

    return (
        <section>
            <div>
                {
                    !addModelOpen && 
                    <div className={`${color ? color : ""} max-w-[500px] mx-auto rounded-lg grid grid-cols-[1fr_auto] p-4 items-center shadow-md cursor-pointer`} >
                        <div onClick={() => setAddModelOpen(!addModelOpen)}>Add Note</div>
                        {/* Color picker */}
                        <div className="flex items-center justify-center">
                            <button className="relative cursor-pointer" onClick={() => setColorPickerOpen(!colorPickerOpen)}>
                                <Palette className="h-5 w-5 text-stone-700" />
                                {colorPickerOpen &&
                                    <div className="absolute top-8 left-0">
                                        <ColorPicker color={color} setColor={setColor} />
                                    </div> 
                                }
                            </button>
                        </div>
                    </div>
                }

                {
                    addModelOpen &&
                    <div>
                        <AddNoteBox handleAddNote={handleAddNote} loading={loading} setAddModelOpen={setAddModelOpen} addModelOpen={addModelOpen} color={color} setColor={setColor} note={note} setNote={setNote} colorPickerOpen={colorPickerOpen} setColorPickerOpen={setColorPickerOpen} />
                    </div>
                }
            </div>
        </section>
    );
}