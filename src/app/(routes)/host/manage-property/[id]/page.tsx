'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { BackgroundShapes } from '@/components/ui/background-shapes';
import { EditListingForm } from './edit-listing-form';
import { PropertySummary } from './property-summary';
import { dummyListings } from '@/data/listings';
import { ListingFormData } from '@/types';
import { ArrowLeft, Loader2, BarChart3, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function ManagePropertyPage() {
  const params = useParams();
  const listingId = params.id as string;
  const [listing, setListing] = useState<ListingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'edit'>('overview');

  useEffect(() => {
    // Simulate loading existing listing data
    const loadListing = async () => {
      try {
        setLoading(true);
        
        // Find the listing from dummy data
        const foundListing = dummyListings.find(l => l.id === listingId);
        
        if (!foundListing) {
          setError('Listing not found');
          return;
        }

        // Sample location data based on property ID for demonstration
        const locationData = {
          '1': { // Westlands, Nairobi
            country: 'Kenya',
            city: 'Nairobi',
            district: 'Westlands',
            sector: 'Westlands Ward',
            cell: 'Parklands',
            streetAddress: 'Westlands Road, Nairobi',
            latitude: -1.2676, 
            longitude: 36.8108
          },
          '2': { // Karen, Nairobi  
            country: 'Kenya',
            city: 'Nairobi', 
            district: 'Karen',
            sector: 'Karen Ward',
            cell: 'Karen',
            streetAddress: 'Karen Road, Nairobi',
            latitude: -1.3197,
            longitude: 36.7025
          },
          '3': { // Lavington, Nairobi
            country: 'Kenya',
            city: 'Nairobi',
            district: 'Lavington', 
            sector: 'Lavington Ward',
            cell: 'Lavington',
            streetAddress: 'Lavington Drive, Nairobi',
            latitude: -1.2830,
            longitude: 36.7677
          },
          '4': { // Kilimani, Nairobi
            country: 'Kenya', 
            city: 'Nairobi',
            district: 'Kilimani',
            sector: 'Kilimani Ward', 
            cell: 'Kilimani',
            streetAddress: 'Kilimani Road, Nairobi',
            latitude: -1.2921,
            longitude: 36.7872
          },
          '5': { // Muthaiga, Nairobi
            country: 'Kenya',
            city: 'Nairobi', 
            district: 'Muthaiga',
            sector: 'Muthaiga Ward',
            cell: 'Muthaiga',
            streetAddress: 'Muthaiga Road, Nairobi', 
            latitude: -1.2532,
            longitude: 36.8644
          }
        };

        // Add one Rwanda example for property ID 3
        if (listingId === '3') {
          locationData['3'] = {
            country: 'Rwanda',
            city: 'Nyarugenge', // District
            district: 'Kigali', // Province
            sector: 'Nyarugenge',
            cell: 'Rugenge',
            streetAddress: 'KN 3 Rd, Kigali',
            latitude: -1.9441,
            longitude: 30.0619
          };
        }

        const propertyLocation = locationData[listingId as keyof typeof locationData] || {
          country: 'Rwanda',
          city: 'Nyarugenge',
          district: 'Kigali',
          sector: 'Nyarugenge',
          cell: 'Rugenge',
          streetAddress: 'KN 3 Rd, Kigali',
          latitude: -1.9441,
          longitude: 30.0619
        };

        // Convert listing to form data format
        const formData: ListingFormData = {
          propertyType: foundListing.propertyType as 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city',
          propertyCategory: 'residential',
          country: propertyLocation.country,
          city: propertyLocation.city,
          district: propertyLocation.district,
          sector: propertyLocation.sector,
          cell: propertyLocation.cell,
          streetAddress: propertyLocation.streetAddress,
          latitude: propertyLocation.latitude,
          longitude: propertyLocation.longitude,
          title: foundListing.title,
          description: `Beautiful ${foundListing.propertyType} located in ${foundListing.location}`,
          bedrooms: 2,
          bathrooms: 2,
          maxGuests: foundListing.accommodates?.maximumTotal || 4,
          squareMeters: foundListing.accommodates?.squareFeet || 100,
          floorNumber: 1,
          totalFloors: 2,
          yearBuilt: 2020,
          parkingSpaces: 1,
          amenities: foundListing.amenities,
          photos: [],
          photoUrls: foundListing.images,
          pricePerNight: foundListing.price,
          pricePerWeek: foundListing.price * 7 * 0.9,
          pricePerMonth: foundListing.price * 30 * 0.8,
          cleaningFee: 25,
          serviceFee: 15,
          securityDeposit: foundListing.price * 2,
          currency: 'USD',
          instantBookable: true,
          cancellationPolicy: 'moderate',
          houseRules: ['No smoking', 'No pets', 'No parties'],
          checkInTime: '15:00',
          checkOutTime: '11:00'
        };

        setListing(formData);
      } catch (err) {
        setError('Failed to load listing');
        console.error('Error loading listing:', err);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      loadListing();
    }
  }, [listingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        <BackgroundShapes />
        <SearchResultsNavbar />
        <div className="pt-20 relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                <span className="ml-3 text-lg text-gray-600">Loading listing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        <BackgroundShapes />
        <SearchResultsNavbar />
        <div className="pt-20 relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {error || 'Listing not found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  The listing you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
                </p>
                <Link 
                  href="/host"
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundShapes />
      <SearchResultsNavbar />
      <div className="pt-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <Link 
              href="/host"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Manage Your Property
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Monitor performance and update your listing to maximize bookings and revenue.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Overview & Analytics
                </button>
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'edit'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Listing
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <PropertySummary 
              listing={listing} 
              listingId={listingId} 
              onEditClick={() => setActiveTab('edit')}
            />
          ) : (
            <div className="max-w-3xl mx-auto">
              <EditListingForm initialData={listing} listingId={listingId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
