import React, { createContext, useContext, useReducer, useState, ReactNode } from 'react';

// Define the shape of the form state
export interface FormState {
  professionalTitle?: string;
  yearsExperience?: number;
  organization?: string;
  linkedIn?: string;
  // Add other form fields as needed
}

type FormAction = 
  | { type: 'SET_FORM_DATA'; payload: any }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof FormState; value: any } };

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return { ...state, ...action.payload };
    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, {});
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormContext.Provider value={{ state, dispatch, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
