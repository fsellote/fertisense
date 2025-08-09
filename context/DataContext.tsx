// context/DataContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

// --- Types ---
// Fertilizer plan per stage
export type FertilizerPlan = {
  stage: string;
  type: string;
  amount: string;
  price: number; // number for calculations
};

// Sensor data structure
export type SensorData = {
  timestamp: string;
  n: number;
  p: number;
  k: number;
  ph?: number;
};

// Reading data (collected data + recommendations)
export type Reading = {
  name: string;
  code: string;
  date: string;
  n: number;
  p: number;
  k: number;
  ph?: number;
  recommendation?: string[]; // [filipino, english]
  sensorData?: SensorData[];
  fertilizerPlans?: FertilizerPlan[];
};

// Farmer info
export type Farmer = {
  id: string;
  name: string;
  code: string;
  location: string;
  farmSize: string;
  riceType: string;
  cropStyle: string;
};

// Context shape
type DataContextType = {
  readings: Reading[];
  setReadings: React.Dispatch<React.SetStateAction<Reading[]>>;
  addReading: (reading: Reading) => void;

  farmers: Farmer[];
  setFarmers: React.Dispatch<React.SetStateAction<Farmer[]>>;
  addFarmer: (farmer: Farmer) => void;

  latestSensorData: SensorData | null;
  setLatestSensorData: React.Dispatch<React.SetStateAction<SensorData | null>>;
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [latestSensorData, setLatestSensorData] = useState<SensorData | null>(null);

  const addReading = (reading: Reading) => {
    setReadings(prev => [...prev, reading]);
  };

  const addFarmer = (farmer: Farmer) => {
    setFarmers(prev => [...prev, farmer]);
  };

  return (
    <DataContext.Provider
      value={{
        readings,
        setReadings,
        addReading,
        farmers,
        setFarmers,
        addFarmer,
        latestSensorData,
        setLatestSensorData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
