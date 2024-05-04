import { IUser } from "./user";

export type AuthUser = null | Record<string, any>;

export type FairytaleContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  authenticatedUser: IUser | null;
  method: "default";
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  sendResetPawwordEmail: (email: string) => void;
  authUserLoading?: boolean;
};
