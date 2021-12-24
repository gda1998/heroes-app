import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../auth/AuthContext';

export const PublicRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user.logged ? <Navigate to="/" /> : children;
}