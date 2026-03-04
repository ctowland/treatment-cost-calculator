'use client';

import { useState, useEffect } from 'react';
import { Treatment, TreatmentCalculation, SalonSettings } from '@/types';
import { calculateTreatment, getOverheadPerHour } from '@/lib/calculations';
import { loadTreatments, saveTreatments, loadSettings, saveSettings } from '@/lib/storage';
import { TreatmentCard } from '@/components/TreatmentCard';
import { TreatmentForm } from '@/components/TreatmentForm';
import { PriceCalculator } from '@/components/PriceCalculator';
import { DashboardStats } from '@/components/DashboardStats';
import { SettingsForm } from '@/components/SettingsForm';

export default function Home() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [settings, setSettings] = useState<SalonSettings | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator'>('dashboard');

  useEffect(() => {
    setTreatments(loadTreatments());
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    if (treatments.length > 0) {
      saveTreatments(treatments);
    }
  }, [treatments]);

  useEffect(() => {
    if (settings) {
      saveSettings(settings);
    }
  }, [settings]);

  const handleSaveTreatment = (treatment: Treatment) => {
    if (editingTreatment) {
      setTreatments(treatments.map(t => t.id === treatment.id ? treatment : t));
    } else {
      setTreatments([...treatments, treatment]);
    }
    setShowForm(false);
    setEditingTreatment(undefined);
  };

  const handleDeleteTreatment = (id: string) => {
    if (confirm('Are you sure you want to delete this treatment?')) {
      setTreatments(treatments.filter(t => t.id !== id));
    }
  };

  const handleEditTreatment = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    setShowForm(true);
  };

  const handleSaveSettings = (newSettings: SalonSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  const calculations: TreatmentCalculation[] = treatments.map(treatment => {
    const calcSettings = settings || {
      rentPerMonth: 1500,
      utilitiesPerMonth: 300,
      insurancePerMonth: 200,
      openingHoursPerWeek: 60,
      targetHourlyRate: 25,
    };
    
    const overheadPerHour = getOverheadPerHour(calcSettings);
    return calculateTreatment({ ...treatment, overheadPerHour }, calcSettings);
  });

  const totalMonthlyLoss = calculations
    .filter(c => c.status === 'danger')
    .reduce((sum, c) => sum + Math.abs(c.profit), 0) * 20; // Assuming 20 treatments/month

  if (!settings) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Treatment Cost Calculator</h1>
              <p className="text-sm text-gray-500">Find your hidden profit leaks</p>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Price Calculator
          </button>
        </div>

        {/* Alert Banner */}
        {totalMonthlyLoss > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="text-red-500 text-2xl">⚠️</div>
            <div>
              <p className="font-semibold text-red-800">
                You're potentially losing £{totalMonthlyLoss.toFixed(0)}+ per month on underpriced treatments!
              </p>
              <p className="text-sm text-red-600">
                Review the treatments marked in red below and consider price adjustments.
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <DashboardStats calculations={calculations} />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Treatments</h2>
              <button
                onClick={() => {
                  setEditingTreatment(undefined);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
              >
                + Add Treatment
              </button>
            </div>

            {showForm ? (
              <TreatmentForm
                treatment={editingTreatment}
                onSave={handleSaveTreatment}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTreatment(undefined);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculations.map((calc) => (
                  <TreatmentCard
                    key={calc.treatment.id}
                    calculation={calc}
                    onEdit={() => handleEditTreatment(calc.treatment)}
                    onDelete={() => handleDeleteTreatment(calc.treatment.id)}
                  />
                ))}
              </div>
            )}

            {calculations.length === 0 && !showForm && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">No treatments added yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
                >
                  Add Your First Treatment
                </button>
              </div>
            )}
          </>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="max-w-xl">
            <PriceCalculator
              treatments={treatments}
              targetHourlyRate={settings.targetHourlyRate}
            />
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SettingsForm
              settings={settings}
              onSave={handleSaveSettings}
              onCancel={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Treatment Cost Calculator for UK Beauty Salons
        </p>
      </footer>
    </main>
  );
}
