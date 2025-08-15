'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface PhotosStepProps {
  formData: {
    photos: File[];
    photoUrls: string[];
  };
  updateFormData: (updates: { photos: File[] }) => void;
  errors: { [key: string]: string };
}

export const PhotosStep: React.FC<PhotosStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (formData.photos.length + acceptedFiles.length > 30) {
      alert('Maximum 30 photos allowed');
      return;
    }
    
    const newPhotos = [...formData.photos, ...acceptedFiles];
    updateFormData({ photos: newPhotos });
  }, [formData.photos, updateFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 30 - formData.photos.length
  });

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
    
    // Adjust main photo index if needed
    if (index === mainPhotoIndex && newPhotos.length > 0) {
      setMainPhotoIndex(0);
    } else if (index < mainPhotoIndex) {
      setMainPhotoIndex(mainPhotoIndex - 1);
    }
  };

  const movePhoto = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index > 0) {
      const newPhotos = [...formData.photos];
      [newPhotos[index], newPhotos[index - 1]] = [newPhotos[index - 1], newPhotos[index]];
      updateFormData({ photos: newPhotos });
      
      // Adjust main photo index
      if (index === mainPhotoIndex) {
        setMainPhotoIndex(index - 1);
      } else if (index - 1 === mainPhotoIndex) {
        setMainPhotoIndex(index);
      }
    } else if (direction === 'right' && index < formData.photos.length - 1) {
      const newPhotos = [...formData.photos];
      [newPhotos[index], newPhotos[index + 1]] = [newPhotos[index + 1], newPhotos[index]];
      updateFormData({ photos: newPhotos });
      
      // Adjust main photo index
      if (index === mainPhotoIndex) {
        setMainPhotoIndex(index + 1);
      } else if (index + 1 === mainPhotoIndex) {
        setMainPhotoIndex(index);
      }
    }
  };

  const setMainPhoto = (index: number) => {
    setMainPhotoIndex(index);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Photos</h3>
        <p className="text-gray-600 mb-4">
          Upload up to 30 photos of your property. The first photo will be the main image.
        </p>
        
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? 'Drop photos here' : 'Drag & drop photos here'}
          </p>
          <p className="text-gray-500 mb-4">or click to browse files</p>
          <p className="text-sm text-gray-400">
            {formData.photos.length}/30 photos uploaded • JPG, PNG, GIF, WebP up to 10MB each
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      {formData.photos.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-3">
            Uploaded Photos ({formData.photos.length}/30)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Image Display */}
                <div className="aspect-video bg-gray-100">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Main Photo Indicator */}
                {index === mainPhotoIndex && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center z-10">
                    <Star className="w-3 h-3 mr-1" />
                    Main
                  </div>
                )}
                
                {/* Hover Controls - Always Visible */}
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                  {/* Left Arrow */}
                  <button
                    onClick={() => movePhoto(index, 'left')}
                    disabled={index === 0}
                    className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transform -translate-x-2 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={() => movePhoto(index, 'right')}
                    disabled={index === formData.photos.length - 1}
                    className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transform translate-x-2 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Action Buttons - Always Visible */}
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  {/* Set as Main */}
                  <button
                    onClick={() => setMainPhoto(index)}
                    className={`p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                      index === mainPhotoIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-500 hover:text-white'
                    }`}
                    title={index === mainPhotoIndex ? 'Main photo' : 'Set as main photo'}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removePhoto(index)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Photo Info */}
                <div className="p-3 bg-white border-t border-gray-100">
                  <p className="text-sm text-gray-600 truncate">
                    Photo {index + 1} • {photo.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(photo.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.photos && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          {errors.photos}
        </p>
      )}
    </div>
  );
};
