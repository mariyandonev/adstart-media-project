import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    const storedPass = localStorage.getItem('adminPass');

    if (!storedUser || !storedPass) {
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (authorized === false) return <Navigate to='/' />;

  return <>{children}</>;
};

export default ProtectedRoutes;
