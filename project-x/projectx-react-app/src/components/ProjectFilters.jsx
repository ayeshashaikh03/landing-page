import React, { useState } from 'react';

const ProjectFilters = ({ onSearch, onCategoryFilter, onStatusFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onCategoryFilter(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    onStatusFilter(value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setStatus('');
    onSearch('');
    onCategoryFilter('');
    onStatusFilter('');
  };

  return (
    <div className="filters-container">
      <div className="filters-row">
        {/* Search Bar */}
        <div className="filter-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="filter-select">
          <i className="fas fa-tag"></i>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Data Science">Data Science</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-select">
          <i className="fas fa-flag"></i>
          <select value={status} onChange={handleStatusChange}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(searchTerm || category || status) && (
          <button className="btn-clear-filters" onClick={handleClearFilters}>
            <i className="fas fa-undo"></i> Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;