import React, { createContext, ReactNode, useContext, useState } from 'react';

// ✅ 1. Define your types
export type Farmer = {
  id: string;
  name: string;
  code: string; // <-- Added this to fix the `item.code` error
};

export type Reading = {
  name: string;
  code: string;
  date: string;
  n: number;
  p: number;
  k: number;
  recommendation: string[]; // You can change this to string[] | undefined if needed
};

// ✅ 2. Context type
type DataContextType = {
  farmers: Farmer[];
  addFarmer: (farmer: Farmer) => void;
  readings: Reading[];
  addReading: (reading: Reading) => void;
};

// ✅ 3. Create context with type
const DataContext = createContext<DataContextType | undefined>(undefined);

// ✅ 4. Props for provider
type DataProviderProps = {
  children: ReactNode;
};

// ✅ 5. The actual context provider
export const DataProvider = ({ children }: DataProviderProps) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  const addFarmer = (farmer: Farmer) => {
    setFarmers((prev) => [...prev, farmer]);
  };

  const addReading = (reading: Reading) => {
    setReadings((prev) => [...prev, reading]);
  };

  return (
    <DataContext.Provider value={{ farmers, addFarmer, readings, addReading }}>
      {children}
    </DataContext.Provider>
  );
};

// ✅ 6. Hook to consume the context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
