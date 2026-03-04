'use client';

import { useState } from 'react';
import { Treatment, Product } from '@/types';

interface TreatmentFormProps {
  treatment?: Treatment;
  onSave: (treatment: Treatment) => void;
  onCancel: () => void;
}

export function TreatmentForm({ treatment, onSave, onCancel }: TreatmentFormProps) {
  const [formData, setFormData] = useState<Partial<Treatment>>({
    name: treatment?.name || '',
    currentPrice: treatment?.currentPrice || 0,
    timeMinutes: treatment?.timeMinutes || 60,
    staffHourlyRate: treatment?.staffHourlyRate || 12,
    overheadPerHour: treatment?.overheadPerHour || 25,
    otherCosts: treatment?.otherCosts || 0,
    products: treatment?.products || [],
  });
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    costPerUnit: 0,
    unitsUsed: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: treatment?.id || Date.now().toString(),
    } as Treatment);
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.costPerUnit && newProduct.unitsUsed) {
      setFormData({
        ...formData,
        products: [
          ...(formData.products || []),
          {
            id: Date.now().toString(),
            name: newProduct.name,
            costPerUnit: newProduct.costPerUnit,
            unitsUsed: newProduct.unitsUsed,
          },
        ],
      });
      setNewProduct({ name: '', costPerUnit: 0, unitsUsed: 1 });
    }
  };

  const removeProduct = (id: string) => {
    setFormData({
      ...formData,
      products: formData.products?.filter(p => p.id !== id) || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {treatment ? 'Edit Treatment' : 'Add New Treatment'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., Full Head Highlights"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={formData.currentPrice}
            onChange={(e) => setFormData({ ...formData, currentPrice: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time (minutes)</label>
          <input
            type="number"
            value={formData.timeMinutes}
            onChange={(e) => setFormData({ ...formData, timeMinutes: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Staff Hourly Rate (£)</label>
          <input
            type="number"
            step="0.01"
            value={formData.staffHourlyRate}
            onChange={(e) => setFormData({ ...formData, staffHourlyRate: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Overhead Per Hour (£)</label>
          <input
            type="number"
            step="0.01"
            value={formData.overheadPerHour}
            onChange={(e) => setFormData({ ...formData, overheadPerHour: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Other Costs (£)</label>
          <input
            type="number"
            step="0.01"
            value={formData.otherCosts}
            onChange={(e) => setFormData({ ...formData, otherCosts: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Products Used</h3>
        
        {formData.products && formData.products.length > 0 && (
          <div className="mb-4 space-y-2">
            {formData.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <div>
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {product.unitsUsed} × £{product.costPerUnit.toFixed(2)} = £{(product.unitsUsed * product.costPerUnit).toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Cost per unit"
            value={newProduct.costPerUnit || ''}
            onChange={(e) => setNewProduct({ ...newProduct, costPerUnit: parseFloat(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Units"
            value={newProduct.unitsUsed || ''}
            onChange={(e) => setNewProduct({ ...newProduct, unitsUsed: parseFloat(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          type="button"
          onClick={addProduct}
          className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Add Product
        </button>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
        >
          {treatment ? 'Update Treatment' : 'Add Treatment'}
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
