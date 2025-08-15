'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { PropertyTypeStep } from '@/components/add-listing/property-type-step';
import { LocationStep } from '@/components/add-listing/location-step';
import { DetailsStep } from '@/components/add-listing/details-step';
import { AmenitiesStep } from '@/components/add-listing/amenities-step';
import { PhotosStep } from '@/components/add-listing/photos-step';
import { PricingStep } from '@/components/add-listing/pricing-step';
import { ReviewStep } from '@/components/add-listing/review-step';
import toast from 'react-hot-toast';

export interface ListingFormData {
  // Property Type
  propertyType: 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city';
  propertyCategory: 'residential' | 'commercial' | 'mixed';
  // Location
  country: string;
  city: string;
  district: string;
  sector: string;
  cell: string;
  streetAddress: string;
  latitude: number | null;
  longitude: number | null;
  // Details
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
  // Amenities
  amenities: string[];
  // Photos
  photos: File[];
  photoUrls: string[];
  // Pricing
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  cleaningFee: number;
  serviceFee: number;
  securityDeposit: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
  // Additional
  instantBookable: boolean;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
}

const steps = [
  { id: 1, title: 'Property Type', description: 'Choose your property category and type' },
  { id: 2, title: 'Location', description: 'Set your property location' },
  { id: 3, title: 'Details', description: 'Describe your property features' },
  { id: 4, title: 'Amenities', description: 'Select available amenities' },
  { id: 5, title: 'Photos', description: 'Upload property photos' },
  { id: 6, title: 'Pricing', description: 'Set your rates and fees' },
  { id: 7, title: 'Review', description: 'Review and publish' }
];

export const AddListingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPublishing, setIsPublishing] = useState(false);

  const [formData, setFormData] = useState<ListingFormData>({
    propertyType: 'apartment',
    propertyCategory: 'residential',
    country: 'Rwanda',
    city: '',
    district: '',
    sector: '',
    cell: '',
    streetAddress: '',
    latitude: null,
    longitude: null,
    title: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    squareMeters: 0,
    floorNumber: 1,
    totalFloors: 1,
    yearBuilt: new Date().getFullYear(),
    parkingSpaces: 0,
    amenities: [],
    photos: [],
    photoUrls: [],
    pricePerNight: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    cleaningFee: 0,
    serviceFee: 0,
    securityDeposit: 0,
    currency: 'RWF',
    instantBookable: false,
    cancellationPolicy: 'moderate',
    houseRules: [],
    checkInTime: '14:00',
    checkOutTime: '11:00'
  });

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(field => {
        if (newErrors[field]) delete newErrors[field];
      });
      return newErrors;
    });
  };

  const validateStep = (step: number): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.propertyType) newErrors.propertyType = 'Please select a property type';
        if (!formData.propertyCategory) newErrors.propertyCategory = 'Please select a property category';
        break;
      
      case 2:
        if (!formData.country) newErrors.country = 'Please select a country';
        if (formData.country === 'Rwanda') {
          if (!formData.district) newErrors.district = 'Please select a province';
          if (!formData.city) newErrors.city = 'Please select a district';
          if (!formData.sector) newErrors.sector = 'Please select a sector';
          if (!formData.cell) newErrors.cell = 'Please select a cell';
        } else {
          if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required for non-Rwanda locations';
        }
        if (!formData.latitude || !formData.longitude) newErrors.coordinates = 'Please set coordinates on the map';
        break;
      
      case 3:
        if (!formData.title.trim()) newErrors.title = 'Please enter a property title';
        if (!formData.description.trim()) newErrors.description = 'Please enter a property description';
        if (formData.bedrooms < 1) newErrors.bedrooms = 'Please enter at least 1 bedroom';
        if (formData.bathrooms < 1) newErrors.bathrooms = 'Please enter at least 1 bathroom';
        if (formData.maxGuests < 1) newErrors.maxGuests = 'Please enter at least 1 guest';
        if (formData.squareMeters <= 0) newErrors.squareMeters = 'Please enter valid square meters';
        break;
      
      case 4:
        if (formData.amenities.length === 0) newErrors.amenities = 'Please select at least one amenity';
        break;
      
      case 5:
        if (formData.photos.length === 0) newErrors.photos = 'Please upload at least one photo';
        break;
      
      case 6:
        if (formData.pricePerNight <= 0) newErrors.pricePerNight = 'Please enter a valid nightly price';
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const markStepAsCompleted = (step: number) => {
    setCompletedSteps(prev => new Set([...prev, step]));
  };

  const nextStep = () => {
    const validation = validateStep(currentStep);
    
    if (!validation.isValid) {
      toast.error('Please fill in all required fields on this form');
      return;
    }

    setErrors({}); // Clear errors when step is valid
    markStepAsCompleted(currentStep);
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      toast.success('Listing published successfully!');
      // Navigate to success page
      window.location.href = '/listings/success';
    }, 2000);
  };

  const renderStep = () => {
    const commonProps = { formData, updateFormData, errors };
    
    switch (currentStep) {
      case 1:
        return <PropertyTypeStep {...commonProps} />;
      case 2:
        return <LocationStep {...commonProps} />;
      case 3:
        return <DetailsStep {...commonProps} />;
      case 4:
        return <AmenitiesStep {...commonProps} />;
      case 5:
        return <PhotosStep {...commonProps} />;
      case 6:
        return <PricingStep {...commonProps} />;
      case 7:
        return <ReviewStep {...commonProps} />;
      default:
        return <PropertyTypeStep {...commonProps} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Your Listing</h2>
          <div className="text-sm text-gray-600">
            Step {currentStep} of {steps.length}
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = currentStep === step.id;
            const isPast = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isCompleted || isPast
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isCurrent
                      ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                      : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted || isPast ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    isCompleted || isPast ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Current Step Info */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <div className="flex items-center space-x-3">
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4 mr-2" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? 'Publishing...' : 'Publish Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
