import { Treatment, SalonSettings } from '@/types';

const STORAGE_KEY = 'treatment-cost-calculator-data';
const SETTINGS_KEY = 'treatment-cost-calculator-settings';

export function loadTreatments(): Treatment[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : getSampleTreatments();
}

export function saveTreatments(treatments: Treatment[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(treatments));
}

export function loadSettings(): SalonSettings {
  if (typeof window === 'undefined') return getDefaultSettings();
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : getDefaultSettings();
}

export function saveSettings(settings: SalonSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function getDefaultSettings(): SalonSettings {
  return {
    rentPerMonth: 1500,
    utilitiesPerMonth: 300,
    insurancePerMonth: 200,
    openingHoursPerWeek: 60,
    targetHourlyRate: 25,
  };
}

function getSampleTreatments(): Treatment[] {
  return [
    {
      id: '1',
      name: 'Full Head Highlights',
      currentPrice: 85,
      timeMinutes: 150,
      staffHourlyRate: 12,
      overheadPerHour: 25,
      otherCosts: 2,
      products: [
        { id: 'p1', name: 'Bleach Powder', costPerUnit: 4.5, unitsUsed: 2 },
        { id: 'p2', name: 'Developer', costPerUnit: 2.5, unitsUsed: 2 },
        { id: 'p3', name: 'Toner', costPerUnit: 5, unitsUsed: 1 },
        { id: 'p4', name: 'Foils', costPerUnit: 0.15, unitsUsed: 30 },
      ],
    },
    {
      id: '2',
      name: 'Root Touch-Up',
      currentPrice: 45,
      timeMinutes: 75,
      staffHourlyRate: 12,
      overheadPerHour: 25,
      otherCosts: 1,
      products: [
        { id: 'p5', name: 'Colour', costPerUnit: 6, unitsUsed: 1 },
        { id: 'p6', name: 'Developer', costPerUnit: 2.5, unitsUsed: 1 },
      ],
    },
    {
      id: '3',
      name: 'Balayage',
      currentPrice: 95,
      timeMinutes: 180,
      staffHourlyRate: 12,
      overheadPerHour: 25,
      otherCosts: 2,
      products: [
        { id: 'p7', name: 'Bleach Powder', costPerUnit: 4.5, unitsUsed: 3 },
        { id: 'p8', name: 'Developer', costPerUnit: 2.5, unitsUsed: 3 },
        { id: 'p9', name: 'Toner', costPerUnit: 5, unitsUsed: 1.5 },
      ],
    },
    {
      id: '4',
      name: 'Hair Cut & Finish',
      currentPrice: 35,
      timeMinutes: 45,
      staffHourlyRate: 12,
      overheadPerHour: 25,
      otherCosts: 0.5,
      products: [
        { id: 'p10', name: 'Styling Products', costPerUnit: 1, unitsUsed: 1 },
      ],
    },
  ];
}
