import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Types ---
export type FertilizerPrices = {
  urea: number;
  ssp: number;
  mop: number;
  dap: number;
  npk: number;
};

export type FertilizerPlan = {
  label: string;
  price: number;
  items: {
    [key: string]: number; // Example: { urea: 100, ssp: 50 } in kilograms
  };
};

export type FertilizerResult = {
  n: number;
  p: number;
  k: number;
  ph: number;
  fertilizerPlans: FertilizerPlan[];
};

export type PriceUnit = 'perSack' | 'perKg';

type FertilizerContextType = {
  prices: FertilizerPrices;
  setPrices: (prices: FertilizerPrices) => void;
  priceUnit: PriceUnit;
  setPriceUnit: (unit: PriceUnit) => void;
  result: FertilizerResult | null;
  setResult: (result: FertilizerResult) => void;
};

// --- Defauldt fertilizer prices (₱ per 50kg sack) ---
const defaultPricesPerSack: FertilizerPrices = {
  urea: 950,
  ssp: 850,
  mop: 900,
  dap: 1100,
  npk: 950,
};

// --- Convert ₱ per sack to ₱ per kg ---
const convertToKg = (sackPrices: FertilizerPrices): FertilizerPrices => {
  const perKg = (value: number) => parseFloat((value / 50).toFixed(2));
  return {
    urea: perKg(sackPrices.urea),
    ssp: perKg(sackPrices.ssp),
    mop: perKg(sackPrices.mop),
    dap: perKg(sackPrices.dap),
    npk: perKg(sackPrices.npk),
  };
};

// --- Create context ---
const FertilizerContext = createContext<FertilizerContextType | null>(null);

// --- Provider ---
export const FertilizerProvider = ({ children }: { children: React.ReactNode }) => {
  const [priceUnit, setPriceUnit] = useState<PriceUnit>('perSack');
  const [prices, setPrices] = useState<FertilizerPrices>(
    priceUnit === 'perKg' ? convertToKg(defaultPricesPerSack) : defaultPricesPerSack
  );
  const [result, setResult] = useState<FertilizerResult | null>(null);

  // Automatically update prices when priceUnit changes
  useEffect(() => {
    setPrices(priceUnit === 'perKg' ? convertToKg(defaultPricesPerSack) : defaultPricesPerSack);
  }, [priceUnit]);

  return (
    <FertilizerContext.Provider
      value={{ prices, setPrices, priceUnit, setPriceUnit, result, setResult }}
    >
      {children}
    </FertilizerContext.Provider>
  );
};

// --- Custom Hook ---
export const useFertilizer = () => {
  const context = useContext(FertilizerContext);
  if (!context) {
    throw new Error('useFertilizer must be used within a FertilizerProvider');
  }
  return context;
};
