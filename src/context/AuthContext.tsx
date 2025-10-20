import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    user: string | null;
    pass: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    pass: null,
    isAuthenticated: false,
    login: async () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(() => localStorage.getItem('adminUser'));
    const [pass, setPass] = useState<string | null>(() => localStorage.getItem('adminPass'));

    const login = async (username: string, password: string) => {
        localStorage.setItem('adminUser', username);
        localStorage.setItem('adminPass', password);
        setUser(username);
        setPass(password);
    };

    const logout = () => {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminPass');
        setUser(null);
        setPass(null);
    };

    const isAuthenticated = !!user && !!pass;

    return (
        <AuthContext.Provider value={{ user, pass, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
