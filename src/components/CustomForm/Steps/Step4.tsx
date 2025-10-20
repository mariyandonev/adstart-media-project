import axios, { AxiosError } from 'axios';
import type { FormData } from '../../../context/FormContext';
import { CustomButton } from '../../CustomButton';
import { formatFormData } from './utils';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Step4 = ({ data }: { data: FormData }) => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const dataToSend = formatFormData(data);

        try {
            await axios.post('http://localhost:5000/submit-form', dataToSend);
            setSuccess(true);
            // wait 1.5 seconds before redirect
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('Error submitting form:', error.message);
            }
        }
    }

    return (
        <div className='p-19 flex flex-col items-center justify-center'>
            <svg width='158' height='145' viewBox='0 0 158 145' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect opacity='0.5' x='14.4922' y='0.664062' width='51.5427' height='51.5427' rx='10' fill='#9E96FF' />
                <rect opacity='0.5' x='128.443' y='33.5342' width='29.3594' height='29.3594' rx='10' fill='#9E96FF' />
                <rect opacity='0.5' x='0.443359' y='75.5342' width='31.5329' height='31.5329' rx='8' fill='#DEDBFF' />
                <rect opacity='0.5' x='114.73' y='107.485' width='36.5935' height='36.5935' rx='8' fill='#DEDBFF' />
                <circle cx='83.9199' cy='79.0391' r='60' fill='#4A3AFF' />
                <g filter='url(#filter0_d_901_14136)'>
                    <path d='M61.2031 82.2843L74.1836 95.2648L106.635 62.8135' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' />
                </g>
                <defs>
                    <filter id='filter0_d_901_14136' x='27.2031' y='32.8135' width='113.432' height='100.451' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
                        <feFlood flood-opacity='0' result='BackgroundImageFix' />
                        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
                        <feOffset dy='4' />
                        <feGaussianBlur stdDeviation='15' />
                        <feColorMatrix type='matrix' values='0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.3 0' />
                        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_901_14136' />
                        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_901_14136' result='shape' />
                    </filter>
                </defs>
            </svg>
            <div className='text-center flex flex-col items-center'>
                <h2 className='font-bold text-2xl mb-3'>Submit your quote request</h2>
                <p className='mb-9'>Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.</p>
                <CustomButton label='Submit' buttonType='primary' onClick={handleSubmit} />
                {success && (
                    <p className='mt-4 text-green-600 text-xl'>Submission successful! Will redirect in a milisecond...</p>
                )}
            </div>
        </div>
    );
};

export default Step4;
