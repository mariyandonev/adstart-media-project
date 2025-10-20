import { useEffect, type ChangeEvent } from 'react';
import { CustomInput } from '../../CustomInput';
import type { Step1Data, Step1Props } from './types';
import { useForm } from '../../../context';
import { step1Fields } from './fields';

const Step1 = ({ data, onChange }: Step1Props) => {
  const { setHasError } = useForm();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...data, [name]: { ...data[name as keyof Step1Data], value } });
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    let errorMessage = '';

    if (!trimmedValue) {
      errorMessage = 'The field is required';
    } else {
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedValue)) {
          errorMessage = 'Invalid email format';
        }
      }

      if (name === 'phoneNumber') {
        const onlyDigits = /^\d+$/;
        if (!onlyDigits.test(trimmedValue)) {
          errorMessage = 'Only numbers allowed';
        }
      }
    }

    onChange({
      ...data,
      [name]: {
        ...data[name as keyof Step1Data],
        value: trimmedValue,
        errorMessage,
      },
    });
  };

  useEffect(() => {
    const hasAnyError = Object.values(data).some(
      (field) => !field.value.trim() || field.errorMessage
    );
    setHasError(hasAnyError);
  }, [data, setHasError]);

  return (
    <div className='mt-10 flex flex-col gap-20 p-4 md:p-8'>
      <div>
        <h2 className='text-h2 font-heading mb-3'>Contact details</h2>
        <p className='text-paragraph text-neutral-600'>
          Lorem ipsum dolor sit amet consectetur adipisc.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
        {step1Fields.map(({ key, type, label, placeholder, icon }) => (
          <div key={label} className='relative w-full'>
            <p className='text-paragraph mb-4 font-medium'>{`${label}*`}</p>

            <CustomInput
              type={type}
              name={key}
              classes='p-5 pr-12 w-full'
              placeholder={placeholder}
              value={data[key].value}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={data[key].errorMessage}
            />

            <div className='absolute top-[78px] right-6 -translate-y-1/2 text-neutral-400 pointer-events-none'>
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;
