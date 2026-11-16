import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";


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

type AuthError = { message?: string } | null;

type AuthActionResult = {
  error?: AuthError;
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

type TokenResult = {
  data: { token: string } | null;
  error?: AuthError;
};

type AuthClientMethods = {
  useSession: () => SessionState;
  getSession: () => Promise<{
    data: AuthSession | null;
    error?: AuthError;
  }>;
  signIn: SignInMethod;
  signUp: SignUpMethod;
  signOut: (options?: Record<string, unknown>) => Promise<AuthActionResult>;
  token: () => Promise<TokenResult>; 
};


const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL ||
      process.env.BETTER_AUTH_URL ||
      "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [jwtClient()],
}) as unknown as AuthClientMethods;


export const { useSession, getSession, signIn, signUp, signOut } = authClient;