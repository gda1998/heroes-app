import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    const { user:{logged} } = useContext(AuthContext);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes
                        exact path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ logged }
                    />
                    <PrivateRoutes 
                        path="/" 
                        component={ DashboardRoutes }
                        isAuthenticated={ logged }
                    />
                </Switch>
            </div>
        </Router>
    )
}
