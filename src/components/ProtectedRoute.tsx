import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    /*
    const auth = useAuth(); // auth is an object containing { user, login, logout }
    const user = auth.user; // Get the `user` from `auth`.
    */
   //useAuth returns object containing { user, login, logout }
   //extracts user directly this way
    const { user } = useAuth();

    if(!user)  {
        return <Navigate to="/login" />;
    }

    return <>{children}</>
}

export default ProtectedRoute;