'use client';

import { TreatmentCalculation } from '@/types';

interface DashboardStatsProps {
  calculations: TreatmentCalculation[];
}

export function DashboardStats({ calculations }: DashboardStatsProps) {
  const totalTreatments = calculations.length;
  const profitableTreatments = calculations.filter(c => c.status === 'profitable').length;
  const warningTreatments = calculations.filter(c => c.status === 'warning').length;
  const dangerTreatments = calculations.filter(c => c.status === 'danger').length;
  
  const averageMargin = calculations.length > 0
    ? calculations.reduce((sum, c) => sum + c.profitMargin, 0) / calculations.length
    : 0;
  
  const totalProfitPerDay = calculations.length > 0
    ? calculations.reduce((sum, c) => sum + c.profit, 0) / calculations.length * 5
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <p className="text-sm text-gray-500 mb-1">Healthy Treatments</p>
        <p className="text-2xl font-bold text-green-600">{profitableTreatments}</p>
        <p className="text-xs text-gray-400">{totalTreatments > 0 ? Math.round((profitableTreatments / totalTreatments) * 100) : 0}% of total</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
        <p className="text-sm text-gray-500 mb-1">Need Review</p>
        <p className="text-2xl font-bold text-yellow-600">{warningTreatments}</p>
        <p className="text-xs text-gray-400">20-40% margin</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <p className="text-sm text-gray-500 mb-1">Losing Money</p>
        <p className="text-2xl font-bold text-red-600">{dangerTreatments}</p>
        <p className="text-xs text-gray-400">Under 20% margin</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
        <p className="text-sm text-gray-500 mb-1">Avg Profit Margin</p>
        <p className="text-2xl font-bold text-primary-600">{averageMargin.toFixed(1)}%</p>
        <p className="text-xs text-gray-400">Target: 40%+</p>
      </div>
    </div>
  );
}
