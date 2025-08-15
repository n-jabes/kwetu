'use client';

import React from 'react';
import { CheckCircle, Home, Plus } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Success!</h1>
        <p className="text-gray-600 mb-8">
          Your property listing has been published successfully. It&apos;s now visible to potential guests!
        </p>
        
        <div className="space-y-4">
          <Link
            href="/listings"
            className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            View All Listings
          </Link>
          
          <Link
            href="/add-listing"
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
