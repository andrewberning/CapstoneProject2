import { useState, useEffect, useRef } from "react";
import ShoplyApi from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./SearchForm.css";

export default function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchFormRef = useRef(null);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      async function fetchSearchResults() {
        setIsSearching(true);
        try {
          const response = await ShoplyApi.searchProducts(searchTerm);
          setSearchResults(response);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
        setIsSearching(false);
      }

      fetchSearchResults();
    }, 300); // debounce delay of 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    function updateResultsWidth() {
      if (searchFormRef.current && searchResultsRef.current) {
        searchResultsRef.current.style.width = `${searchFormRef.current.offsetWidth}px`;
      }
    }

    window.addEventListener("resize", updateResultsWidth);

    // Set initial width
    updateResultsWidth();

    return () => window.removeEventListener("resize", updateResultsWidth);
  }, []);

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm" ref={searchFormRef}>
      <form className="search-form d-flex align-items-center" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
              type="text"
              className="form-control"
              name="searchTerm"
              placeholder="Search..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
          />
          <button className="input-group-text">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      {searchTerm && (
        <ul className="search-results-list" ref={searchResultsRef}>
          {isSearching ? (
            <li>Loading...</li>
          ) : (
            searchResults.map((result) => (
              <li key={result.id}>
                <a href={`/products/${result.id}`}>{result.name}</a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
