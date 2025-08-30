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
  Plus,
  Home,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

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
    { label: 'Total Listings', value: '8', icon: Home, color: 'from-blue-500 to-cyan-600', change: '+2 this month' },
    { label: 'Active Bookings', value: '15', icon: Calendar, color: 'from-emerald-500 to-green-600', change: '+5 this week' },
    { label: 'Total Earnings', value: '$8,450', icon: DollarSign, color: 'from-yellow-500 to-orange-600', change: '+12% vs last month' },
    { label: 'Guest Reviews', value: '4.8', icon: Star, color: 'from-purple-500 to-pink-600', change: '+0.2 this month' },
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
      guests: 4,
      image: '/images/villa.jpg'
    },
    {
      id: 2,
      guest: 'Emma Wilson',
      property: 'Cozy Apartment Downtown',
      checkIn: 'Dec 25, 2024',
      checkOut: 'Dec 30, 2024',
      status: 'pending',
      amount: '$320',
      guests: 2,
      image: '/images/house.png'
    },
    {
      id: 3,
      guest: 'Michael Brown',
      property: 'Mountain View Cottage',
      checkIn: 'Jan 5, 2025',
      checkOut: 'Jan 10, 2025',
      status: 'completed',
      amount: '$280',
      guests: 3,
      image: '/images/kigali.jpg'
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
      revenue: '$2,450',
      image: '/images/villa.jpg'
    },
    {
      id: 2,
      name: 'Cozy Apartment Downtown',
      location: 'Kigali, Rwanda',
      type: 'Apartment',
      status: 'active',
      bookings: 8,
      rating: 4.7,
      revenue: '$1,680',
      image: '/images/house.png'
    },
    {
      id: 3,
      name: 'Mountain View Cottage',
      location: 'Musanze, Rwanda',
      type: 'Cottage',
      status: 'maintenance',
      bookings: 5,
      rating: 4.8,
      revenue: '$1,200',
      image: '/images/kigali.jpg'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-emerald-600 bg-emerald-50/80 border-emerald-200/50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50/80 border-yellow-200/50';
      case 'completed':
        return 'text-blue-600 bg-blue-50/80 border-blue-200/50';
      default:
        return 'text-slate-600 bg-slate-50/80 border-slate-200/50';
    }
  };

  const getPropertyStatusColor = (status: string) => {
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

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-4">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/90 to-cyan-600/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-700/20"></div>
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-2">Welcome back, {userData.name}! 🏠</h2>
            <p className="text-blue-100 text-sm">Your properties are performing great! Keep up the excellent hosting.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-600 mt-1 uppercase tracking-wide">{stat.label}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Bookings */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-3"></div>
                Recent Bookings
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="group relative overflow-hidden bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center space-x-3">
                      <img
                        src={booking.image}
                        alt={booking.property}
                        className="w-12 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-800 text-sm">{booking.guest}</h4>
                        <p className="text-xs text-slate-600 truncate">{booking.property}</p>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          <Users className="w-3 h-3 inline mr-1" />
                          {booking.guests} guests
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                        <p className="font-semibold text-slate-800 mt-2 text-sm">{booking.amount}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Properties Overview */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
                My Properties
              </h3>
              <Link href="/add-listing" className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium hover:scale-105 transition-transform duration-300">
                <Plus className="w-4 h-4 mr-1" />
                Add New
              </Link>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {properties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-10 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-slate-800 text-sm">{property.name}</h4>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.location}
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPropertyStatusColor(property.status)}`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-slate-600">Bookings</p>
                        <p className="font-medium text-slate-800">{property.bookings}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span className="font-medium text-slate-800">{property.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-600">Revenue</p>
                        <p className="font-medium text-slate-800">{property.revenue}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/add-listing" className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">Add Property</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
              
              <button className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">Manage Bookings</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
              
              <button className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-purple-700">Respond to Guests</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
              
              <button className="group relative overflow-hidden bg-gradient-to-br from-yellow-50/80 to-orange-100/80 backdrop-blur-sm rounded-lg border border-yellow-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                    <BarChart3 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-yellow-700">View Analytics</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full mr-3"></div>
              Performance Summary
            </h3>
            <div className="space-y-3">
              <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mr-3" />
                    <span className="text-sm font-medium text-slate-700">Monthly Growth</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-600">+15%</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
              
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-slate-700">New Guests</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">+8</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
              
              <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-slate-700">Avg. Rating</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">4.8</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostDashboard;
