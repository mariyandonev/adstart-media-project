import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from '../components/CustomInput/CustomInput';

describe('CustomInput Component', () => {
    it('renders a text input with correct props', () => {
        const handleChange = jest.fn();
        const handleBlur = jest.fn();

        render(
            <CustomInput
                type='text'
                name='username'
                value='John'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter username'
                label='Username'
            />
        );

        const input = screen.getByPlaceholderText('Enter username') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('John');
        expect(input.name).toBe('username');
        expect(input).not.toBeChecked();
    });

    it('calls onChange and onBlur handlers for text input', () => {
        const handleChange = jest.fn();
        const handleBlur = jest.fn();

        render(
            <CustomInput
                type='text'
                name='email'
                value=''
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Email'
            />
        );

        const input = screen.getByPlaceholderText('Email') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(handleChange).toHaveBeenCalledTimes(1);

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('displays error message for text input', () => {
        render(
            <CustomInput
                type='text'
                name='username'
                value=''
                onChange={() => { }}
                onBlur={() => { }}
                errorMessage='Required field'
            />
        );

        expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('renders a checkbox input with correct props', () => {
        const handleChange = jest.fn();

        render(
            <CustomInput
                type='checkbox'
                name='agree'
                value='yes'
                checked={true}
                onChange={handleChange}
                label='I agree'
            />
        );

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(true);
        expect(checkbox.name).toBe('agree');
        expect(screen.getByText('I agree')).toBeInTheDocument();
    });

    it('renders a radio input with correct props', () => {
        const handleChange = jest.fn();

        render(
            <CustomInput
                type='radio'
                name='gender'
                value='male'
                onChange={handleChange}
                checked={false}
                label='Male'
            />
        );

        const radio = screen.getByRole('radio') as HTMLInputElement;
        expect(radio).toBeInTheDocument();
        expect(radio.checked).toBe(false);
        expect(radio.name).toBe('gender');
        expect(screen.getByText('Male')).toBeInTheDocument();
    });

});
