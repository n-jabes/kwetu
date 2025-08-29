'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Lock, Bell, Settings, Star } from 'lucide-react';

const GuestProfile = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined
  };

  const profileInfo = [
    { label: 'Full Name', value: 'John Doe', icon: User, color: 'from-emerald-500 to-green-600' },
    { label: 'Email', value: 'john.doe@example.com', icon: Mail, color: 'from-blue-500 to-cyan-600' },
    { label: 'Phone', value: '+250 788 123 456', icon: Phone, color: 'from-purple-500 to-pink-600' },
    { label: 'Location', value: 'Kigali, Rwanda', icon: MapPin, color: 'from-orange-500 to-red-600' },
    { label: 'Member Since', value: 'January 2024', icon: Calendar, color: 'from-indigo-500 to-purple-600' },
    { label: 'Account Status', value: 'Verified', icon: Shield, color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-100/30"></div>
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-white/50">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{userData.name}</h1>
              <p className="text-sm text-slate-600">{userData.email}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{userData.role}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 hover:bg-white transition-all duration-300 hover:scale-105 shadow-sm">
                <Edit3 className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 hover:bg-white transition-all duration-300 hover:scale-105 shadow-sm">
                <Settings className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-3"></div>
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profileInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/60 to-slate-50/60 backdrop-blur-sm rounded-lg border border-white/40 p-3 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{info.value}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-emerald-700">Edit Profile</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700">Security</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Notifications</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
            Account Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Total Bookings</p>
                  <p className="text-lg font-bold text-emerald-800">24</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Saved Places</p>
                  <p className="text-lg font-bold text-blue-800">12</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Reviews</p>
                  <p className="text-lg font-bold text-purple-800">8</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestProfile;
