import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendChart = ({ kpis, loading }) => {
  const renderLoadingState = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="h-6 bg-gray-100 rounded w-32 mb-6 animate-pulse"></div>
      <div className="h-64 bg-gray-50 rounded animate-pulse"></div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock vs Demand Trend</h3>
      <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded">
        <div className="text-center">
          <p className="text-sm">No data available for the selected period</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your date range</p>
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoadingState();
  if (!kpis || kpis.length === 0) return renderEmptyState();

  const chartData = kpis.map(kpi => ({
    date: kpi.date,
    Stock: kpi.stock,
    Demand: kpi.demand
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatTooltipDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock vs Demand Trend</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            accessibilityLayer
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f3f4f6" 
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatDate}
              padding={{ left: 10, right: 10 }}
            />
            
            <YAxis 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            
            <Tooltip 
              formatter={(value) => value.toLocaleString()}
              labelFormatter={formatTooltipDate}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: '16px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="Stock" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Stock Level"
            />
            
            <Line 
              type="monotone" 
              dataKey="Demand" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 2 }}
              name="Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
