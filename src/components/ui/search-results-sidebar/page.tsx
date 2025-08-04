'use client'
import { FilterState } from "@/types";
import { Car, Dumbbell, Star, Waves, Wifi } from "lucide-react";
import { useState } from "react";

// Sidebar Component
export const SearchResultsSidebar: React.FC<{
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters: () => void;
  }> = ({ filters, onFiltersChange, onApplyFilters }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const validateFilters = () => {
      const newErrors: { [key: string]: string } = {};
  
      if (filters.priceRange[0] < 0) {
        newErrors.minPrice = 'Minimum price cannot be negative';
      }
      if (filters.priceRange[1] <= filters.priceRange[0]) {
        newErrors.maxPrice = 'Maximum price must be greater than minimum price';
      }
      if (filters.priceRange[1] > 10000) {
        newErrors.maxPrice = 'Maximum price cannot exceed $10,000';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = () => {
      if (validateFilters()) {
        console.log('Applied Filters:', filters);
        onApplyFilters();
      }
    };
  
    const handlePriceChange = (type: 'min' | 'max', value: string) => {
      const numValue = parseInt(value) || 0;
      const newRange: [number, number] = [...filters.priceRange];
      if (type === 'min') {
        newRange[0] = numValue;
      } else {
        newRange[1] = numValue;
      }
      onFiltersChange({ ...filters, priceRange: newRange });
    };
  
    const handlePropertyTypeChange = (type: string, checked: boolean) => {
      const newTypes = checked
        ? [...filters.propertyType, type]
        : filters.propertyType.filter(t => t !== type);
      onFiltersChange({ ...filters, propertyType: newTypes });
    };
  
    const handleAmenityChange = (amenity: string, checked: boolean) => {
      const newAmenities = checked
        ? [...filters.amenities, amenity]
        : filters.amenities.filter(a => a !== amenity);
      onFiltersChange({ ...filters, amenities: newAmenities });
    };
  
    const handleRatingChange = (rating: number, checked: boolean) => {
      const newRatings = checked
        ? [...filters.userRatings, rating]
        : filters.userRatings.filter(r => r !== rating);
      onFiltersChange({ ...filters, userRatings: newRatings });
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>
  
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price range</h3>
          <div className="space-y-3">
            <div>
              <input
                type="number"
                placeholder="Min price"
                value={filters.priceRange[0] || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.minPrice ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.minPrice && <p className="text-red-500 text-xs mt-1">{errors.minPrice}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Max price"
                value={filters.priceRange[1] || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.maxPrice ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.maxPrice && <p className="text-red-500 text-xs mt-1">{errors.maxPrice}</p>}
            </div>
          </div>
        </div>
  
        {/* Property Type */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Property Type</h3>
          <div className="space-y-2">
            {['apartment', 'villa', 'house'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.propertyType.includes(type)}
                  onChange={(e) => handlePropertyTypeChange(type, e.target.checked)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Amenities</h3>
          <div className="space-y-2">
            {[
              { name: 'Wi-Fi', icon: Wifi },
              { name: 'Parking', icon: Car },
              { name: 'Swimming Pool', icon: Waves },
              { name: 'Gym', icon: Dumbbell }
            ].map(({ name, icon: Icon }) => (
              <label key={name} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(name)}
                  onChange={(e) => handleAmenityChange(name, e.target.checked)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* User Ratings */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">User Ratings</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.userRatings.includes(rating)}
                  onChange={(e) => handleRatingChange(rating, e.target.checked)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <div className="flex items-center">
                  <span>{rating}</span>
                  <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current" />
                  {rating > 1 && <span className="text-sm text-gray-500 ml-1">& up</span>}
                </div>
              </label>
            ))}
          </div>
        </div>
  
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Apply Filters
        </button>
      </div>
    );
  };
  