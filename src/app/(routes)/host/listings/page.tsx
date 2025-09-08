'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Home, Plus, MapPin, Star, Calendar, Eye, DollarSign, MoreHorizontal, Edit, Award, TrendingUp, Filter, Search } from 'lucide-react';

const HostListings = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Hardcoded user data for testing
  const userData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HOST' as const,
    avatar: undefined
  };

  const listings = [
    {
      id: 1,
      name: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      type: 'Villa',
      status: 'active',
      price: '$150',
      rating: 4.9,
      reviews: 24,
      bookings: 12,
      revenue: '$2,450',
      image: '/images/villa.jpg',
      amenities: ['WiFi', 'Pool', 'Kitchen', 'Parking'],
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Cozy Apartment Downtown',
      location: 'Kigali, Rwanda',
      type: 'Apartment',
      status: 'active',
      price: '$80',
      rating: 4.7,
      reviews: 18,
      bookings: 8,
      revenue: '$1,680',
      image: '/images/house.png',
      amenities: ['WiFi', 'Kitchen', 'Balcony'],
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      name: 'Mountain View Cottage',
      location: 'Musanze, Rwanda',
      type: 'Cottage',
      status: 'maintenance',
      price: '$95',
      rating: 4.8,
      reviews: 15,
      bookings: 5,
      revenue: '$1,200',
      image: '/images/kigali.jpg',
      amenities: ['WiFi', 'Fireplace', 'Garden'],
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      name: 'Beachfront Resort',
      location: 'Gisenyi, Rwanda',
      type: 'Resort',
      status: 'inactive',
      price: '$120',
      rating: 4.6,
      reviews: 12,
      bookings: 3,
      revenue: '$800',
      image: '/images/house.png',
      amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant'],
      lastUpdated: '2 weeks ago'
    }
  ];

  // Filter listings based on search query
  const filteredListings = useMemo(() => {
    if (!searchQuery.trim()) {
      return listings;
    }
    
    return listings.filter(listing =>
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50/80 border-emerald-200/50';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50/80 border-yellow-200/50';
      case 'inactive':
        return 'text-slate-600 bg-slate-50/80 border-slate-200/50';
      default:
        return 'text-slate-600 bg-slate-50/80 border-slate-200/50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'maintenance':
        return 'Maintenance';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-8">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">My Properties</h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
              Manage your property portfolio and track performance across Rwanda's premier destinations
            </p>
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <Filter className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            
            <Link href="/add-listing" className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Link>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">8</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Total Properties</p>
              <p className="text-sm text-blue-600 font-medium">4 active listings</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-blue-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>2 new this month</span>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">28</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Active Bookings</p>
              <p className="text-sm text-emerald-600 font-medium">+12% this month</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-emerald-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>5 pending reviews</span>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.8</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Average Rating</p>
              <p className="text-sm text-amber-600 font-medium">Based on 69 reviews</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-amber-600">
              <Star className="w-3 h-3 mr-1 fill-current" />
              <span>Top 10% host</span>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">$6,130</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Total Revenue</p>
              <p className="text-sm text-purple-600 font-medium">+18% this month</p>
            </div>
            <div className="mt-3 flex items-center text-xs text-purple-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>$2,450 projected</span>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              {filteredListings.length === 0 
                ? `No results for "${searchQuery}"`
                : `${filteredListings.length} ${filteredListings.length === 1 ? 'property' : 'properties'} found for "${searchQuery}"`
              }
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Enhanced Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 text-center max-w-md">
                {searchQuery.trim() 
                  ? `No properties match "${searchQuery}". Try searching with different keywords.`
                  : "No properties available at the moment."
                }
              </p>
              {searchQuery.trim() && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Enhanced Property Image */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(listing.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      listing.status === 'active' ? 'bg-emerald-500' : 
                      listing.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-400'
                    }`}></div>
                    {getStatusText(listing.status)}
                  </div>
                </div>
                
                {/* Property Type */}
                <div className="absolute top-4 left-4">
                  <div className="bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    {listing.type}
                  </div>
                </div>
              </div>

              {/* Compact Property Details */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">{listing.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="text-lg font-bold text-gray-900">{listing.price}</div>
                    <div className="text-xs text-gray-500">per night</div>
                  </div>
                </div>

                {/* Rating & Performance */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-1 fill-current" />
                    <span className="font-medium text-gray-900 text-sm">{listing.rating}</span>
                    <span className="text-gray-500 ml-1 text-sm">({listing.reviews})</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated {listing.lastUpdated}
                  </div>
                </div>

                {/* Enhanced Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="text-base font-bold text-gray-900">{listing.bookings}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Bookings</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="text-base font-bold text-gray-900">{listing.revenue}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Revenue</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="text-base font-bold text-gray-900">{listing.reviews}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Reviews</div>
                  </div>
                </div>

                {/* Improved Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {listing.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100 font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200 font-medium">
                        +{listing.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Link href={`/listings/${listing.id}`}>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/host/manage-property/${listing.id}`}>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <Link href={`/host/manage-property/${listing.id}`}>
                    <button className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                      Manage
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-sm text-gray-600">Streamline your property management with these shortcuts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/add-listing" className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 hover:border-blue-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Add Property</div>
                  <div className="text-xs text-gray-600">List a new property</div>
                </div>
              </div>
            </Link>
            
            <button className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Analytics</div>
                  <div className="text-xs text-gray-600">View performance data</div>
                </div>
              </div>
            </button>
            
            <button className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 hover:border-purple-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Optimize</div>
                  <div className="text-xs text-gray-600">Boost performance</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostListings;
