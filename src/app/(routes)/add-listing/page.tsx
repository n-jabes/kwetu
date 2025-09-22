'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { AddListingForm } from './add-listing-form';
import { BackgroundShapes } from '@/components/ui/background-shapes';
import { useAuth } from '@/contexts/AuthContext';
import { hasRole, hasAnyRole, forceAuthReset } from '@/utils/auth';

export default function AddListingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If user is not authenticated, redirect to auth
      if (!user) {
        forceAuthReset();
        router.push('/auth');
      } else if (!hasRole(user, 'HOST')) {
        // If user is authenticated but doesn't have HOST role, redirect based on their role
        if (hasRole(user, 'GUEST')) {
          router.push('/');
        } else {
          forceAuthReset();
          router.push('/auth');
        }
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have HOST role, don't render the page (will redirect)
  if (!user || !hasRole(user, 'HOST')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundShapes />
      <SearchResultsNavbar />
      <div className="pt-6 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              List Your Property
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Share your beautiful space with travelers from around the world. 
              Earn income while providing authentic East African experiences.
            </p>
          </div>
          
          <AddListingForm />
        </div>
      </div>
    </div>
  );
}
