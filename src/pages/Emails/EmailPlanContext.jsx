import React, { createContext, useContext, useState, useCallback } from 'react';

const EmailPlanContext = createContext();

export const useEmailPlan = () => useContext(EmailPlanContext);

export const EmailPlanProvider = ({ children }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const selectPlan = useCallback((id) => setSelectedPlanId(id), []);
  const clearPlan = useCallback(() => setSelectedPlanId(null), []);

  return (
    <EmailPlanContext.Provider value={{ selectedPlanId, selectPlan, clearPlan }}>
      {children}
    </EmailPlanContext.Provider>
  );
};

// Alias export – allows imports to use either name
export const useEmailPlanContext = useEmailPlan;