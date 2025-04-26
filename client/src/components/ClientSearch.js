import React, { useState } from 'react';

const ClientSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default ClientSearch;