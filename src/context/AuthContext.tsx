import { AxiosError } from 'axios';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    user: string | null;
    password: string | null;
    isAuthenticated: boolean;
    errorMessage: string | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    password: null,
    isAuthenticated: false,
    errorMessage: null,
    isLoading: false,
    login: async () => false,
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(() => localStorage.getItem('adminUser'));
    const [password, setPassword] = useState<string | null>(() => localStorage.getItem('adminPass'));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            if (username === 'admin' && password === '1234') {
                localStorage.setItem('adminUser', username);
                localStorage.setItem('adminPass', password);
                setUser(username);
                setPassword(password);
                return true;
            }

            setError('Invalid username or password');
            return false;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setError(error.message || 'An unexpected error occurred. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminPass');
        setUser(null);
        setPassword(null);
    };

    const isAuthenticated = !!user && !!password;

    return (
        <AuthContext.Provider value={{ user, password, isAuthenticated, login, logout, errorMessage, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
