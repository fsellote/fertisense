import { createContext, useContext, useState } from 'react';

export type FertilizerPrices = {
  urea: number;
  ssp: number;
  mop: number;
  dap: number;
  npk: number;
};

const defaultPrices: FertilizerPrices = {
  urea: 25,
  ssp: 22,
  mop: 30,
  dap: 28,
  npk: 27,
};

const FertilizerContext = createContext<{
  prices: FertilizerPrices;
  setPrices: (prices: FertilizerPrices) => void;
}>({
  prices: defaultPrices,
  setPrices: () => {},
});

export function useFertilizerPrices() {
  return useContext(FertilizerContext);
}

export function FertilizerProvider({ children }: { children: React.ReactNode }) {
  const [prices, setPrices] = useState<FertilizerPrices>(defaultPrices);

  return (
    <FertilizerContext.Provider value={{ prices, setPrices }}>
      {children}
    </FertilizerContext.Provider>
  );
}
