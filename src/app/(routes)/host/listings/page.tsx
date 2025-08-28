'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { MapPin, Star, Calendar, Users, DollarSign, Plus, Edit, Eye, MoreHorizontal } from 'lucide-react';

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
        return 'text-green-600 bg-green-50 border-green-200';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-2">Manage your property listings and track performance</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add New Listing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Total Listings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-sm text-gray-600">Active Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Avg. Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$6,130</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Listing Image */}
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(listing.status)}`}>
                    {getStatusText(listing.status)}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm font-medium">
                    {listing.type}
                  </div>
                </div>
              </div>

              {/* Listing Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{listing.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-900">{listing.rating}</span>
                    <span className="text-gray-500 ml-1">({listing.reviews} reviews)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated {listing.lastUpdated}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Bookings</p>
                    <p className="font-semibold text-gray-900">{listing.bookings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">{listing.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900 capitalize">{listing.status}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostListings;
