import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS } from '../graphql/queries';
import TopBar from './TopBar';
import KPICards from './KPICards';
import TrendChart from './TrendChart';
import Filters from './Filters';
import ProductsTable from './ProductsTable';
import ProductDrawer from './ProductDrawer';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
    variables: {
      search: searchTerm,
      status: selectedStatus,
      warehouse: selectedWarehouse
    }
  });

  const { data: warehousesData, loading: warehousesLoading } = useQuery(GET_WAREHOUSES);
  const { data: kpisData, loading: kpisLoading, error: kpisError } = useQuery(GET_KPIS, {
    variables: { range: dateRange }
  });

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleFiltersChange = (filters) => {
    setSearchTerm(filters.search);
    setSelectedWarehouse(filters.warehouse);
    setSelectedStatus(filters.status);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error loading data</h2>
          <p className="text-gray-600">{productsError.message}</p>
        </div>
      </div>
    );
  }

  if (kpisError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error loading KPI data</h2>
          <p className="text-gray-600">{kpisError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        dateRange={dateRange} 
        onDateRangeChange={handleDateRangeChange} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <KPICards 
          products={productsData?.products || []} 
          loading={productsLoading} 
        />
        
        {/* Trend Chart */}
        <div className="mt-8">
          <TrendChart 
            kpis={kpisData?.kpis || []} 
            loading={kpisLoading} 
          />
        </div>
        
        {/* Filters */}
        <div className="mt-8">
          <Filters
            warehouses={warehousesData?.warehouses || []}
            loading={warehousesLoading}
            onFiltersChange={handleFiltersChange}
          />
        </div>
        
        {/* Products Table */}
        <div className="mt-6">
          <ProductsTable
            products={productsData?.products || []}
            loading={productsLoading}
            onProductSelect={handleProductSelect}
          />
        </div>
      </div>
      
      {/* Product Detail Drawer */}
      <ProductDrawer
        isOpen={isDrawerOpen}
        product={selectedProduct}
        onClose={handleDrawerClose}
        onUpdate={() => refetchProducts()}
      />
    </div>
  );
}

export default Dashboard;
