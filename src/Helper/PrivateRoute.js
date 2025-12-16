import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../services/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {

    //const isAuth = Auth.isAuthenticated();
    const isAuth = true;
    //const userRole = Auth.getRole();
    const userRole = "Student";

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
