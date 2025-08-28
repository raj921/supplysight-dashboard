import React from 'react';
import { Package } from 'lucide-react';

function TopBar({ dateRange, onDateRangeChange }) {
  const dateRanges = [
    { value: '7d', label: '7 Days' },
    { value: '14d', label: '14 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
          </div>
          
        
          <div className="flex items-center space-x-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onDateRangeChange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  dateRange === range.value
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
