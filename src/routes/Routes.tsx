import { Routes, Route } from 'react-router-dom'
import { Homepage, FormPage, AdminPage } from '../pages'
import ProtectedRoutes from './ProtectedRoutes';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/get-quote' element={<FormPage />} />
            <Route path='/admin-page' element={
                <ProtectedRoutes>
                    <AdminPage />
                </ProtectedRoutes>
            } />
        </Routes>
    );
};

export default RoutesComponent;