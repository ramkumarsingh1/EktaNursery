import { FiSearch } from "react-icons/fi";
import Input from "./Input";

export default function SearchBar({
    placeholder = "Search...",
    value,
    onChange,
}) {
    return (
        <div className="relative">
            <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />

            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-12"
            />
        </div>
    );
}