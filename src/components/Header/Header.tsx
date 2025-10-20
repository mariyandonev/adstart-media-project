import { useNavigate } from 'react-router';
import brixLogo from '../../assets/brix-templates-logo.png';
import { useAuth } from '../../context';
import { CustomButton } from '../CustomButton';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout();
        navigate('/');
    }

    return (
        <header className='flex flex-col sm:flex-row items-center justify-between py-6 md:py-11 px-4 md:pl-[99.34px] md:pr-8'>
            <img
                onClick={() => navigate('/')}
                src={brixLogo}
                alt='brix-logo'
                className='h-10 md:h-[41px] w-auto md:w-[305px] hover:cursor-pointer mb-4 md:mb-0'
            />
            {user && <CustomButton label='Logout' buttonType='small' onClick={handleLogout} />}
        </header>
    )
}

export default Header;
