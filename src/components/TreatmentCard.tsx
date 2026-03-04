'use client';

import { Treatment } from '@/types';

interface StatusBadgeProps {
  status: 'profitable' | 'warning' | 'danger';
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    profitable: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };
  
  const labels = {
    profitable: 'Healthy',
    warning: 'Review',
    danger: 'Loss',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

interface TreatmentCardProps {
  calculation: {
    treatment: Treatment;
    totalProductCost: number;
    staffCost: number;
    overheadCost: number;
    totalCost: number;
    profit: number;
    profitMargin: number;
    hourlyRate: number;
    status: 'profitable' | 'warning' | 'danger';
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function TreatmentCard({ calculation, onEdit, onDelete }: TreatmentCardProps) {
  const { treatment, totalCost, profit, profitMargin, hourlyRate, status } = calculation;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{treatment.name}</h3>
          <p className="text-sm text-gray-500">{treatment.timeMinutes} minutes</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Price</p>
          <p className="text-lg font-bold text-gray-900">£{treatment.currentPrice.toFixed(2)}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Cost</p>
          <p className="text-lg font-bold text-gray-700">£{totalCost.toFixed(2)}</p>
        </div>
        <div className={`text-center p-3 rounded-lg ${profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="text-xs text-gray-500 mb-1">Profit</p>
          <p className={`text-lg font-bold ${profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            £{profit.toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-500">Profit Margin</p>
          <p className={`text-sm font-semibold ${profitMargin >= 40 ? 'text-green-600' : profitMargin >= 20 ? 'text-yellow-600' : 'text-red-600'}`}>
            {profitMargin.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Hourly Rate</p>
          <p className="text-sm font-semibold text-gray-900">£{hourlyRate.toFixed(2)}/hr</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
