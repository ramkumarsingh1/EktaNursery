export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search plants..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-green-600"
    />
  );
}