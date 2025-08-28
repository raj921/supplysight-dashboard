import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

function Filters({ warehouses, loading, onFiltersChange }) {
  const [search, setSearch] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('All');

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Healthy', label: '🟢 Healthy' },
    { value: 'Low', label: '🟡 Low' },
    { value: 'Critical', label: '🔴 Critical' }
  ];

  useEffect(() => {
    onFiltersChange({ search, warehouse, status });
  }, [search, warehouse, status, onFiltersChange]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    setWarehouse(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by name, SKU, ID..."
              value={search}
              onChange={handleSearchChange}
              className="input-field pl-10"
            />
          </div>
        </div>

      
        <div>
          <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-2">
            Warehouse
          </label>
          <select
            id="warehouse"
            value={warehouse}
            onChange={handleWarehouseChange}
            className="input-field"
          >
            <option value="">All Warehouses</option>
            {warehouses.map((wh) => (
              <option key={wh.code} value={wh.code}>
                {wh.name} ({wh.code})
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="input-field"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

     
      {(search || warehouse || status !== 'All') && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {search && (
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              Search: "{search}"
            </span>
          )}
          {warehouse && (
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              Warehouse: {warehouse}
            </span>
          )}
          {status !== 'All' && (
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              Status: {status}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Filters;
