import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiousInstance = () => {
  const { user } = useAuth();
  const instance = axios.create({
    baseURL: "https://mokshed-server-side.vercel.app",
  });


  useEffect(() => {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
  });
  return instance;
};

export default useAxiousInstance;
