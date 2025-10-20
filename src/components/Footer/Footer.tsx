import brixLogo from '../../assets/brix-templates-logo.png';
import { CustomButton } from '../CustomButton';
import { CustomInput } from '../CustomInput';

const Footer = () => {
    return (
        <footer className='py-14 px-4 md:px-[99px] flex flex-col-reverse md:flex-row justify-between items-center border-t border-neutral-400 gap-6 md:gap-0'>
            <div className='flex flex-col md:items-center gap-4 md:gap-6'>
                <img
                    src={brixLogo}
                    alt='brix-logo'
                    className='h-10 md:h-[41px] w-auto md:w-[305px]'
                />
                <p className='text-neutral-600 text-center md:text-left'>
                    Copyright © 2025 BRIX Templates | All Rights Reserved
                </p>
            </div>
            <div className='relative w-full md:w-auto flex justify-center md:justify-end'>
                <CustomInput
                    type='text'
                    name='enter email'
                    placeholder='Enter your email'
                    classes='py-5 pr-32 w-full md:w-[507px] h-[60px] lg:h-[73px] flex-1 pl-4 md:pl-8'
                    value={''}
                    onChange={() => console.log('click')}
                    onBlur={() => console.log('click')}
                />
                <CustomButton
                    onClick={() => console.log('click')}
                    label='Subscribe'
                    buttonType='small'
                    classes='absolute top-[35px] -translate-y-1/2 right-2 px-8'
                />
            </div>
        </footer>
    );
};

export default Footer;
