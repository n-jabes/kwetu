'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  names: string;
  phone: string;
  profile_picture?: string;
  created_at: string;
  updated_at: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (forceFetch = false) => {
    try {
      // Skip fetching on auth page to avoid conflicts, unless explicitly forced
      if (!forceFetch && typeof window !== 'undefined' && window.location.pathname === '/auth') {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        // Handle both success response format and direct user data
        if (data.success && data.data) {
          setUser(data.data);
        } else if (data.id && data.email) {
          // Direct user data response
          setUser(data);
        }
      } else {
        // Clear user if request fails (token invalid/expired)
        setUser(null);
      }
    } catch {
      // Silently handle errors - user is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser(true); // Force fetch even on auth page
  };

  useEffect(() => {
    fetchUser();
    
    // Listen for storage events (when token is cleared in another tab)
    const handleStorageChange = () => {
      fetchUser();
    };
    
    // Listen for focus events to refresh auth status when user returns to tab
    const handleFocus = () => {
      fetchUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
