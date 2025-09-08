'use client'
import React from 'react';
import Image from 'next/image';
import { CheckCircle, Home, Users, Shield, Info, MapPin, DollarSign } from 'lucide-react';

interface ReviewStepProps {
  formData: {
    propertyType: 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city';
    propertyCategory: 'residential' | 'commercial' | 'mixed';
    country: string;
    city: string;
    district: string;
    sector: string;
    cell: string;
    streetAddress: string;
    latitude: number | null;
    longitude: number | null;
    title: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareMeters: number;
    floorNumber: number;
    totalFloors: number;
    yearBuilt: number;
    parkingSpaces: number;
    amenities: string[];
    photos: File[];
    photoUrls: string[];
    pricePerNight: number;
    pricePerWeek: number;
    pricePerMonth: number;
    cleaningFee: number;
    serviceFee: number;
    securityDeposit: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
    instantBookable: boolean;
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
    houseRules: string[];
    checkInTime: string;
    checkOutTime: string;
  };
  updateFormData: (updates: Partial<{
    title: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareMeters: number;
    floorNumber: number;
    totalFloors: number;
    yearBuilt: number;
    parkingSpaces: number;
    amenities: string[];
    photos: File[];
    photoUrls: string[];
    pricePerNight: number;
    pricePerWeek: number;
    pricePerMonth: number;
    cleaningFee: number;
    serviceFee: number;
    securityDeposit: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
    instantBookable: boolean;
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
    houseRules: string[];
    checkInTime: string;
    checkOutTime: string;
  }>) => void;
  errors: { [key: string]: string };
}

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

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Listing
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Review all the information before publishing your property listing.
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
              {formData.pricePerNight} RWF
            </div>
            <div className="text-sm text-gray-600">per night</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {formData.pricePerWeek} RWF
            </div>
            <div className="text-sm text-gray-600">per week</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">
              {formData.pricePerMonth} RWF
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
                  <span className="font-medium">{formData.cleaningFee} RWF</span>
                </div>
              )}
              {formData.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium">{formData.serviceFee} RWF</span>
                </div>
              )}
              {formData.securityDeposit > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="font-medium">{formData.securityDeposit} RWF</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities ({formData.amenities.length})</h3>
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
      </div>

      {/* Photos */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos ({formData.photos.length})</h3>
        {formData.photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(photo)}
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
                  <p className="text-xs text-gray-500 truncate">{photo.name}</p>
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

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Before You Publish</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Double-check all information for accuracy</li>
              <li>• Ensure photos clearly show your property</li>
              <li>• Verify pricing is competitive for your area</li>
              <li>• Make sure all required fields are completed</li>
              <li>• You can edit your listing after publishing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
