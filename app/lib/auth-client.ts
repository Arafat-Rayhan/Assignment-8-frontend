import { createAuthClient } from "better-auth/react";

export type AuthUser = {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
};

export type AuthSession = {
  user: AuthUser | null;
};

export type SessionState = {
  data: AuthSession | null;
  isPending: boolean;
};

type AuthActionResult = {
  error?: { message?: string } | null;
  [key: string]: unknown;
};

type SignInMethod = {
  email: (payload: Record<string, unknown>) => Promise<AuthActionResult>;
  social: (payload: {
    provider: string;
    callbackURL?: string;
    [key: string]: unknown;
  }) => Promise<AuthActionResult>;
};

type SignUpMethod = {
  email: (payload: Record<string, unknown>) => Promise<AuthActionResult>;
};

type AuthClientMethods = {
  useSession: () => SessionState;
  getSession: () => Promise<{
    data: AuthSession | null;
    error?: { message?: string } | null;
  }>;
  signIn: SignInMethod;
  signUp: SignUpMethod;
  signOut: (options?: Record<string, unknown>) => Promise<AuthActionResult>;
};

const authClientBase = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}) as unknown as AuthClientMethods;

export const authClient = authClientBase;

export const useSession: AuthClientMethods["useSession"] = authClient.useSession;
export const getSession: AuthClientMethods["getSession"] = authClient.getSession;
export const signIn: AuthClientMethods["signIn"] = authClient.signIn;
export const signUp: AuthClientMethods["signUp"] = authClient.signUp;
export const signOut: AuthClientMethods["signOut"] = authClient.signOut;