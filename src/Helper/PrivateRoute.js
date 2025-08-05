import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../Services/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {

    //const isAuth = authService.isAuthenticated();
    const isAuth = true;
    //const userRole = authService.getRole();
    const userRole = "Admin";

    const checkRoles = () => {
        return allowedRoles.includes(userRole);
    }
    return (

        isAuth ? (
            checkRoles() ? (<Outlet />) :
                (<Navigate to="/unauthorized" />)        
        ) : (<Navigate to="/login" />)
    )
};
