export default function Button({ children, onClick, disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 text-lg bg-slate-800 cursor-pointer text-slate-100 rounded hover:bg-slate-700 disabled:bg-stone-600 disabled:text-slate-100`}
        >
            {disabled ? <span className="loading loading-spinner loading-sm">...</span> : children}
        </button>
    );
}  