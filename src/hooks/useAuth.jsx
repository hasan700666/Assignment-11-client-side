import React, { use } from "react";
import { AuthContext } from "../firebase/auth/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
