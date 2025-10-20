/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomForm from '../components/CustomForm/CustomForm';

jest.mock('../context', () => ({
    useForm: () => ({
        formData: {
            step1: {},
            step2: {},
            step3: {},
        },
        updateStepData: jest.fn(),
        hasError: false,
    }),
}));

jest.mock('../components/CustomButton', () => ({
    CustomButton: ({ onClick, label, isDisabled }: any) => (
        <button disabled={isDisabled} onClick={onClick}>{label}</button>
    )
}));

jest.mock('../components/CustomForm/FormHeader', () => ({ stepCount }: any) => <div>Step {stepCount}</div>);

jest.mock('../components/CustomForm/Steps', () => ({
    Step1: () => <div>Step1 Component</div>,
    Step2: () => <div>Step2 Component</div>,
    Step3: () => <div>Step3 Component</div>,
    Step4: () => <div>Step4 Component</div>,
}));

describe('CustomForm Component', () => {
    it('renders first step initially', () => {
        render(<CustomForm />);
        expect(screen.getByText('Step 0')).toBeInTheDocument();
        expect(screen.getByText('Step1 Component')).toBeInTheDocument();

        expect(screen.getByText('Next step')).toBeInTheDocument();
        expect(screen.queryByText('Previous step')).not.toBeInTheDocument();
    });

    it('navigates through steps using buttons', () => {
        render(<CustomForm />);

        const nextButton = screen.getByText('Next step');

        fireEvent.click(nextButton);
        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step2 Component')).toBeInTheDocument();
        expect(screen.getByText('Previous step')).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByText('Step 2')).toBeInTheDocument();
        expect(screen.getByText('Step3 Component')).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByText('Step 3')).toBeInTheDocument();
        expect(screen.getByText('Step4 Component')).toBeInTheDocument();

        expect(screen.queryByText('Next step')).not.toBeInTheDocument();
    });

    it('goes back to previous steps', () => {
        render(<CustomForm />);
        const nextButton = screen.getByText('Next step');

        fireEvent.click(nextButton);
        const prevButton = screen.getByText('Previous step');
        fireEvent.click(prevButton);

        expect(screen.getByText('Step 0')).toBeInTheDocument();
        expect(screen.getByText('Step1 Component')).toBeInTheDocument();
    });
});
