import type { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';

interface BaseProps {
    name: string;
    label?: string;
    classes?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface TextInputProps extends BaseProps {
    type: 'text' | 'password' | 'number' | 'email';
    value: string;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    errorMessage?: string;
}

interface CheckboxInputProps extends BaseProps {
    type: 'checkbox' | 'radio';
    checked: boolean;
    value: string;
}

type CustomInputProps = TextInputProps | CheckboxInputProps;

const baseClasses =
    'text-neutral-600 rounded-full text-paragraph shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)]';

const CustomInput = (props: CustomInputProps) => {
    const { name, label, onChange, classes = '', ...rest } = props;
    const isCheckbox = props.type === 'checkbox' || props.type === 'radio';

    if (isCheckbox) {
        const { type, value, checked } = props as CheckboxInputProps;

        return (
            <label className='flex items-center gap-2 hover:cursor-pointer font-medium text-paragraph md:text-xl'>
                <input
                    type={type}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={`w-4 h-4 md:w-5 md:h-5 ${classes}`}
                    value={value}
                />
                {label && <span>{label}</span>}
            </label>
        )
    }

    const { type, value, onBlur, onKeyDown, placeholder, errorMessage } = rest as TextInputProps;

    return (
        <div className='flex flex-col w-full'>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className={`${baseClasses} ${classes} ${errorMessage ? 'border-2 border-red-500 focus:outline-none' : ''} w-full md:w-full`}
            />
            <p className='pl-3 text-sm text-red-500 mt-2 md:text-base m-h-[5px]'>{errorMessage}</p>
        </div>
    )
};

export default CustomInput;
