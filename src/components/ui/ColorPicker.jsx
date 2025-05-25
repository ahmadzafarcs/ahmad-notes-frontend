export default function ColorPicker({ color, setColor }) {
    const colors = [
        "bg-white",
        "bg-red-200",
        "bg-yellow-200",
        "bg-green-200",
        "bg-blue-200",
        "bg-purple-200",
        "bg-pink-200",
        "bg-gray-200",
    ];

    return (
        <div className="flex gap-2 p-2 bg-white rounded-lg shadow-md z-50 absolute">
            {colors.map((c) => (
                <span
                    key={c}
                    className={`w-8 h-8 rounded-full cursor-pointer ${c} ${color === c ? 'border-2 border-black' : ''}`}
                    onClick={() => setColor(c)}
                />
            ))}
        </div>
    );
}