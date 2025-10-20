import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Step1Data, Step2Data, Step3Data } from '../components/CustomForm/Steps/types';

export interface FormData {
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
}

interface FormContextType {
    formData: FormData;
    updateStepData: (step: keyof FormData, data: Step1Data | Step2Data | Step3Data) => void;
    hasError: boolean;
    setHasError: (value: boolean) => void;
}

const FormContext = createContext<FormContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useForm = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) throw new Error('useForm must be used within FormProvider');
    return context;
};

interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
    const [hasError, setHasError] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormData>({
        step1: {
            name: { value: '', errorMessage: '' },
            email: { value: '', errorMessage: '' },
            phoneNumber: { value: '', errorMessage: '' },
            company: { value: '', errorMessage: '' },
        },
        step2: {
            choices: [],
            other: { value: '', errorMessage: '' },
        },
        step3: {
            budget: '',
        },
    });

    const updateStepData = (step: string, data: Step1Data | Step2Data | Step3Data) => {
        setFormData((prev) => ({
            ...prev,
            [step]: data
        }));
    };

    return (
        <FormContext.Provider value={{ formData, updateStepData, hasError, setHasError }}>
            {children}
        </FormContext.Provider>
    );
};