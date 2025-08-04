'use client'
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, MapPin, Star, Wifi, Car, Waves, Dumbbell, Filter } from 'lucide-react';

// TypeScript interfaces
interface Listing {
  id: string;
  title: string;
  location: string;
  sublocation: string;
  price: number;
  rating: number;
  imageUrl: string;
  propertyType: 'apartment' | 'villa' | 'house';
  amenities: string[];
}

interface FilterState {
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
  userRatings: number[];
}

// Dummy data
const dummyListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Apartment in Westlands',
    location: 'Westlands, Nairobi',
    sublocation: 'Westlands',
    price: 85,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    propertyType: 'apartment',
    amenities: ['Wi-Fi', 'Parking']
  },
  {
    id: '2',
    title: 'Luxury Villa in Karen',
    location: 'Karen, Nairobi',
    sublocation: 'Karen',
    price: 250,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    propertyType: 'villa',
    amenities: ['Wi-Fi', 'Swimming Pool', 'Parking', 'Gym']
  },
  {
    id: '3',
    title: 'Modern House in Lavington',
    location: 'Lavington, Nairobi',
    sublocation: 'Lavington',
    price: 180,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    propertyType: 'house',
    amenities: ['Wi-Fi', 'Parking', 'Gym']
  },
  {
    id: '4',
    title: 'Spacious Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    sublocation: 'Kilimani',
    price: 120,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'apartment',
    amenities: ['Wi-Fi', 'Parking']
  },
  {
    id: '5',
    title: 'Elegant Villa in Muthaiga',
    location: 'Muthaiga, Nairobi',
    sublocation: 'Muthaiga',
    price: 300,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    propertyType: 'villa',
    amenities: ['Wi-Fi', 'Swimming Pool', 'Parking', 'Gym']
  }
];

// Navbar Component
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-red-500">KWETU</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Rent
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Buy
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Sell
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Manage Property
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              List your place
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium text-left">
                Rent
              </button>
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium text-left">
                Buy
              </button>
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium text-left">
                Sell
              </button>
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium text-left">
                Manage Property
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2">
                List your place
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar: React.FC<{
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

// Listing Card Component
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">{listing.rating}</span>
          </div>
          <div className="text-lg font-bold">
            ${listing.price}<span className="text-sm font-normal text-gray-500">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Search Results Component
const SearchResultsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    propertyType: [],
    amenities: [],
    userRatings: []
  });
  
  const [filteredListings, setFilteredListings] = useState<Listing[]>(dummyListings);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const applyFilters = () => {
    let filtered = dummyListings.filter(listing => {
      // Price filter
      if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
        return false;
      }
      
      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(listing.propertyType)) {
        return false;
      }
      
      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasRequiredAmenities = filters.amenities.every(amenity =>
          listing.amenities.includes(amenity)
        );
        if (!hasRequiredAmenities) return false;
      }
      
      // Rating filter
      if (filters.userRatings.length > 0) {
        const meetsRating = filters.userRatings.some(rating => listing.rating >= rating);
        if (!meetsRating) return false;
      }
      
      return true;
    });
    
    setFilteredListings(filtered);
    setIsSidebarOpen(false); // Close mobile sidebar after applying
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80 shrink-0">
            <Sidebar
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={applyFilters}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
              <div className="absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-white overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4">
                  <Sidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApplyFilters={applyFilters}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Search Results For Nairobi</h1>
              <p className="text-gray-600">Showing {filteredListings.length} of {dummyListings.length} results</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 1000],
                      propertyType: [],
                      amenities: [],
                      userRatings: []
                    });
                  }}
                  className="mt-4 text-red-500 hover:text-red-600 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;