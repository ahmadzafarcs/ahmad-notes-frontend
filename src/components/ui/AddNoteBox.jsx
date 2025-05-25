import { Palette } from "lucide-react";
import ColorPicker from "./ColorPicker";

export default function AddNoteBox({handleAddNote, loading, setAddModelOpen, addModelOpen, color, setColor, note, setNote, colorPickerOpen, setColorPickerOpen }) {
    return (
        <section >
            <div className={`${color} max-w-[500px] mx-auto rounded-lg grid grid-rows-[1fr_auto] pb-5 pr-5 pl-5 pt-5 items-center shadow-md`}>
                <form action="" onSubmit={handleAddNote} className="grid grid-rows-[1fr_auto]">
                    <input className="outline-none font-semibold text-lg" type="text" placeholder="Title" value={note.title} onChange={e => setNote({...note, title: e.target.value})} disabled={loading} />
                    <textarea className="outline-none pt-2" type="text" placeholder="Take a note..." value={note.content} onChange={e => setNote({...note, content: e.target.value})} disabled={loading} />
                </form>
                <div className="flex items-end justify-between">
                    <button type="none" className="relative cursor-pointer" onClick={() => setColorPickerOpen(!colorPickerOpen)} disabled={loading}>
                        <Palette className="h-5 w-5 text-stone-700" />
                            {colorPickerOpen &&
                                <form onSubmit={handleAddNote} className="absolute top-8 left-0">
                                    <ColorPicker color={color} setColor={setColor} />
                                </form> 
                            }
                    </button>
                    <div className="flex items-center justify-end">
                        <form action="" onSubmit={handleAddNote}>
                            <button className="text-slate-800 hover:text-slate-500 cursor-pointer mr-8" disabled={loading}>
                                {loading ? <span className="loading loading-dots loaing-md"></span> : "Save"}
                            </button>
                        </form>
                        <button type="none" className="text-slate-800 hover:text-slate-700 cursor-pointer" onClick={() => setAddModelOpen(!addModelOpen)} disabled={loading}>Close</button>
                    </div>
                </div>
            </div>
        </section>
    );
}