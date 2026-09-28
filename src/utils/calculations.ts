import { RentFormData, CalculationResult } from "../types";

export const calculateTotals = (data: RentFormData): CalculationResult => {
  const rent = parseFloat(data.rent) || 0;
  const insurance = parseFloat(data.insurance) || 0;
  const water = parseFloat(data.water) || 0;

  const rentTax = data.hasRentTax ? rent * 0.15 : 0;
  const commission = rent * 0.05;
  const commissionTax = commission * 0.15;
  const total = rent + rentTax + insurance + water + commission + commissionTax;

  return { rent, rentTax, insurance, water, commission, commissionTax, total };
};

export const calculatePaymentBreakdown = (
  totals: CalculationResult,
  frequency: number,
): CalculationResult => {
  const rentPerPayment = totals.rent / frequency;
  const rentTaxPerPayment = totals.rentTax / frequency;
  const waterPerPayment = totals.water / frequency;

  // التأمين، العمولة، وضريبة العمولة تبقى كما هي بدون تقسيم حسب شروطك
  const insurance = totals.insurance;
  const commission = totals.commission;
  const commissionTax = totals.commissionTax;

  const total =
    rentPerPayment +
    rentTaxPerPayment +
    insurance +
    waterPerPayment +
    commission +
    commissionTax;

  return {
    rent: rentPerPayment,
    rentTax: rentTaxPerPayment,
    insurance,
    water: waterPerPayment,
    commission,
    commissionTax,
    total,
  };
};
