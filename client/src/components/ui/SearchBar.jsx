import { FiSearch } from "react-icons/fi";

export default function SearchBar({
    placeholder = "Search...",
    value,
    onChange,
}) {
    return (
        <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-12 outline-none transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
        </div>
    );
}