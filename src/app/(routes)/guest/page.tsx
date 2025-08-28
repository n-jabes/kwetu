'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { 
  Calendar, 
  Heart, 
  Star, 
  CreditCard, 
  MapPin, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Users,
  Eye,
  Plus
} from 'lucide-react';

const GuestDashboard = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined
  };

  // Mock data for dashboard
  const stats = [
    { 
      label: 'Total Bookings', 
      value: '12', 
      change: '+2 this month',
      icon: Calendar, 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    { 
      label: 'Favorites', 
      value: '8', 
      change: '+1 this week',
      icon: Heart, 
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200'
    },
    { 
      label: 'Reviews Given', 
      value: '15', 
      change: '4.8 avg rating',
      icon: Star, 
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200'
    },
    { 
      label: 'Total Spent', 
      value: '$2,450', 
      change: '$320 this month',
      icon: CreditCard, 
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200'
    },
  ];

  const recentBookings = [
    {
      id: 1,
      property: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      date: 'Dec 15-20, 2024',
      status: 'confirmed',
      amount: '$450',
            image: '/images/house.png'
      },
      {
        id: 2,
        property: 'Cozy Apartment Downtown',
        location: 'Kigali, Rwanda',
        date: 'Dec 25-30, 2024',
        status: 'pending',
        amount: '$320',
        image: '/images/kigali.jpg'
    },
    {
      id: 3,
      property: 'Mountain View Cottage',
      location: 'Musanze, Rwanda',
      date: 'Jan 5-10, 2025',
      status: 'completed',
      amount: '$280',
              image: '/images/villa.jpg'
      }
  ];

  const upcomingTrips = [
    {
      id: 1,
      property: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      guests: 4,
              image: '/images/villa.jpg'
      },
      {
        id: 2,
        property: 'Cozy Apartment Downtown',
        location: 'Kigali, Rwanda',
        checkIn: 'Dec 25, 2024',
        checkOut: 'Dec 30, 2024',
        guests: 2,
        image: '/images/house.png'
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
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
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
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl p-4 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Welcome back, {userData.name}! 👋</h2>
                <p className="text-emerald-100 text-sm leading-relaxed max-w-2xl">
                  Ready for your next adventure? Discover amazing places to stay across Rwanda's beautiful landscapes.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${stat.bgGradient} rounded-lg p-3 shadow-sm border ${stat.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-medium">{stat.change}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.gradient} p-2 rounded-lg shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Recent Bookings */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-transparent">
              <h3 className="text-base font-bold text-slate-900">Recent Bookings</h3>
              <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors group">
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
            <div className="p-3">
              <div className="space-y-2">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="group p-3 bg-gradient-to-r from-slate-50/50 to-transparent rounded-lg border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={booking.image}
                          alt={booking.property}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">{booking.property}</h4>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {booking.location}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(booking.status)} transition-all duration-300`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                        <p className="font-bold text-slate-900 mt-1 text-sm">{booking.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-transparent">
              <h3 className="text-base font-bold text-slate-900">Upcoming Trips</h3>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="p-3 space-y-3">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="group p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="w-full h-12 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.property}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 text-sm">{trip.property}</h4>
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {trip.location}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/60 rounded-lg">
                      <p className="text-slate-500 font-medium">Check-in</p>
                      <p className="font-semibold text-slate-900">{trip.checkIn}</p>
                    </div>
                    <div className="p-2 bg-white/60 rounded-lg">
                      <p className="text-slate-500 font-medium">Check-out</p>
                      <p className="font-semibold text-slate-900">{trip.checkOut}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-slate-600">
                        <Users className="w-3 h-3 mr-1" />
                        <span className="font-semibold">{trip.guests}</span> guests
                      </div>
                      <button className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {upcomingTrips.length === 0 && (
                <div className="text-center py-4">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-medium text-sm">No upcoming trips</p>
                  <button className="mt-2 px-2 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 text-xs font-medium hover:scale-105 shadow-lg">
                    Book Your Next Stay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="group relative overflow-hidden p-3 bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-lg border border-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mb-2 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-emerald-700 text-sm">Find New Places</span>
                <span className="text-xs text-emerald-600 mt-1">Explore properties</span>
              </div>
            </button>

            <button className="group relative overflow-hidden p-3 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-2 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-blue-700 text-sm">Book a Stay</span>
                <span className="text-xs text-blue-600 mt-1">Reserve now</span>
              </div>
            </button>

            <button className="group relative overflow-hidden p-3 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-lg border border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-2 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-purple-700 text-sm">Write a Review</span>
                <span className="text-xs text-purple-600 mt-1">Share experience</span>
              </div>
            </button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Your Activity</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-900">47</p>
              <p className="text-xs text-slate-600 font-medium">Properties Viewed</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-900">8</p>
              <p className="text-xs text-slate-600 font-medium">Saved Favorites</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Star className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-900">4.8</p>
              <p className="text-xs text-slate-600 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestDashboard;