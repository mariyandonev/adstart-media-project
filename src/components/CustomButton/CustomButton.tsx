type ButtonType = 'primary' | 'secondary' | 'small' | 'smallWhite';

interface CustomButtonProps {
  label: string;
  buttonType: ButtonType;
  onClick: () => void;
  isDisabled?: boolean;
  classes?: string;
}

const baseStyles =
  'flex items-center justify-center font-medium rounded-full transition-opacity duration-200 hover:opacity-80 hover:cursor-pointer';

const sizeStyles: Record<ButtonType, string> = {
  primary: 'h-12 md:h-16 md:w-40 p-4',
  secondary: 'h-12 md:h-16 md:w-40 p-4',
  small: 'h-12 md:h-12 md:w-auto p-4',
  smallWhite: 'h-12 md:h-12 md:w-auto p-4',
};

const colorStyles: Record<ButtonType, string> = {
  primary: 'bg-[color:var(--color-primary1)] text-white',
  secondary:
    'bg-white text-[color:var(--color-primary1)] border border-[color:var(--color-primary1)]',
  small: 'bg-[color:var(--color-primary1)] text-white',
  smallWhite: 'bg-white text-[color:var(--color-primary1)] border border-[color:var(--color-primary1)]'
};

const disabledStyles =
  'flex items-center justify-center h-12 md:h-16 md:w-40 bg-[color:var(--color-neutral-500)] rounded-full text-white flex items-center opacity-70';

const CustomButton = ({ label, buttonType, onClick, isDisabled, classes }: CustomButtonProps) => {
  const finalClasses = isDisabled
    ? disabledStyles
    : `${baseStyles} ${sizeStyles[buttonType]} ${colorStyles[buttonType]}`;

  return (
    <button
      onClick={onClick}
      className={`${finalClasses} ${classes ?? ''}`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
