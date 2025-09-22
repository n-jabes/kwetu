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
  logout: () => Promise<void>;
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

// Storage keys
const USER_DATA_KEY = 'kwetu_user_data';
const TOKEN_KEY = 'kwetu_token_storage';

// Helper functions for storage
const storeUserData = (user: User) => {
  try {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify({
      ...user,
      _storedAt: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to store user data:', error);
  }
};

const getStoredUserData = (): User | null => {
  try {
    const stored = sessionStorage.getItem(USER_DATA_KEY);
    if (!stored) return null;
    
    const userData = JSON.parse(stored);
    // Check if data is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (Date.now() - userData._storedAt > maxAge) {
      sessionStorage.removeItem(USER_DATA_KEY);
      return null;
    }
    
    // Remove the timestamp before returning
    delete userData._storedAt;
    return userData;
  } catch (error) {
    console.warn('Failed to retrieve stored user data:', error);
    sessionStorage.removeItem(USER_DATA_KEY);
    return null;
  }
};

const clearStoredUserData = () => {
  try {
    sessionStorage.removeItem(USER_DATA_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.warn('Failed to clear stored user data:', error);
  }
};

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

      // Try to fetch fresh data from API
      const res = await fetch('/api/auth/me', {
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      // Immediately clear stored data if we get 403/401
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        clearStoredUserData();
      }
      
      if (res.ok) {
        const data = await res.json();
        
        // Handle both success response format and direct user data
        let userData: User | null = null;
        if (data.success && data.data) {
          userData = data.data;
        } else if (data.id && data.email) {
          // Direct user data response
          userData = data;
        }
        
        if (userData) {
          setUser(userData);
          // Store the fresh data
          storeUserData(userData);
        } else {
          // Fall back to stored data if API returns unexpected format
          const storedData = getStoredUserData();
          if (storedData) {
            setUser(storedData);
          } else {
            setUser(null);
          }
        }
      } else {
        // If it's a 401 (unauthorized) or 403 (forbidden), clear everything immediately
        if (res.status === 401 || res.status === 403) {
          setUser(null);
          clearStoredUserData();
        } else {
          // For other errors (network, server errors), use stored data as fallback
          const storedData = getStoredUserData();
          if (storedData) {
            setUser(storedData);
          } else {
            setUser(null);
          }
        }
      }
    } catch (error) {
      // Check if it's a timeout or network error
      if (error instanceof Error && (
        error.name === 'TimeoutError' || 
        error.message.includes('fetch failed') ||
        error.message.includes('timeout')
      )) {
        // Network/timeout error, use stored data as fallback
        const storedData = getStoredUserData();
        if (storedData) {
          setUser(storedData);
        } else {
          setUser(null);
        }
      } else {
        // For other errors, clear user data
        setUser(null);
        clearStoredUserData();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser(true); // Force fetch even on auth page
  };

  const logout = async () => {
    try {
      // Call the logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local data and reset user state
      setUser(null);
      clearStoredUserData();
      setLoading(false);
    }
  };

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
      // Always try to fetch fresh data first
      await fetchUser();
    };
    
    initializeAuth();
    
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
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
