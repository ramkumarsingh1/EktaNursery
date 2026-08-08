import Input from "./Input";

export default function SearchBar({
    placeholder = "Search...",
    value,
    onChange,
}) {
    return (
        <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="pl-12"
        />
    );
}