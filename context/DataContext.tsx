import React, { createContext, ReactNode, useContext, useState } from 'react';

// Type Definitions
export type Farmer = {
  id: string;
  name: string;
  code: string;
};

export type Reading = {
  name: string;
  code: string;
  date: string;
  n: number;
  p: number;
  k: number;
  recommendation: string[];
};

// Define the context shape
type DataContextType = {
  farmers: Farmer[];
  addFarmer: (farmer: Farmer) => void;
  readings: Reading[];
  addReading: (reading: Reading) => void;
  deleteReading: (index: number) => void;
  updateReading: (index: number, updated: Reading) => void;
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider props
type DataProviderProps = {
  children: ReactNode;
};

// Context Provider
export const DataProvider = ({ children }: DataProviderProps) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  const addFarmer = (farmer: Farmer) => {
    setFarmers((prev) => [...prev, farmer]);
  };

  const addReading = (reading: Reading) => {
    setReadings((prev) => [...prev, reading]);
  };

  const deleteReading = (index: number) => {
    setReadings((prev) => prev.filter((_, i) => i !== index));
  };

  const updateReading = (index: number, updated: Reading) => {
    setReadings((prev) => prev.map((item, i) => (i === index ? updated : item)));
  };

  return (
    <DataContext.Provider
      value={{
        farmers,
        addFarmer,
        readings,
        addReading,
        deleteReading,
        updateReading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook to use context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
