import { useCallback, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import MedicineCard from "../components/MedicineCard";
import { searchMedicines } from "../services/fdaApi";

function SearchPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const cache = useRef(new Map());
  const controllerRef = useRef(null);

 const handleSearch = useCallback(async (query) => {
    setHasSearched(true);
    setError("");

    const cacheKey = query.toLowerCase();

    if (cache.current.has(cacheKey)) {
      setMedicines(cache.current.get(cacheKey));
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);

    try {
      const results = await searchMedicines(query, controller.signal);

      cache.current.set(cacheKey, results);

      setMedicines(results);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError("Something went wrong while fetching medicines.");
      setMedicines([]);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <main className="container">
      <header className="header">
        <h1>Medicine Search</h1>
        <p>Search medicines by brand name</p>
      </header>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <div className="status">
          Searching medicines...
        </div>
      )}

      {!loading && error && (
        <div className="status error">
          {error}
        </div>
      )}

      {!loading && !error && hasSearched && medicines.length === 0 && (
        <div className="status">
          No results found
        </div>
      )}

      {!loading && !error && medicines.length > 0 && (
        <div className="medicine-grid">
          {medicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default SearchPage;