'use client'
import React from 'react';
import { Building2, Home, Store, Factory } from 'lucide-react';

interface PropertyTypeStepProps {
  formData: {
    propertyType: 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city';
    propertyCategory: 'residential' | 'commercial' | 'mixed';
  };
  updateFormData: (updates: Partial<{
    propertyType: 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city';
    propertyCategory: 'residential' | 'commercial' | 'mixed';
  }>) => void;
  errors: { [key: string]: string };
}

const propertyCategories = [
  { id: 'residential', name: 'Residential', icon: Home, description: 'Homes, apartments, and living spaces' },
  { id: 'commercial', name: 'Commercial', icon: Store, description: 'Offices, shops, and business spaces' },
  { id: 'mixed', name: 'Mixed Use', icon: Factory, description: 'Combined residential and commercial' }
];

const propertyTypes = {
  residential: [
    { id: 'apartment', name: 'Apartment', icon: Building2, description: 'Modern apartment units' },
    { id: 'villa', name: 'Villa', icon: Home, description: 'Luxury standalone homes' },
    { id: 'house', name: 'House', icon: Home, description: 'Traditional family homes' },
    { id: 'room', name: 'Room', icon: Home, description: 'Individual rooms or studios' },
    { id: 'traditional', name: 'Traditional', icon: Home, description: 'Cultural and heritage homes' },
    { id: 'mountain', name: 'Mountain', icon: Home, description: 'Homes in mountainous areas' },
    { id: 'city', name: 'City', icon: Building2, description: 'Urban living spaces' }
  ],
  commercial: [
    { id: 'apartment', name: 'Office Space', icon: Building2, description: 'Professional office environments' },
    { id: 'villa', name: 'Commercial Villa', icon: Store, description: 'Business villas and compounds' },
    { id: 'house', name: 'Commercial House', icon: Store, description: 'Business houses and shops' },
    { id: 'room', name: 'Meeting Room', icon: Store, description: 'Conference and meeting spaces' },
    { id: 'traditional', name: 'Traditional Shop', icon: Store, description: 'Cultural business spaces' },
    { id: 'mountain', name: 'Mountain Lodge', icon: Store, description: 'Mountain business facilities' },
    { id: 'city', name: 'City Office', icon: Building2, description: 'Urban business spaces' }
  ],
  mixed: [
    { id: 'apartment', name: 'Mixed Apartment', icon: Building2, description: 'Residential and commercial units' },
    { id: 'villa', name: 'Mixed Villa', icon: Home, description: 'Combined living and business spaces' },
    { id: 'house', name: 'Mixed House', icon: Home, description: 'Homes with business areas' },
    { id: 'room', name: 'Flexible Space', icon: Store, description: 'Adaptable living and working areas' },
    { id: 'traditional', name: 'Mixed Traditional', icon: Home, description: 'Cultural mixed-use spaces' },
    { id: 'mountain', name: 'Mountain Complex', icon: Home, description: 'Mountain mixed-use facilities' },
    { id: 'city', name: 'City Complex', icon: Building2, description: 'Urban mixed-use developments' }
  ]
};

export const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  if (!formData || typeof formData !== 'object') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Form data error</h3>
        <p className="text-gray-600 mb-4">The form data is not properly initialized.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const safeFormData = {
    propertyType: (formData.propertyType as 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city') || 'apartment',
    propertyCategory: (formData.propertyCategory as 'residential' | 'commercial' | 'mixed') || 'residential'
  };

  const safeErrors = errors || {};

  if (!safeFormData.propertyCategory || !safeFormData.propertyType) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-yellow-600 text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Missing property data</h3>
        <p className="text-gray-600 mb-4">Required property information is missing.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What type of property are you listing?
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Choose the category and type that best describes your property.
        </p>
      </div>

      {/* Property Category Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Property Category <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {propertyCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => updateFormData({ 
                  propertyCategory: category.id as 'residential' | 'commercial' | 'mixed',
                  propertyType: 'apartment' // Reset property type when category changes
                })}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                  safeFormData.propertyCategory === category.id
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-3 ${
                  safeFormData.propertyCategory === category.id ? 'text-green-600' : 'text-gray-500'
                }`} />
                <div className="font-semibold text-gray-900 mb-1">{category.name}</div>
                <div className="text-sm text-gray-600">{category.description}</div>
              </button>
            );
          })}
        </div>
        {safeErrors.propertyCategory && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {safeErrors.propertyCategory}
          </p>
        )}
      </div>

      {/* Property Type Selection */}
      {safeFormData.propertyCategory && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Property Type <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(propertyTypes[safeFormData.propertyCategory as keyof typeof propertyTypes] || []).map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => updateFormData({ propertyType: type.id as 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city' })}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                    safeFormData.propertyType === type.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${
                    safeFormData.propertyType === type.id ? 'text-green-600' : 'text-gray-500'
                  }`} />
                  <div className="font-medium text-gray-900 mb-1">{type.name}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </button>
              );
            })}
          </div>
          {safeErrors.propertyType && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {safeErrors.propertyType}
            </p>
          )}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">i</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Property Type Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Choose the category that best fits your property&apos;s primary use</li>
              <li>• Select the type that most accurately describes your property&apos;s structure</li>
              <li>• This helps guests understand what to expect from your listing</li>
              <li>• You can always update these details later if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
