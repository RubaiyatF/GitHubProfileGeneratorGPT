import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the form state
export interface FormState {
  professionalTitle?: string;
  yearsExperience?: number;
  organization?: string;
  linkedIn?: string;
  // Add other form fields as needed
}

// Define the context type
interface FormContextType {
  formState: FormState;
  updateFormState: (newState: Partial<FormState>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component
export function FormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<FormState>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormState = (newState: Partial<FormState>) => {
    setFormState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <FormContext.Provider value={{ formState, updateFormState, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use the form context
export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
