'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, AlertCircle, XCircle, Filter, Plus, ArrowUpRight, Eye, Edit, MoreHorizontal, Star } from 'lucide-react';

const GuestBookings = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined
  };

  const bookings = [
    {
      id: 1,
      property: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      status: 'confirmed',
      amount: '$450',
      guests: 4,
      bookingDate: 'Nov 20, 2024',
      propertyImage: '/images/villa.jpg',
      nights: 5,
      propertyType: 'Villa'
    },
    {
      id: 2,
      property: 'Cozy Apartment Downtown',
      location: 'Kigali, Rwanda',
      checkIn: 'Dec 25, 2024',
      checkOut: 'Dec 30, 2024',
      status: 'pending',
      amount: '$320',
      guests: 2,
      bookingDate: 'Nov 25, 2024',
      propertyImage: '/images/house.png',
      nights: 5,
      propertyType: 'Apartment'
    },
    {
      id: 3,
      property: 'Mountain View Cottage',
      location: 'Musanze, Rwanda',
      checkIn: 'Jan 5, 2025',
      checkOut: 'Jan 10, 2025',
      status: 'completed',
      amount: '$280',
      guests: 3,
      bookingDate: 'Nov 15, 2024',
      propertyImage: '/images/kigali.jpg',
      nights: 5,
      propertyType: 'Cottage'
    },
    {
      id: 4,
      property: 'Beachfront Resort',
      location: 'Gisenyi, Rwanda',
      checkIn: 'Feb 10, 2025',
      checkOut: 'Feb 15, 2025',
      status: 'cancelled',
      amount: '$380',
      guests: 2,
      bookingDate: 'Nov 10, 2024',
      propertyImage: '/images/house.png',
      nights: 5,
      propertyType: 'Resort'
    }
  ];

  const stats = [
    {
      label: 'Confirmed',
      value: '3',
      change: '+1',
      gradient: 'from-emerald-500 to-green-600',
      icon: CheckCircle
    },
    {
      label: 'Pending',
      value: '1',
      change: '-1',
      gradient: 'from-amber-500 to-orange-600',
      icon: Clock
    },
    {
      label: 'Completed',
      value: '1',
      change: '+1',
      gradient: 'from-blue-500 to-cyan-600',
      icon: Calendar
    },
    {
      label: 'Cancelled',
      value: '1',
      change: '-1',
      gradient: 'from-red-500 to-pink-600',
      icon: XCircle
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'completed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending Confirmation';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'from-emerald-500 to-green-600';
      case 'pending':
        return 'from-amber-500 to-orange-600';
      case 'completed':
        return 'from-blue-500 to-cyan-600';
      case 'cancelled':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-slate-500 to-gray-600';
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">My Bookings</h1>
            <p className="text-slate-600 mt-2 text-base leading-relaxed max-w-2xl">Manage and track all your property bookings across Rwanda's beautiful destinations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-300 hover:scale-105 group">
              <Filter className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium text-sm">Filter</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium text-sm">New Booking</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-medium">{stat.change}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bookings List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-transparent">
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">All Bookings</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500 font-medium">4 total bookings</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="group border border-slate-200/50 rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-slate-50/30 to-transparent hover:from-slate-100/50">
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    {/* Property Image & Type */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-18 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                        <img
                          src={booking.propertyImage}
                          alt={booking.property}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <div className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusGradient(booking.status)} shadow-lg`}>
                          {booking.propertyType}
                        </div>
                      </div>
                    </div>
                    {/* Booking Details */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">{booking.property}</h3>
                          <div className="flex items-center text-sm text-slate-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />{booking.location}
                          </div>
                        </div>
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border-2 ${getStatusStyle(booking.status)} transition-all duration-300`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{getStatusText(booking.status)}</span>
                        </div>
                      </div>
                      {/* Booking Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center p-2 bg-white/60 rounded-lg border border-slate-200/50">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">Check-in</p>
                            <p className="font-semibold text-slate-900">{booking.checkIn}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-white/60 rounded-lg border border-slate-200/50">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">Check-out</p>
                            <p className="font-semibold text-slate-900">{booking.checkOut}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-white/60 rounded-lg border border-slate-200/50">
                          <Users className="w-4 h-4 mr-2 text-slate-500" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">Guests</p>
                            <p className="font-semibold text-slate-900">{booking.guests}</p>
                          </div>
                        </div>
                      </div>
                      {/* Bottom Section */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-3 border-t border-slate-200/50">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-slate-500"><span className="font-medium">Booked on:</span> {booking.bookingDate}</div>
                          <div className="text-slate-500"><span className="font-medium">{booking.nights} nights</span></div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{booking.amount}</span>
                          <div className="flex space-x-2">
                            {booking.status === 'confirmed' && (
                              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                                View Details
                              </button>
                            )}
                            {booking.status === 'pending' && (
                              <>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                                  View Details
                                </button>
                                <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                                  Cancel
                                </button>
                              </>
                            )}
                            {booking.status === 'completed' && (
                              <>
                                <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                                  Write Review
                                </button>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                                  Book Again
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group relative overflow-hidden p-4 bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-xl border border-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-emerald-700 text-base">Find New Places</span>
                <span className="text-xs text-emerald-600 mt-1">Explore properties</span>
              </div>
            </button>

            <button className="group relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-blue-700 text-base">Book a Stay</span>
                <span className="text-xs text-blue-600 mt-1">Reserve now</span>
              </div>
            </button>

            <button className="group relative overflow-hidden p-4 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-xl border border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-purple-700 text-base">Write a Review</span>
                <span className="text-xs text-purple-600 mt-1">Share experience</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestBookings;
