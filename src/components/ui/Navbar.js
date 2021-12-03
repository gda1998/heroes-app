import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

import './style.css';

export const Navbar = () => {

    const { user:{name}, dispatch } = useContext(AuthContext);

    const history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: types.logout
        });
        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                        Asociaciones
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink 
                                activeClassName="active"
                                className="nav-link" 
                                exact
                                to="/marvel"
                            >
                                Marvel
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                activeClassName="active"
                                className="nav-link" 
                                exact
                                to="/dc"
                            >
                                DC
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                activeClassName="active"
                                className="nav-link" 
                                exact
                                to="/search"
                            >
                                Search
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <span className="text-name mx-3 my-2 nav-item">{ name }</span>
                        <button
                            className="btn link-logout"
                            onClick={ handleLogout }
                        >
                            Logout
                        </button>
                    </div>{/* /.d-flex */}

                </div>{/* /.collapse .navbar-collapse */}

            </div>{/*/.container-fluid */}

        </nav>
    );
}