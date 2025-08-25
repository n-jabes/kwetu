'use client'
import React, { useState, useEffect } from 'react';
import { MapPin, Star, Filter, X } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { FilterState, Listing } from '@/types';
import { SearchResultsSidebar } from '@/components/ui/search-results-sidebar/page';
import { dummyListings } from '@/data/listings';
import Image from 'next/image';
import Link from 'next/link';

// Listing Card Component
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  // Function to truncate title if too long
  const truncateTitle = (title: string, maxLength: number = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  };

  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="aspect-video relative">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        
        {/* Fixed height content area */}
        <div className="p-3 flex flex-col justify-between flex-1">
          <div>
            {/* Fixed height title area */}
            <div className="h-12 mb-1.5 flex items-start">
              <h3 className="font-semibold text-base leading-tight line-clamp-2">
                {truncateTitle(listing.title, 60)}
              </h3>
            </div>
            
            {/* Location with fixed height */}
            <div className="flex items-center text-gray-600 mb-2 h-4">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{listing.location}</span>
            </div>
          </div>
          
          {/* Bottom section - always at bottom */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-current mr-1" />
              <span className="text-xs font-medium">{listing.rating}</span>
            </div>
            <div className="text-sm text-green-700 font-bold text-right">
              ${listing.price}
              <span className="text-xs font-normal text-gray-500 leading-none">
                /night
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Search Results Component
const SearchResultsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000000000],
    propertyType: [],
    amenities: [],
    userRatings: []
  });
  
  const [filteredListings, setFilteredListings] = useState<Listing[]>(dummyListings);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const applyFilters = () => {
    const filtered = dummyListings.filter(listing => {
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
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 shrink-0">
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
              <div className="absolute top-0 left-0 w-72 max-w-[85vw] h-full bg-white overflow-y-auto">
                <div className="p-3 border-b flex items-center justify-between">
                  <h2 className="text-base font-semibold">Filters</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-3">
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
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-1.5">Search Results For Nairobi</h1>
              <p className="text-gray-600 text-sm">Showing {filteredListings.length} of {dummyListings.length} results</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-base">No properties match your current filters.</p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 1000000000],
                      propertyType: [],
                      amenities: [],
                      userRatings: []
                    });
                  }}
                  className="mt-3 text-red-500 hover:text-red-600 font-medium text-sm"
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