import { useEffect, type ChangeEvent } from 'react';
import type { Step2Props } from './types';
import { CustomInput } from '../../CustomInput';
import { useForm } from '../../../context';
import { step2Fields } from './fields';

const Step2 = ({ data, onChange }: Step2Props) => {
  const { setHasError } = useForm();
  const { choices, other } = data;

  const handleClick = (key: string) => {
    const updatedChoices = choices.includes(key)
      ? choices.filter((el) => el !== key)
      : [...choices, key];

    const updatedOther =
      key === 'other' && choices.includes('other')
        ? { value: '', errorMessage: '' }
        : other;

    onChange({
      ...data,
      choices: updatedChoices,
      other: updatedOther,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange({
      ...data,
      other: {
        ...data.other,
        value,
        errorMessage: data.other?.errorMessage || '',
      },
    });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange({
      ...data,
      other: {
        value: data.other?.value || '',
        errorMessage: value.trim() === '' ? 'This field is required' : '',
      },
    });
  };

  useEffect(() => {
    let hasError = false;

    if (choices.length === 0) hasError = true;

    if (choices.includes('other')) {
      if (!other || other.value.trim() === '') hasError = true;
    }

    setHasError(hasError);
  }, [choices, other, setHasError]);

  return (
    <div className='mt-10 flex flex-col gap-20 p-4 md:p-8'>
      <div>
        <h2 className='text-h2 font-heading mb-3'>Our Services</h2>
        <p className='text-paragraph text-neutral-600'>
          Please select which service you are interested in.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
        {step2Fields.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => handleClick(key)}
            className={`${
              choices.includes(key)
                ? 'border-primary1'
                : 'border-transparent'
            } p-5 shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)] flex gap-4 items-center border-2 hover:border-primary1 hover:cursor-pointer rounded-2xl`}
          >
            <div className='rounded-full p-3 bg-[rgba(74,58,255,0.15)]'>{icon}</div>
            <p className='text-paragraph font-medium'>{label}</p>
          </div>
        ))}
      </div>

      {choices.includes('other') && (
        <CustomInput
          type='text'
          name='other'
          placeholder='Other service...'
          value={other?.value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={other?.errorMessage}
          classes='p-5 w-full'
          label='Other Service'
        />
      )}
    </div>
  );
};

export default Step2;
