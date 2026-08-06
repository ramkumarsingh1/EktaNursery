import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOverlay({
  isOpen,
  setIsSearchOpen,
}) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    setIsSearchOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] bg-white transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 border-b p-4"
      >
        <button
          type="button"
          onClick={() => setIsSearchOpen(false)}
        >
          <FiArrowLeft size={24} />
        </button>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search plants, pots..."
          className="flex-1 rounded-lg border px-4 py-2 outline-none focus:border-green-700"
          autoFocus
        />

        <button
          type="submit"
          className="rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
}