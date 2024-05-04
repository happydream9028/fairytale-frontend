import { createContext, ReactNode, useEffect, useState } from "react";

import { FairytaleContextType } from "../types/auth";

import {
  useLoginMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useSendPasswordResetEmailMutation,
} from "../redux/appQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserIdFromToken, isTokenValid, setSession } from "../utils/jwt";

const AuthContext = createContext<FairytaleContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const isValidToken = isTokenValid(accessToken);
  const [userId, setUserId] = useState(getUserIdFromToken());
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isValidToken as boolean);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();
  const { data: user, isLoading: authUserLoading } = useGetUserByIdQuery(userId);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setIsInitialized(true);
    if (!isValidToken && pathname.includes("private")) {
      if (accessToken) setSession(null);
      navigate("/auth/signin");
    } else if (!isValidToken && pathname === "/") {
      navigate("/auth/signin");
    } else if (isValidToken && pathname.includes("auth")) {
      navigate(-1);
    } else {
      setIsAuthenticated(true);
      setAuthenticatedUser(user);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data } = (await login({
      username: email,
      password,
    })) as { data: any };
    setSession(data.token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await logout({});
    setSession(null);
    navigate("/auth/signin");
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const { data } = (await login({
      username: email,
      password,
    })) as { data: any };
    sessionStorage.setItem("accessToken", data.accessToken);
  };

  const sendResetPawwordEmail = async (email: string) => {
    (await sendPasswordResetEmail(email)) as { data: any };
    return { emailSent: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        authenticatedUser,
        method: "default",
        signIn,
        signOut,
        signUp,
        sendResetPawwordEmail,
        authUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
