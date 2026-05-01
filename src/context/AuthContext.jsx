import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Handle auth errors from URL hash (e.g., after email confirmation)
    const hash = window.location.hash;
    if (hash && (hash.includes('error=') || hash.includes('error_code='))) {
      const params = new URLSearchParams(hash.substring(1));
      const errorCode = params.get('error_code');
      const errorDescription = params.get('error_description');

      if (errorCode) {
        setAuthError({
          code: errorCode,
          message: errorDescription || errorCode,
        });
        
        // Clean up URL
        window.history.replaceState(null, null, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (authError) {
      setIsLoginModalOpen(true);
    }
  }, [authError]);

  // Will be passed down to Signup, Login and Logout components
  const value = {
    signUp: (data) =>
      supabase.auth.signUp({
        ...data,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        },
      }),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    authError,
    clearAuthError: () => setAuthError(null),
    isLoginModalOpen,
    setIsLoginModalOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
