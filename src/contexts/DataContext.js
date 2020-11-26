import React, { useContext, useState } from 'react';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [saas, setSaas] = useState();

  const value = {
    saas,
    setSaas,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
