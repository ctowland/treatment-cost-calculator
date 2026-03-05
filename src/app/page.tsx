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
import { WelcomeGuide } from '@/components/WelcomeGuide';

export default function Home() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [settings, setSettings] = useState<SalonSettings | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator'>('dashboard');

  useEffect(() => {
    const loadedTreatments = loadTreatments();
    setTreatments(loadedTreatments);
    setSettings(loadSettings());
    // Show welcome guide if no treatments exist (first visit)
    if (loadedTreatments.length === 0) {
      setShowWelcome(true);
    }
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
            <div className="flex gap-2">
              <button
                onClick={() => setShowWelcome(true)}
                className="px-4 py-2 bg-sky-100 text-sky-800 rounded-md hover:bg-sky-200 transition-colors text-sm font-semibold border border-sky-200"
              >
                ❓ Help
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'calculator'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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
              <h2 className="text-xl font-bold text-gray-900">Your Treatments</h2>
              <button
                onClick={() => {
                  setEditingTreatment(undefined);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors font-semibold shadow-sm"
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
              <>
                {/* Quick Add Button - Always visible when not editing */}
                <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Add a New Treatment</h3>
                      <p className="text-sky-100 text-sm">
                        Enter your treatment details to see if you're pricing it profitably
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingTreatment(undefined);
                        setShowForm(true);
                      }}
                      className="px-6 py-3 bg-white text-sky-700 rounded-lg hover:bg-gray-100 transition-colors font-bold shadow-md whitespace-nowrap"
                    >
                      + Add New Treatment
                    </button>
                  </div>
                </div>

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
              </>
            )}

            {calculations.length === 0 && !showForm && (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">💅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Treatments Added Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start by adding your most popular treatment. You'll see instantly whether you're pricing it profitably!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-bold text-lg shadow-md"
                >
                  + Add Your First Treatment
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  Popular first entries: Full Body Massage, Facial, Manicure, Hair Cut & Style
                </p>
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

      {/* Welcome Guide Modal */}
      {showWelcome && (
        <WelcomeGuide 
          onClose={() => setShowWelcome(false)} 
          onAddTreatment={() => {
            setShowWelcome(false);
            setShowForm(true);
          }}
        />
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
