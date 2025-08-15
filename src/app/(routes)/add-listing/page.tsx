'use client'
import React from 'react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { AddListingForm } from './add-listing-form';
import { BackgroundShapes } from '@/components/ui/background-shapes';

export default function AddListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundShapes />
      <SearchResultsNavbar />
      <div className="pt-8 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              List Your Property
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
