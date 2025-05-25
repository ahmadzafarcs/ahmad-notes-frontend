import { useNotes } from "../../contexts/NotesProvider";
import AddNote from "../notes/AddNote";
import SingleNote from "../notes/SingleNote";
import Header from "../ui/Header";

export default function Notes() {
    const { loading, notes } = useNotes();

    return (
        <>
            <section className="max-w-[90vw] mx-auto">
                <Header />
                <div className="my-10">
                    <AddNote />
                </div>
                {loading && <div className="flex items-center justify-center h-[30vh]">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>}
                { !loading &&
                <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center place-items-center flex-wrap gap-4 mx-auto">
                    {notes.map(note => (
                        <SingleNote key={note.id || note._id} note={note} />
                    ))}
                </div>
                }
            </section>
        </>
    );
}