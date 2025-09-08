'use client'
import React from 'react';
import { 
  Eye, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Users, 
  MapPin,
  Camera,
  Edit3,
  BarChart3
} from 'lucide-react';
import { ListingFormData } from '@/types';

interface PropertySummaryProps {
  listing: ListingFormData;
  listingId: string;
  onEditClick?: () => void;
}

export const PropertySummary: React.FC<PropertySummaryProps> = ({
  listing,
  listingId,
  onEditClick
}) => {
  // Mock data for demonstration
  const stats = {
    views: 1247,
    bookings: 23,
    revenue: 4850,
    rating: 4.8,
    occupancy: 76
  };

  const recentActivity = [
    { type: 'booking', message: 'New booking from Sarah K.', time: '2 hours ago' },
    { type: 'review', message: 'New 5-star review received', time: '1 day ago' },
    { type: 'view', message: '15 new views today', time: '3 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Property Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{listing.streetAddress || `${listing.city}, ${listing.district}`}</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">{listing.maxGuests} guests</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">{listing.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">{listing.currency} {listing.pricePerNight}/night</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm font-semibold text-green-700">{stats.rating}</span>
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Views</p>
              <p className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">+12% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">+8% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">+15% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.occupancy}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">+5% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-600">23 reviews</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={onEditClick}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <Camera className="w-5 h-5 text-gray-400 group-hover:text-green-500 mr-3 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-green-700 transition-colors">Update Photos</span>
          </button>
          
          <button 
            onClick={onEditClick}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <DollarSign className="w-5 h-5 text-gray-400 group-hover:text-green-500 mr-3 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-green-700 transition-colors">Adjust Pricing</span>
          </button>
          
          <button 
            onClick={onEditClick}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <Edit3 className="w-5 h-5 text-gray-400 group-hover:text-green-500 mr-3 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-green-700 transition-colors">Edit Description</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'booking' ? 'bg-green-500' :
                activity.type === 'review' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};
