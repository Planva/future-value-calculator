import React, { createContext, useContext, useState, useEffect } from 'react';

interface Calculation {
  id: string;
  type: string;
  name: string;
  date: string;
  result: any;
  inputs: any;
}

interface SavedCalculationsContextType {
  savedCalculations: Calculation[];
  saveCalculation: (type: string, name: string, result: any, inputs: any) => void;
  deleteCalculation: (id: string) => void;
  clearAllCalculations: () => void;
}

const SavedCalculationsContext = createContext<SavedCalculationsContextType | undefined>(undefined);

export function SavedCalculationsProvider({ children }: { children: React.ReactNode }) {
  const [savedCalculations, setSavedCalculations] = useState<Calculation[]>(() => {
    const saved = localStorage.getItem('savedCalculations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
  }, [savedCalculations]);

  const saveCalculation = (type: string, name: string, result: any, inputs: any) => {
    const newCalculation: Calculation = {
      id: Date.now().toString(),
      type,
      name,
      date: new Date().toISOString(),
      result,
      inputs
    };

    setSavedCalculations(prev => [newCalculation, ...prev]);
  };

  const deleteCalculation = (id: string) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
  };

  const clearAllCalculations = () => {
    setSavedCalculations([]);
  };

  return (
    <SavedCalculationsContext.Provider value={{
      savedCalculations,
      saveCalculation,
      deleteCalculation,
      clearAllCalculations
    }}>
      {children}
    </SavedCalculationsContext.Provider>
  );
}

export function useSavedCalculations() {
  const context = useContext(SavedCalculationsContext);
  if (context === undefined) {
    throw new Error('useSavedCalculations must be used within a SavedCalculationsProvider');
  }
  return context;
}