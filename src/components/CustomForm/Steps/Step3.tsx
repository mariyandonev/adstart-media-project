import { useEffect, useState } from 'react';
import { CustomInput } from '../../CustomInput';
import type { Step3Props } from './types';
import { useForm } from '../../../context';
import { step3Fields } from './fields';

const Step3 = ({ data, onChange }: Step3Props) => {
  const { setHasError } = useForm();
  const [selected, setSelected] = useState<string>(data.budget);

  const handleClick = (value: string) => {
    if (selected === value) return;

    setSelected(value);
    onChange({ ...data, budget: value });
  };

  useEffect(() => {
    setHasError(data.budget === '');
  }, [data.budget, setHasError]);

  return (
    <div className='mt-10 flex flex-col gap-20 p-4 md:p-8'>
      <div>
        <h2 className='text-h2 font-heading mb-3'>What’s your project budget?</h2>
        <p className='text-paragraph text-neutral-600'>
          Please select the project budget range you have in mind.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
        {step3Fields.map((el) => (
          <div
            key={el}
            className='p-6 md:px-8 md:py-10 shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)] flex gap-4 items-center border-2 border-transparent hover:border-primary1 hover:cursor-pointer rounded-2xl'
            onClick={() => handleClick(el)}
          >
            <CustomInput
              type='radio'
              name={el}
              classes='hover:cursor-pointer'
              label={el}
              value={el}
              checked={selected === el}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3;
