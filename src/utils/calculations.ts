import { RentFormData, CalculationResult } from "../types";

export const calculateTotals = (data: RentFormData): CalculationResult => {
  const rent = parseFloat(data.rent) || 0;
  const insurance = parseFloat(data.insurance) || 0;
  const water = parseFloat(data.water) || 0;

  const rentTax = data.hasRentTax ? rent * 0.15 : 0;

  // تحديد نسبة العمولة: إما 5% افتراضياً أو النسبية المدخلة يدوياً
  let commissionRate = 5;
  if (data.isCustomCommission) {
    commissionRate = parseFloat(data.customCommission) || 0;
  }

  // حساب مبلغ العمولة بناءً على النسبة المئوية للإيجار
  const commission = rent * (commissionRate / 100);
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
