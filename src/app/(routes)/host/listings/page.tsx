'use client'
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Home, Plus, MapPin, Star, Calendar, Eye, DollarSign, MoreHorizontal, Edit, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const HostListings = () => {
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
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Listings</h1>
            <p className="text-slate-600 mt-1 text-sm leading-relaxed max-w-2xl">Manage and track all your property bookings across Rwanda&apos;s beautiful destinations</p>
          </div>
          <Link href="/add-listing" className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">8</p>
                <p className="text-xs text-slate-600 uppercase tracking-wide">Total Listings</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          
          <div className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">28</p>
                <p className="text-xs text-slate-600 uppercase tracking-wide">Active Bookings</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          
          <div className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">4.8</p>
                <p className="text-xs text-slate-600 uppercase tracking-wide">Avg. Rating</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          
          <div className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">$6,130</p>
                <p className="text-xs text-slate-600 uppercase tracking-wide">Total Revenue</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Listing Image */}
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-36 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 right-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(listing.status)}`}>
                    {getStatusText(listing.status)}
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {listing.type}
                  </div>
                </div>
              </div>

              {/* Listing Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{listing.name}</h3>
                    <div className="flex items-center text-xs text-slate-500 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {listing.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">{listing.price}</p>
                    <p className="text-xs text-slate-500">per night</p>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-semibold text-slate-800 text-sm">{listing.rating}</span>
                    <span className="text-slate-500 ml-1 text-xs">({listing.reviews} reviews)</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Updated {listing.lastUpdated}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                  <div className="text-center">
                    <p className="text-slate-600">Bookings</p>
                    <p className="font-semibold text-slate-800">{listing.bookings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-600">Revenue</p>
                    <p className="font-semibold text-slate-800">{listing.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-600">Status</p>
                    <p className="font-semibold text-slate-800 capitalize">{listing.status}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-3">
                  <p className="text-xs text-slate-600 mb-2 uppercase tracking-wide">Amenities:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100/80 text-slate-700 text-xs rounded-full border border-slate-200/50"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenities.length > 4 && (
                      <span className="px-2 py-1 bg-slate-100/80 text-slate-700 text-xs rounded-full border border-slate-200/50">
                        +{listing.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/50">
                  <div className="flex space-x-1">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors rounded-md hover:bg-emerald-50">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-50">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg text-xs transition-all duration-300 hover:scale-105 shadow-sm">
                    Manage
                  </button>
                </div>
              </div>
              
              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-3"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/add-listing" className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-emerald-700">Add New Listing</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700">View Analytics</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Performance</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostListings;
