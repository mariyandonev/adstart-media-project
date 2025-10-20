export interface FieldInput {
    value: string;
    errorMessage: string;
}

export interface Step1Data {
    name: FieldInput;
    email: FieldInput;
    phoneNumber: FieldInput;
    company: FieldInput;
}

export interface Step1Props {
    data: Step1Data;
    onChange: (data: Step1Data) => void;
}

export interface Step2Data {
    choices: string[];
    other?: FieldInput;
}

export interface Step2Props {
    data: Step2Data;
    onChange: (data: Step2Data) => void;
}

export interface Step3Data {
    budget: string;
}

export interface Step3Props {
    data: Step3Data;
    onChange: (data: Step3Data) => void;
}