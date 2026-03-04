'use client';

import { useState } from 'react';
import { SalonSettings } from '@/types';

interface SettingsFormProps {
  settings: SalonSettings;
  onSave: (settings: SalonSettings) => void;
  onCancel: () => void;
}

export function SettingsForm({ settings, onSave, onCancel }: SettingsFormProps) {
  const [formData, setFormData] = useState<SalonSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const overheadPerHour = (formData.rentPerMonth + formData.utilitiesPerMonth + formData.insurancePerMonth) / 
    ((formData.openingHoursPerWeek * 52) / 12);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Salon Settings</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (£)</label>
          <input
            type="number"
            step="10"
            value={formData.rentPerMonth}
            onChange={(e) => setFormData({ ...formData, rentPerMonth: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Utilities (£)</label>
          <input
            type="number"
            step="10"
            value={formData.utilitiesPerMonth}
            onChange={(e) => setFormData({ ...formData, utilitiesPerMonth: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Insurance (£)</label>
          <input
            type="number"
            step="10"
            value={formData.insurancePerMonth}
            onChange={(e) => setFormData({ ...formData, insurancePerMonth: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours/Week</label>
          <input
            type="number"
            value={formData.openingHoursPerWeek}
            onChange={(e) => setFormData({ ...formData, openingHoursPerWeek: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Hourly Rate (£)</label>
          <input
            type="number"
            step="0.50"
            value={formData.targetHourlyRate}
            onChange={(e) => setFormData({ ...formData, targetHourlyRate: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">What you want to earn per hour worked (after all costs)</p>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Calculated Overhead</h3>
        <p className="text-2xl font-bold text-blue-700">£{overheadPerHour.toFixed(2)}/hour</p>
        <p className="text-xs text-blue-600">This is automatically added to each treatment's cost</p>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
        >
          Save Settings
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
