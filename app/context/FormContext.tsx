import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
} from "react";

// Define the shape of the form state
export interface FormState {
  professionalTitle?: string;
  yearsExperience?: number;
  organization?: string;
  linkedIn?: string;
  professionalSummary?: string;
  timeZone?: string;
  pronouns?: string;
  languages?: string[];
  expertise?: string[];
  recentAchievements?: string;
  achievements?: string;
  collaboration?: boolean;
  mentorship?: boolean;
  openSource?: boolean;
  contactPreferences?: {
    email: boolean;
    linkedin: boolean;
    calendly: boolean;
    calendlyLink?: string;
  };
}

type FormAction =
  | { type: "SET_FORM_DATA"; payload: any }
  | { type: "UPDATE_FIELD"; payload: { field: keyof FormState; value: any } };

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, ...action.payload };
    case "UPDATE_FIELD":
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
    <FormContext.Provider
      value={{ state, dispatch, currentStep, setCurrentStep }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}

export function ProfessionalSummaryInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}: StepComponentProps) {
  const { dispatch } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field: "professionalSummary", value: newValue },
    });
  };

  return (
    <div className="relative w-full px-12 py-12">
      <Textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Write a brief professional summary..."
        className="w-full min-h-[200px] py-8 px-8 rounded-xl bg-white dark:bg-gray-900 border-2 border-transparent text-2xl focus:border-2 focus:border-black dark:focus:border-white transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
      />
      <div className="absolute right-10 bottom-2 flex items-end gap-1">
        <kbd className="hidden sm:inline-flex">
          <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
            Shift + Enter for new line | Enter ↵ to continue
          </span>
        </kbd>
      </div>
    </div>
  );
}
