import * as React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/auth/signin");
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
