'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const HostDashboard = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HOST' as const,
    avatar: undefined
  };

  // Mock data for dashboard
  const stats = [
    { label: 'Total Listings', value: '8', icon: MapPin, color: 'bg-blue-500', change: '+2 this month' },
    { label: 'Active Bookings', value: '15', icon: Calendar, color: 'bg-green-500', change: '+5 this week' },
    { label: 'Total Earnings', value: '$8,450', icon: DollarSign, color: 'bg-yellow-500', change: '+12% vs last month' },
    { label: 'Guest Reviews', value: '4.8', icon: Star, color: 'bg-purple-500', change: '+0.2 this month' },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: 'John Smith',
      property: 'Luxury Villa in Kigali',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      status: 'confirmed',
      amount: '$450',
      guests: 4
    },
    {
      id: 2,
      guest: 'Emma Wilson',
      property: 'Cozy Apartment Downtown',
      checkIn: 'Dec 25, 2024',
      checkOut: 'Dec 30, 2024',
      status: 'pending',
      amount: '$320',
      guests: 2
    },
    {
      id: 3,
      guest: 'Michael Brown',
      property: 'Mountain View Cottage',
      checkIn: 'Jan 5, 2025',
      checkOut: 'Jan 10, 2025',
      status: 'completed',
      amount: '$280',
      guests: 3
    }
  ];

  const properties = [
    {
      id: 1,
      name: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      type: 'Villa',
      status: 'active',
      bookings: 12,
      rating: 4.9,
      revenue: '$2,450'
    },
    {
      id: 2,
      name: 'Cozy Apartment Downtown',
      location: 'Kigali, Rwanda',
      type: 'Apartment',
      status: 'active',
      bookings: 8,
      rating: 4.7,
      revenue: '$1,680'
    },
    {
      id: 3,
      name: 'Mountain View Cottage',
      location: 'Musanze, Rwanda',
      type: 'Cottage',
      status: 'maintenance',
      bookings: 5,
      rating: 4.8,
      revenue: '$1,200'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPropertyStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name}! 🏠</h2>
          <p className="text-blue-100">Your properties are performing great! Keep up the excellent hosting.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{booking.guest}</h4>
                      <p className="text-sm text-gray-600">{booking.property}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {booking.checkIn} - {booking.checkOut}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <Users className="w-4 h-4 inline mr-1" />
                        {booking.guests} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </div>
                      <p className="font-semibold text-gray-900 mt-2">{booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Properties Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
              <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                <Plus className="w-4 h-4 mr-1" />
                Add New
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{property.name}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPropertyStatusColor(property.status)}`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Bookings</p>
                        <p className="font-medium text-gray-900">{property.bookings}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-medium text-gray-900">{property.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium text-gray-900">{property.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
                <Plus className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium text-green-700">Add Property</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-blue-700">Manage Bookings</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors group">
                <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium text-purple-700">Respond to Guests</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors group">
                <TrendingUp className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="font-medium text-yellow-700">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Monthly Growth</span>
                </div>
                <span className="text-lg font-bold text-green-600">+15%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">New Guests</span>
                </div>
                <span className="text-lg font-bold text-blue-600">+8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Avg. Rating</span>
                </div>
                <span className="text-lg font-bold text-purple-600">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostDashboard;
