// AuthContext.js
import { createContext, useContext } from 'react';
import { isUserTokenExpired } from '@utils';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const isLoggedIn = isUserTokenExpired();

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
