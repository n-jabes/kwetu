'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
  requiredRole?: 'GUEST' | 'HOST';
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const {
    redirectTo = '/auth',
    requireAuth = false,
    redirectIfAuthenticated = false,
    requiredRole
  } = options;

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If user is authenticated but we want to redirect authenticated users (e.g., auth page)
    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If a specific role is required, check it
    if (requireAuth && isAuthenticated && requiredRole && user) {
      if (!user.roles?.includes(requiredRole)) {
        router.push('/'); // Redirect to home if wrong role
        return;
      }
    }
  }, [loading, isAuthenticated, requireAuth, redirectIfAuthenticated, redirectTo, router, requiredRole, user]);

  return {
    user,
    loading,
    isAuthenticated
  };
};

// Specific hooks for guest and host routes
export const useGuestGuard = () => {
  return useAuthGuard({
    requireAuth: true,
    requiredRole: 'GUEST',
    redirectTo: '/auth'
  });
};

export const useHostGuard = () => {
  return useAuthGuard({
    requireAuth: true,
    requiredRole: 'HOST',
    redirectTo: '/auth'
  });
};

export const useAuthPageGuard = () => {
  return useAuthGuard({
    redirectIfAuthenticated: true,
    redirectTo: '/'
  });
};
