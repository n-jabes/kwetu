'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, MapPin, Home, Settings, Camera, DollarSign, FileText, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ListingFormData } from '@/types';

const steps = [
  { id: 1, title: 'Property Type', icon: Home },
  { id: 2, title: 'Location', icon: MapPin },
  { id: 3, title: 'Details', icon: FileText },
  { id: 4, title: 'Amenities', icon: Settings },
  { id: 5, title: 'Photos', icon: Camera },
  { id: 6, title: 'Pricing', icon: DollarSign },
  { id: 7, title: 'Review', icon: Check }
];

export const AddListingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    squareMeters: 50,
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
    checkInTime: '00:00',
    checkOutTime: '00:00'
  });

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep2 = () => {
    const errors: string[] = [];
    if (!formData.country) errors.push('Please select a country');
    if (formData.country === 'Rwanda') {
      if (!formData.district) errors.push('Please select a province');
      if (!formData.city) errors.push('Please select a district');
      if (!formData.sector) errors.push('Please select a sector');
      if (!formData.cell) errors.push('Please select a cell');
    }
    return errors;
  };

  const nextStep = () => {
    if (currentStep === 2) {
      const errors = validateStep2();
      if (errors.length > 0) {
        toast.error(`Please fix ${errors.length} field${errors.length > 1 ? 's' : ''} to continue`);
        return;
      }
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      toast.success('Listing published successfully!');
    }, 2000);
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Country</h3>
        <select
          value={formData.country}
          onChange={(e) => updateFormData({ country: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="Rwanda">Rwanda</option>
          <option value="Kenya">Kenya</option>
          <option value="Uganda">Uganda</option>
        </select>
        {!formData.country && (
          <p className="text-red-500 text-sm mt-2">Please select a country</p>
        )}
      </div>

      {formData.country === 'Rwanda' && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Province</h3>
            <div className="grid grid-cols-3 gap-3">
              {['Kigali', 'Northern', 'Southern', 'Eastern', 'Western'].map((province) => (
                <button
                  key={province}
                  onClick={() => updateFormData({ district: province })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.district === province
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {province}
                </button>
              ))}
            </div>
            {!formData.district && (
              <p className="text-red-500 text-sm mt-2">Please select a province</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">District</h3>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="Enter district name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {!formData.city && (
              <p className="text-red-500 text-sm mt-2">Please select a district</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sector</h3>
            <input
              type="text"
              value={formData.sector}
              onChange={(e) => updateFormData({ sector: e.target.value })}
              placeholder="Enter sector name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {!formData.sector && (
              <p className="text-red-500 text-sm mt-2">Please select a sector</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cell</h3>
            <input
              type="text"
              value={formData.cell}
              onChange={(e) => updateFormData({ cell: e.target.value })}
              placeholder="Enter cell name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {!formData.cell && (
              <p className="text-red-500 text-sm mt-2">Please select a cell</p>
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Property Type Step</h3>
            <p>This is step 1 content</p>
          </div>
        );
      case 2:
        return renderStep2();
      case 3:
        return <div><h3>Details Step</h3></div>;
      case 4:
        return <div><h3>Amenities Step</h3></div>;
      case 5:
        return <div><h3>Photos Step</h3></div>;
      case 6:
        return <div><h3>Pricing Step</h3></div>;
      case 7:
        return <div><h3>Review Step</h3></div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Listing</h1>
          <p className="text-gray-600">Create your property listing in just a few simple steps</p>
        </div>
      </div>

      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-8">
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4 inline mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Next
              <ChevronRight className="w-4 h-4 inline ml-2" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? 'Publishing...' : 'Publish Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
