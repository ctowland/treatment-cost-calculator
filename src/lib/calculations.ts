import { Treatment, TreatmentCalculation, SalonSettings } from '@/types';

export function calculateTreatment(
  treatment: Treatment,
  settings: SalonSettings
): TreatmentCalculation {
  const totalProductCost = treatment.products.reduce(
    (sum, product) => sum + (product.costPerUnit * product.unitsUsed),
    0
  );
  
  const timeHours = treatment.timeMinutes / 60;
  const staffCost = treatment.staffHourlyRate * timeHours;
  const overheadCost = treatment.overheadPerHour * timeHours;
  
  const totalCost = totalProductCost + staffCost + overheadCost + treatment.otherCosts;
  const profit = treatment.currentPrice - totalCost;
  const profitMargin = (profit / treatment.currentPrice) * 100;
  const hourlyRate = profit / timeHours;
  
  let status: 'profitable' | 'warning' | 'danger' = 'profitable';
  if (profitMargin < 20) {
    status = 'danger';
  } else if (profitMargin < 40) {
    status = 'warning';
  }
  
  return {
    treatment,
    totalProductCost,
    staffCost,
    overheadCost,
    totalCost,
    profit,
    profitMargin,
    hourlyRate,
    status,
  };
}

export function calculateRecommendedPrice(
  treatment: Treatment,
  targetHourlyRate: number
): number {
  const totalProductCost = treatment.products.reduce(
    (sum, product) => sum + (product.costPerUnit * product.unitsUsed),
    0
  );
  
  const timeHours = treatment.timeMinutes / 60;
  const staffCost = treatment.staffHourlyRate * timeHours;
  const overheadCost = treatment.overheadPerHour * timeHours;
  const otherCosts = treatment.otherCosts;
  
  const totalCosts = totalProductCost + staffCost + overheadCost + otherCosts;
  const desiredProfit = targetHourlyRate * timeHours;
  
  return Math.ceil((totalCosts + desiredProfit) / 5) * 5; // Round to nearest £5
}

export function getOverheadPerHour(settings: SalonSettings): number {
  const totalMonthlyOverhead = settings.rentPerMonth + settings.utilitiesPerMonth + settings.insurancePerMonth;
  const hoursPerMonth = (settings.openingHoursPerWeek * 52) / 12;
  return totalMonthlyOverhead / hoursPerMonth;
}
