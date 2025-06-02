import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../Services/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, allowedRoles, ...rest }) {

    const isAuth = authService.isAuthenticated();

    const checkRoles = () => {
        return true;
    }

    return (

        isAuth ? (<Route {...rest} render={
            props => {
                if (checkRoles) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/unauthorized',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
        ) : (<Navigate to="/login" />)
    )
};
