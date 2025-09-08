'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Save, Eye } from 'lucide-react';
import { PropertyTypeStep } from '@/components/add-listing/property-type-step';
import { LocationStep } from '@/components/add-listing/location-step';
import { DetailsStep } from '@/components/add-listing/details-step';
import { AmenitiesStep } from '@/components/add-listing/amenities-step';
import { PhotosStep } from '@/components/add-listing/photos-step';
import { PricingStep } from '@/components/add-listing/pricing-step';
import { ReviewStep } from '@/components/add-listing/review-step';
import toast from 'react-hot-toast';
import { ListingFormData } from '@/types';
import Link from 'next/link';

interface EditListingFormProps {
  initialData: ListingFormData;
  listingId: string;
}

const steps = [
  { id: 1, title: 'Property Type', description: 'Update your property category and type' },
  { id: 2, title: 'Location', description: 'Update your property location' },
  { id: 3, title: 'Details', description: 'Update your property features' },
  { id: 4, title: 'Amenities', description: 'Update available amenities' },
  { id: 5, title: 'Photos', description: 'Update property photos' },
  { id: 6, title: 'Pricing', description: 'Update your rates and fees' },
  { id: 7, title: 'Review', description: 'Review and save changes' }
];

export const EditListingForm: React.FC<EditListingFormProps> = ({
  initialData,
  listingId
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState<ListingFormData>(initialData);

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
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
        if (formData.photos.length === 0 && formData.photoUrls.length === 0) {
          newErrors.photos = 'Please upload at least one photo';
        }
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

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call to save changes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Listing updated successfully!');
      setHasUnsavedChanges(false);
      
      // In a real app, you might want to redirect or refresh data
      // window.location.href = `/host/listings/${listingId}`;
    } catch (error) {
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Changes saved!');
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
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
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Your Listing</h2>
          <div className="flex items-center space-x-4">
            {hasUnsavedChanges && (
              <button
                onClick={handleQuickSave}
                disabled={isSaving}
                className="flex items-center px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                {isSaving ? 'Saving...' : 'Quick Save'}
              </button>
            )}
            <Link
              href={`/host/manage-property/${listingId}/preview`}
              className="flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </Link>
            <div className="text-xs text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
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
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isCompleted || isPast
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isCurrent
                      ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                      : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted || isPast ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{step.id}</span>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                    isCompleted || isPast ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Current Step Info */}
        <div className="mt-3 text-center">
          <h3 className="text-base font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
          <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="bg-orange-50 border-b border-orange-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-sm text-orange-700">You have unsaved changes</span>
            </div>
            <button
              onClick={handleQuickSave}
              disabled={isSaving}
              className="text-sm text-orange-700 hover:text-orange-800 font-medium disabled:opacity-50"
            >
              Save Now
            </button>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="p-6">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1.5" />
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 hover:shadow-lg cursor-pointer text-sm"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            ) : (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
