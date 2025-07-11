import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/Authcontext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
