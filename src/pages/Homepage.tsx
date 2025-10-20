import { useNavigate } from 'react-router';
import { CustomButton, CustomInput } from '../components';
import { useState, type ChangeEvent } from 'react';
import type { FieldInput } from '../components/CustomForm/Steps/types';
import { useAuth } from '../context';

const Homepage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isAdminFormOpen, setIsAdminFormOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<FieldInput>({ value: '', errorMessage: '' });
    const [password, setPassword] = useState<FieldInput>({ value: '', errorMessage: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        setField: React.Dispatch<React.SetStateAction<FieldInput>>
    ) => {
        setField(prev => ({ ...prev, value: e.target.value }));
    };

    const handleBlur = (
        e: ChangeEvent<HTMLInputElement>,
        setField: React.Dispatch<React.SetStateAction<FieldInput>>
    ) => {
        const trimmedValue = e.target.value.trim();
        setField(prev => ({
            ...prev,
            errorMessage: trimmedValue ? '' : 'This field is required',
        }));
    };

    const handleLogin = async () => {
        const trimmedUser = username.value.trim();
        const trimmedPass = password.value.trim();

        if (!trimmedUser || !trimmedPass) {
            if (!trimmedUser) setUsername(prev => ({ ...prev, errorMessage: 'This field is required' }));
            if (!trimmedPass) setPassword(prev => ({ ...prev, errorMessage: 'This field is required' }));
            return;
        }

        try {
            setIsLoading(true);
            await login(trimmedUser, trimmedPass);
            navigate('/admin-page');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            setPassword(prev => ({ ...prev, errorMessage: 'Invalid username or password' }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mx-auto text-center'>
            <h2 className='font-bold text-3xl mb-3'>Welcome to Brix <span className='text-[#4A3AFF]'>Templates</span></h2>
            <div className='flex gap-5 justify-center items-center mt-8'>
                {isAdminFormOpen ?
                    <svg
                        onClick={() => setIsAdminFormOpen(false)}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='size-13 border-3 hover:cursor-pointer hover:opacity-75 rounded-full border-[#4A3AFF]'
                    >
                        <path stroke-linecap='round' stroke-linejoin='round' d='M6 18 18 6M6 6l12 12' />
                    </svg>
                    :
                    <CustomButton buttonType='secondary' label='Admin Page' onClick={() => setIsAdminFormOpen(true)} />
                }
                <CustomButton buttonType='primary' label='Get project quote' onClick={() => navigate('/get-quote')} />
            </div>
            {isAdminFormOpen &&
                <div className='flex flex-col items-center'>
                    <div className='flex gap-5 justify-center items-center my-8 flex-col'>
                        <CustomInput
                            type='text'
                            name='Username'
                            placeholder='username'
                            value={username.value}
                            errorMessage={username.errorMessage}
                            onChange={e => handleChange(e, setUsername)}
                            onBlur={e => handleBlur(e, setUsername)}
                            classes='p-3'
                        />
                        <CustomInput
                            type='password'
                            name='Password'
                            placeholder='password'
                            value={password.value}
                            errorMessage={password.errorMessage}
                            onChange={e => handleChange(e, setPassword)}
                            onBlur={e => handleBlur(e, setPassword)}
                            classes='p-3'
                        />
                    </div>
                    <CustomButton
                        label={isLoading ? 'Logging in...' : 'Login'}
                        buttonType='small'
                        onClick={handleLogin}
                        classes='px-8'
                    />
                </div>
            }
        </div>
    )
}

export default Homepage;