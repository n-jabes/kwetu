'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { BackgroundShapes } from '@/components/ui/background-shapes';
import { dummyListings } from '@/data/listings';
import { ListingFormData } from '@/types';
import { ArrowLeft, Loader2, CheckCircle, Home, Users, Shield, Info, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

const propertyTypeLabels = {
  apartment: 'Apartment',
  villa: 'Villa',
  house: 'House',
  room: 'Room',
  traditional: 'Traditional',
  mountain: 'Mountain',
  city: 'City'
};

const propertyCategoryLabels = {
  residential: 'Residential',
  commercial: 'Commercial',
  mixed: 'Mixed Use'
};

const cancellationPolicyLabels = {
  flexible: 'Flexible',
  moderate: 'Moderate',
  strict: 'Strict'
};

interface ListingPreviewProps {
  formData: ListingFormData;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({ formData }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Listing Preview
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          This is how your property listing appears to potential guests.
        </p>
      </div>

      {/* Property Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Home className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title}</h3>
            <p className="text-gray-700 mb-3">{formData.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {formData.maxGuests} guests
              </span>
              <span className="flex items-center">
                <Home className="w-4 h-4 mr-1" />
                {formData.bedrooms} bed{formData.bedrooms !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                {formData.bathrooms} bath{formData.bathrooms !== 1 ? 's' : ''}
              </span>
              <span>{formData.squareMeters}m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Home className="w-5 h-5 mr-2 text-blue-600" />
            Property Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{propertyTypeLabels[formData.propertyType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{propertyCategoryLabels[formData.propertyCategory]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Floor:</span>
              <span className="font-medium">{formData.floorNumber} of {formData.totalFloors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Built:</span>
              <span className="font-medium">{formData.yearBuilt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parking:</span>
              <span className="font-medium">{formData.parkingSpaces} space{formData.parkingSpaces !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Location
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Country:</span>
              <span className="font-medium">{formData.country}</span>
            </div>
            {formData.country === 'Rwanda' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Province:</span>
                  <span className="font-medium">{formData.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">District:</span>
                  <span className="font-medium">{formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sector:</span>
                  <span className="font-medium">{formData.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cell:</span>
                  <span className="font-medium">{formData.cell}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">{formData.streetAddress}</span>
              </div>
            )}
            {formData.latitude && formData.longitude && (
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-medium text-xs">
                  {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
          Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {formData.currency} {formData.pricePerNight}
            </div>
            <div className="text-sm text-gray-600">per night</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {formData.currency} {formData.pricePerWeek}
            </div>
            <div className="text-sm text-gray-600">per week</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">
              {formData.currency} {formData.pricePerMonth}
            </div>
            <div className="text-sm text-gray-600">per month</div>
          </div>
        </div>
        
        {(formData.cleaningFee > 0 || formData.serviceFee > 0 || formData.securityDeposit > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Additional Fees</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {formData.cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning Fee:</span>
                  <span className="font-medium">{formData.currency} {formData.cleaningFee}</span>
                </div>
              )}
              {formData.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium">{formData.currency} {formData.serviceFee}</span>
                </div>
              )}
              {formData.securityDeposit > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="font-medium">{formData.currency} {formData.securityDeposit}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities ({formData.amenities.length})</h3>
        {formData.amenities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenityId) => (
              <span
                key={amenityId}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {amenityId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No amenities specified</p>
        )}
      </div>

      {/* Photos */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos ({formData.photoUrls.length})</h3>
        {formData.photoUrls.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photoUrls.map((photoUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={`Photo ${index + 1}`}
                    width={200}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Main
                  </div>
                )}
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600">Photo {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No photos uploaded yet</p>
        )}
      </div>

      {/* Policies & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Policies</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cancellation:</span>
              <span className="font-medium">{cancellationPolicyLabels[formData.cancellationPolicy]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Instant Booking:</span>
              <span className="font-medium">{formData.instantBookable ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">{formData.checkInTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">{formData.checkOutTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">House Rules ({formData.houseRules.length})</h3>
          {formData.houseRules.length > 0 ? (
            <div className="space-y-2">
              {formData.houseRules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No house rules specified</p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Listing Preview</h4>
            <p className="text-sm text-blue-800">
              This is exactly how your listing appears to guests. You can make changes by going back to the edit form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PreviewPage() {
  const params = useParams();
  const listingId = params.id as string;
  const [listing, setListing] = useState<ListingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load listing data (same logic as manage-property page)
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                <span className="ml-3 text-lg text-gray-600">Loading preview...</span>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  href={`/host/manage-property/${listingId}`}
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Manage Property
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <Link 
              href={`/host/manage-property/${listingId}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Manage Property
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Property Preview
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                See exactly how your listing appears to potential guests.
              </p>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <ListingPreview formData={listing} />
          </div>
        </div>
      </div>
    </div>
  );
}
