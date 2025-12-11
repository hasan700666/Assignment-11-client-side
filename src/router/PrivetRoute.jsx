import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-infinity size-20"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/user/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivetRoute;
