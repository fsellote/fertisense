import React, { createContext, useContext, useState } from 'react';

interface Farmer {
  name: string;
  code: string;
}

interface Reading {
  farmerName: string;
  code: string;
  npk: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  moisture: number;
  timestamp: string;
}

interface DataContextType {
  farmers: Farmer[];
  setFarmers: React.Dispatch<React.SetStateAction<Farmer[]>>;
  readings: Reading[];
  setReadings: React.Dispatch<React.SetStateAction<Reading[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  return (
    <DataContext.Provider value={{ farmers, setFarmers, readings, setReadings }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// ✅ Exporting the provider as default
export default DataProvider;
