'use client';

import { useState } from 'react';
import { Treatment } from '@/types';
import { calculateRecommendedPrice } from '@/lib/calculations';

interface PriceCalculatorProps {
  treatments: Treatment[];
  targetHourlyRate: number;
}

export function PriceCalculator({ treatments, targetHourlyRate }: PriceCalculatorProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [customHourlyRate, setCustomHourlyRate] = useState<number>(targetHourlyRate);
  
  const selectedTreatment = treatments.find(t => t.id === selectedId);
  const recommendedPrice = selectedTreatment 
    ? calculateRecommendedPrice(selectedTreatment, customHourlyRate)
    : 0;
  
  const currentPrice = selectedTreatment?.currentPrice || 0;
  const priceDifference = recommendedPrice - currentPrice;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Price Calculator</h2>
      <p className="text-gray-600 mb-6">Find out what you should be charging based on your desired hourly rate</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Treatment</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Choose a treatment...</option>
            {treatments.map(t => (
              <option key={t.id} value={t.id}>{t.name} - Currently £{t.currentPrice}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Hourly Rate (£)</label>
          <input
            type="number"
            step="0.50"
            value={customHourlyRate}
            onChange={(e) => setCustomHourlyRate(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {selectedTreatment && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Price</span>
            <span className="text-lg font-semibold text-gray-900">£{currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Recommended Price</span>
            <span className="text-2xl font-bold text-primary-600">£{recommendedPrice.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Difference</span>
              <span className={`text-lg font-semibold ${priceDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceDifference >= 0 ? '+' : ''}£{priceDifference.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {priceDifference > 0 
              ? `You're potentially losing £${priceDifference.toFixed(2)} per treatment!`
              : priceDifference < 0
              ? `You're £${Math.abs(priceDifference).toFixed(2)} above target — good!`
              : `You're priced exactly at your target rate.`
            }
          </div>
        </div>
      )}
    </div>
  );
}
