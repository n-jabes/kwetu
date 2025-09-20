'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const {
    redirectTo = '/auth',
    requireAuth = false,
    redirectIfAuthenticated = false
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
  }, [loading, isAuthenticated, requireAuth, redirectIfAuthenticated, redirectTo, router]);

  return {
    user,
    loading,
    isAuthenticated
  };
};
