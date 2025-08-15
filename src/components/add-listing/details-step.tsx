'use client'
import React, { useState } from 'react';
import { Home, Info } from 'lucide-react';

interface DetailsStepProps {
  formData: {
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
    instantBookable: boolean;
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
    houseRules: string[];
    checkInTime: string;
    checkOutTime: string;
  }>) => void;
  errors: { [key: string]: string };
}

const commonHouseRules = [
  'No smoking',
  'No pets',
  'No parties or events',
  'Quiet hours after 10 PM',
  'No shoes inside',
  'No loud music',
  'Respect neighbors',
  'Turn off lights when leaving',
  'Lock doors when leaving',
  'No cooking in bedrooms',
  'Keep common areas clean',
  'No overnight guests without permission',
  'No food in bedrooms',
  'Respect check-in and check-out times',
  'No illegal activities',
  'Report any damages immediately',
  'Follow building rules',
  'No excessive noise',
  'Keep balcony/terrace clean',
  'No hanging clothes outside',
  'Respect parking rules',
  'No modifications to property',
  'Use designated trash bins',
  'No candles or open flames',
  'Keep windows closed when AC is on',
  'No smoking on balconies',
  'Respect elevator etiquette',
  'No running in hallways',
  'Keep entrance area clean',
  'No blocking emergency exits'
];

export const DetailsStep: React.FC<DetailsStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const [newRule, setNewRule] = useState('');

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
    title: formData.title || '',
    description: formData.description || '',
    bedrooms: formData.bedrooms || 1,
    bathrooms: formData.bathrooms || 1,
    maxGuests: formData.maxGuests || 2,
    squareMeters: formData.squareMeters || 0,
    floorNumber: formData.floorNumber || 1,
    totalFloors: formData.totalFloors || 1,
    yearBuilt: formData.yearBuilt || 2025,
    parkingSpaces: formData.parkingSpaces || 0,
    instantBookable: formData.instantBookable || false,
    cancellationPolicy: formData.cancellationPolicy || 'moderate',
    houseRules: formData.houseRules || [],
    checkInTime: formData.checkInTime || '00:00',
    checkOutTime: formData.checkOutTime || '00:00'
  };

  const safeErrors = errors || {};

  const addHouseRule = () => {
    if (newRule.trim() && !safeFormData.houseRules.includes(newRule.trim())) {
      updateFormData({ houseRules: [...safeFormData.houseRules, newRule.trim()] });
      setNewRule('');
    }
  };

  const removeHouseRule = (rule: string) => {
    updateFormData({ houseRules: safeFormData.houseRules.filter(r => r !== rule) });
  };

  const addCommonRule = (rule: string) => {
    if (!safeFormData.houseRules.includes(rule)) {
      updateFormData({ houseRules: [...safeFormData.houseRules, rule] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Home className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your property
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Provide detailed information to help guests understand what to expect.
        </p>
      </div>

      {/* Basic Information */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={safeFormData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="e.g., Cozy 2BR Apartment in Kigali City Center"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {safeErrors.title && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {safeErrors.title}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={safeFormData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Describe your property, its features, and what makes it special..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {safeErrors.description && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {safeErrors.description}
            </p>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square Meters
            </label>
            <input
              type="number"
              value={formData.squareMeters || ''}
              onChange={(e) => updateFormData({ squareMeters: parseInt(e.target.value) || 0 })}
              placeholder="Enter square meters"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.squareMeters && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.squareMeters}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={safeFormData.bedrooms}
              onChange={(e) => updateFormData({ bedrooms: parseInt(e.target.value) || 1 })}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {safeErrors.bedrooms && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {safeErrors.bedrooms}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={safeFormData.bathrooms}
              onChange={(e) => updateFormData({ bathrooms: parseInt(e.target.value) || 1 })}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {safeErrors.bathrooms && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {safeErrors.bathrooms}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Guests <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={safeFormData.maxGuests}
              onChange={(e) => updateFormData({ maxGuests: parseInt(e.target.value) || 2 })}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {safeErrors.maxGuests && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {safeErrors.maxGuests}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floor Number
              </label>
              <input
                type="number"
                value={formData.floorNumber || ''}
                onChange={(e) => updateFormData({ floorNumber: parseInt(e.target.value) || 0 })}
                placeholder="Enter floor number"
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Floors
              </label>
              <input
                type="number"
                value={formData.totalFloors || ''}
                onChange={(e) => updateFormData({ totalFloors: parseInt(e.target.value) || 0 })}
                placeholder="Enter total floors"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                value={formData.yearBuilt || ''}
                onChange={(e) => updateFormData({ yearBuilt: parseInt(e.target.value) || 0 })}
                placeholder="Enter year built"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parking Spaces
              </label>
              <input
                type="number"
                value={formData.parkingSpaces || ''}
                onChange={(e) => updateFormData({ parkingSpaces: parseInt(e.target.value) || 0 })}
                placeholder="Enter parking spaces"
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Check-in/Check-out Times */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Check-in & Check-out Times</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Time
            </label>
            <input
              type="time"
              value={safeFormData.checkInTime}
              onChange={(e) => updateFormData({ checkInTime: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out Time
            </label>
            <input
              type="time"
              value={safeFormData.checkOutTime}
              onChange={(e) => updateFormData({ checkOutTime: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Cancellation Policy</h3>
        <div className="space-y-3">
          {[
            { value: 'flexible', title: 'Flexible', description: 'Full refund if canceled at least 24 hours before check-in' },
            { value: 'moderate', title: 'Moderate', description: 'Full refund if canceled at least 5 days before check-in' },
            { value: 'strict', title: 'Strict', description: 'Full refund if canceled at least 14 days before check-in' }
          ].map((policy) => (
            <label key={policy.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="cancellationPolicy"
                value={policy.value}
                checked={safeFormData.cancellationPolicy === policy.value}
                onChange={(e) => updateFormData({ cancellationPolicy: e.target.value as 'flexible' | 'moderate' | 'strict' })}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <div>
                <div className="font-medium text-gray-900">{policy.title}</div>
                <div className="text-sm text-gray-600">{policy.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Instant Booking */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={safeFormData.instantBookable}
            onChange={(e) => updateFormData({ instantBookable: e.target.checked })}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <div>
            <div className="font-medium text-gray-900">Enable instant booking</div>
            <div className="text-sm text-gray-600">Guests can book without waiting for your approval</div>
          </div>
        </label>
      </div>

      {/* House Rules */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">House Rules</h3>
        
        {/* Add Custom Rule */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Add a custom rule..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={addHouseRule}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Common Rules */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Add Common Rules:</h4>
          <div className="flex flex-wrap gap-2">
            {commonHouseRules.map((rule) => (
              <button
                key={rule}
                onClick={() => addCommonRule(rule)}
                disabled={safeFormData.houseRules.includes(rule)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  safeFormData.houseRules.includes(rule)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {rule}
              </button>
            ))}
          </div>
        </div>

        {/* Current Rules */}
        {safeFormData.houseRules.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Current Rules:</h4>
            <div className="space-y-2">
              {safeFormData.houseRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{rule}</span>
                  <button
                    onClick={() => removeHouseRule(rule)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Property Details Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about your property&apos;s unique features and amenities</li>
              <li>• Set realistic check-in/check-out times that work for both you and guests</li>
              <li>• House rules help set clear expectations and prevent misunderstandings</li>
              <li>• Consider your target audience when setting cancellation policies</li>
              <li>• Accurate measurements help guests understand the space better</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
