import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

// Define the shape of the authentication context
// - `user`: Represents the currently logged-in user or `null` if no user is logged in.
// - `signIn`: Function to log in a user using email and password, returning a `User` or `null`.
// - `signUp`: Function to register a new user using email and password, returning a `User` or `null`.
// - `signOut`: Function to log the user out, returning nothing.
interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

// Create the authentication context
// - The context is initialized as `undefined` because no value is provided until the `AuthProvider` wraps components.
// - Components consuming this context must ensure the value is defined, typically by wrapping them inside the `AuthProvider`.
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the AuthProvider component
// - A functional component that provides authentication data and methods to its children.
// - It wraps around the application's components and ensures they have access to the authentication context.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // `user` state tracks the currently logged-in user.
  // `setUser` is used to update the state when authentication status changes.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // Retrieve the current session from Supabase.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // Update the `user` state with the session user or `null` if no session exists.
      setUser(session?.user ?? null);

      // Listen for authentication state changes (e.g., login, logout).
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          // Update the `user` state when the auth state changes.
          setUser(session?.user ?? null);
        }
      );

      // Cleanup the listener when the component unmounts to avoid memory leaks.
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    // Everytime mounting occcurs, the session is fetched!
    fetchSession();
  }, []);

  // Function to register a new user using Supabase's sign-up method.
  // - Takes an email and password as input.
  // - Returns the created `User` object or throws an error if registration fails.
  const signUp = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  };

  // Function to log in a user using Supabase's sign-in method.
  // - Takes an email and password as input.
  // - Returns the logged-in `User` object or throws an error if credentials are invalid.
  const signIn = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  // Function to log out the currently authenticated user using Supabase's sign-out method.
  // - Clears the user session and updates the `user` state to `null`.
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  // Provide the `AuthContext` value to all child components wrapped inside `AuthProvider`.
  // - `value` includes the current `user` state and authentication methods (`signUp`, `signIn`, `signOut`).
  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
// - Simplifies usage of `useContext` for the `AuthContext`.
// - Ensures `AuthContext` is being used within the correct provider (`AuthProvider`).
export const useAuth = () => {
  // Retrieve the current value of `AuthContext` using `useContext`.
  // The context value includes the `user` state and authentication methods (e.g., `signUp`, `signIn`, `signOut`).
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
