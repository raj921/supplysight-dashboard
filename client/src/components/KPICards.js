import React from 'react';
import { Package, TrendingUp, CheckCircle } from 'lucide-react';

function KPICards({ products, loading }) {
  const calculateKPIs = () => {
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
    
    const fillRateNumerator = products.reduce((sum, product) => 
      sum + Math.min(product.stock, product.demand), 0
    );
    
    const fillRate = totalDemand > 0 ? (fillRateNumerator / totalDemand) * 100 : 0;
    
    return {
      totalStock,
      totalDemand,
      fillRate: Math.round(fillRate * 100) / 100
    };
  };

  const kpis = calculateKPIs();

  const cards = [
    {
      title: 'Total Stock',
      value: kpis.totalStock.toLocaleString(),
      icon: Package,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'Total Demand',
      value: kpis.totalDemand.toLocaleString(),
      icon: TrendingUp,
      color: 'green',
      trend: '+8%',
    },
    {
      title: 'Fill Rate',
      value: `${kpis.fillRate}%`,
      icon: CheckCircle,
      color: 'purple',
      trend: kpis.fillRate >= 90 ? 'Good' : 'Needs Attention',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        const colorClasses = {
          blue: 'text-blue-600 bg-blue-100',
          green: 'text-green-600 bg-green-100',
          purple: 'text-purple-600 bg-purple-100',
        };

        return (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className={`text-sm mt-2 ${
                  card.title === 'Fill Rate' 
                    ? kpis.fillRate >= 90 ? 'text-green-600' : 'text-yellow-600'
                    : 'text-gray-500'
                }`}>
                  {card.trend}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[card.color]}`}>
                <IconComponent className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KPICards;
