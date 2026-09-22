import { useEffect, useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const value = input.trim();

    if (!value) {
      return;
    }

    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input, onSearch]);

  function handleSubmit(event) {
    event.preventDefault();

    const value = input.trim();

    if (!value) {
      return;
    }

    onSearch(value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search medicine by brand name..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;