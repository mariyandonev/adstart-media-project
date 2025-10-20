import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '../components/CustomButton/CustomButton';

describe('CustomButton', () => {
    const label = 'Click Me';
    const onClick = jest.fn();

    it('renders with primary type', () => {
        render(<CustomButton label={label} buttonType='primary' onClick={onClick} />);
        const button = screen.getByRole('button', { name: label });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-[color:var(--color-primary1)]');
        expect(button).toHaveClass('text-white');
        expect(button).toHaveClass('h-12');
        expect(button).not.toBeDisabled();
    });

    it('renders with secondary type', () => {
        render(<CustomButton label={label} buttonType='secondary' onClick={onClick} />);
        const button = screen.getByRole('button', { name: label });
        expect(button).toHaveClass('bg-white');
        expect(button).toHaveClass('text-[color:var(--color-primary1)]');
        expect(button).toHaveClass('border');
        expect(button).toHaveClass('h-12');
    });

    it('renders with small type', () => {
        render(<CustomButton label={label} buttonType='small' onClick={onClick} />);
        const button = screen.getByRole('button', { name: label });
        expect(button).toHaveClass('h-12');
        expect(button).toHaveClass('md:w-auto');
        expect(button).toHaveClass('bg-[color:var(--color-primary1)]');
        expect(button).toHaveClass('text-white');
    });

    it('calls onClick when clicked', () => {
        render(<CustomButton label={label} buttonType='primary' onClick={onClick} />);
        const button = screen.getByRole('button', { name: label });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isDisabled is true', () => {
        render(<CustomButton label={label} buttonType='primary' onClick={onClick} isDisabled />);
        const button = screen.getByRole('button', { name: label });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('bg-[color:var(--color-neutral-500)]');
        expect(button).toHaveClass('opacity-70');
    });

    it('applies additional classes', () => {
        render(
            <CustomButton
                label={label}
                buttonType='primary'
                onClick={onClick}
                classes='custom-class'
            />
        );
        const button = screen.getByRole('button', { name: label });
        expect(button).toHaveClass('custom-class');
    });
});