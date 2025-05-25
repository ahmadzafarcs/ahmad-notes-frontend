export default function Input({ type = "text", placeholder = "", value, onChange, disabled = false }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-2 text-md border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-stone-200 disabled:border-stone-400"
    />
  );
}