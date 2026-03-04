export interface Product {
  id: string;
  name: string;
  costPerUnit: number;
  unitsUsed: number;
}

export interface Treatment {
  id: string;
  name: string;
  currentPrice: number;
  timeMinutes: number;
  products: Product[];
  staffHourlyRate: number;
  overheadPerHour: number;
  otherCosts: number;
}

export interface TreatmentCalculation {
  treatment: Treatment;
  totalProductCost: number;
  staffCost: number;
  overheadCost: number;
  totalCost: number;
  profit: number;
  profitMargin: number;
  hourlyRate: number;
  status: 'profitable' | 'warning' | 'danger';
}

export interface SalonSettings {
  rentPerMonth: number;
  utilitiesPerMonth: number;
  insurancePerMonth: number;
  openingHoursPerWeek: number;
  targetHourlyRate: number;
}
