export type PaymentFrequency = 1 | 2 | 4;

export interface RentFormData {
  tableName: string;
  rent: string;
  hasRentTax: boolean;
  insurance: string;
  water: string;
  paymentFrequency: PaymentFrequency;
}

export interface CalculationResult {
  rent: number;
  rentTax: number;
  insurance: number;
  water: number;
  commission: number;
  commissionTax: number;
  total: number;
}
