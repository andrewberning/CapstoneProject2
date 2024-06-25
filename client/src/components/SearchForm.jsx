import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./SearchForm.css"

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

export default function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SerchForm">
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
        {/* <button className="btn btn-primary me-2">Submit</button> */}
      </form>
    </div>
  );
}