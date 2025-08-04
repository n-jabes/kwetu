'use client'
import React, { useState, useEffect } from 'react';
import { MapPin, Star, Filter, X } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { FilterState } from '@/types';
import { SearchResultsSidebar } from '@/components/ui/search-results-sidebar/page';

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
      <SearchResultsNavbar />
      
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
            <SearchResultsSidebar
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
                  <SearchResultsSidebar
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