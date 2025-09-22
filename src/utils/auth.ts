import { User } from '@/types';

/**
 * Check if a user has a specific role
 */
export const hasRole = (user: User | null, role: 'GUEST' | 'HOST'): boolean => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

/**
 * Check if a user has any of the specified roles
 */
export const hasAnyRole = (user: User | null, roles: ('GUEST' | 'HOST')[]): boolean => {
  if (!user || !user.roles) return false;
  return roles.some(role => user.roles.includes(role));
};

/**
 * Check if a user is authenticated
 */
export const isAuthenticated = (user: User | null): boolean => {
  return !!user;
};

/**
 * Get user's primary role (first role in the array)
 */
export const getPrimaryRole = (user: User | null): 'GUEST' | 'HOST' | null => {
  if (!user || !user.roles || user.roles.length === 0) return null;
  return user.roles[0] as 'GUEST' | 'HOST';
};

/**
 * Check if user can access a specific route based on their role
 */
export const canAccessRoute = (user: User | null, route: string): boolean => {
  if (!user) {
    // Public routes that don't require authentication
    const publicRoutes = ['/', '/auth', '/listings', '/search-results'];
    return publicRoutes.some(publicRoute => route.startsWith(publicRoute));
  }

  // Guest routes
  if (route.startsWith('/guest')) {
    return hasRole(user, 'GUEST');
  }

  // Host routes
  if (route.startsWith('/host')) {
    return hasRole(user, 'HOST');
  }

  // Add listing route - requires HOST role
  if (route.startsWith('/add-listing')) {
    return hasRole(user, 'HOST');
  }

  // Auth page - authenticated users shouldn't access it
  if (route.startsWith('/auth')) {
    return false;
  }

  // All other routes are accessible to authenticated users
  return true;
};

/**
 * Clear all stored authentication data
 */
export const clearStoredAuthData = () => {
  try {
    sessionStorage.removeItem('kwetu_user_data');
    sessionStorage.removeItem('kwetu_token_storage');
  } catch (error) {
    console.warn('Failed to clear stored auth data:', error);
  }
};

/**
 * Force complete authentication reset - clears all data and redirects to auth
 */
export const forceAuthReset = () => {
  try {
    // Clear all stored data
    clearStoredAuthData();
    
    // Clear cookies if possible (client-side)
    if (typeof document !== 'undefined') {
      document.cookie = 'kwetu_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  } catch (error) {
    console.warn('Failed to force auth reset:', error);
  }
};

/**
 * Get stored user data
 */
export const getStoredUserData = (): User | null => {
  try {
    const stored = sessionStorage.getItem('kwetu_user_data');
    if (!stored) return null;
    
    const userData = JSON.parse(stored);
    // Check if data is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (Date.now() - userData._storedAt > maxAge) {
      sessionStorage.removeItem('kwetu_user_data');
      return null;
    }
    
    // Remove the timestamp before returning
    delete userData._storedAt;
    return userData;
  } catch (error) {
    console.warn('Failed to retrieve stored user data:', error);
    sessionStorage.removeItem('kwetu_user_data');
    return null;
  }
};
