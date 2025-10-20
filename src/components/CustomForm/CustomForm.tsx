import { useState } from 'react';
import FormHeader from './FormHeader';
import { CustomButton } from '../CustomButton';
import { Step1, Step2, Step3, Step4 } from './Steps';
import { useForm } from '../../context';

const CustomForm = () => {
    const [stepCount, setStepCount] = useState(0);
    const { formData, updateStepData, hasError } = useForm();

    const handleNextStep = () => {
        setStepCount((value) => value + 1);
    }

    const handleBackStep = () => {
        setStepCount((value) => value - 1);
    }

    const steps = () => {
        switch (stepCount) {
            case 0:
                return <Step1 data={formData.step1} onChange={(data) => updateStepData('step1', data)} />;
            case 1:
                return <Step2 data={formData.step2} onChange={(data) => updateStepData('step2', data)} />;
            case 2:
                return <Step3 data={formData.step3} onChange={(data) => updateStepData('step3', data)} />;
            case 3:
                return <Step4 data={formData} />;
            default:
                return null;
        }
    }

    return (
        <div className='w-full max-w-[800px] mx-auto px-4 md:px-[50px]'>
            <div className='mb-8 max-w-[698px] mx-auto rounded-[34px] shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)] px-4 md:px-[50px] py-6 md:py-[40px]'>
                <FormHeader stepCount={stepCount} />
                {steps()}
            </div>
            <div className={`flex flex-row ${stepCount === 0 ? 'justify-end' : 'justify-between'} gap-4`}>
                {stepCount !== 0 &&
                    <CustomButton
                        onClick={handleBackStep}
                        label='Previous step'
                        buttonType='secondary'
                        classes='w-full sm:w-auto'
                    />
                }
                {stepCount !== 3 &&
                    <CustomButton
                        onClick={handleNextStep}
                        label='Next step'
                        buttonType='primary'
                        isDisabled={hasError}
                        classes='p-5'
                    />
                }
            </div>
        </div>
    );
};

export default CustomForm;