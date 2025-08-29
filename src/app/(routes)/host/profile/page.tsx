'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Award, Star, Edit3, Lock, Bell, Settings, Home, TrendingUp } from 'lucide-react';

const HostProfile = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HOST' as const,
    avatar: undefined
  };

  const profileInfo = [
    { label: 'Full Name', value: 'Sarah Johnson', icon: User, color: 'from-blue-500 to-cyan-600' },
    { label: 'Email', value: 'sarah.johnson@example.com', icon: Mail, color: 'from-indigo-500 to-purple-600' },
    { label: 'Phone', value: '+250 788 987 654', icon: Phone, color: 'from-purple-500 to-pink-600' },
    { label: 'Location', value: 'Kigali, Rwanda', icon: MapPin, color: 'from-orange-500 to-red-600' },
    { label: 'Host Since', value: 'March 2023', icon: Calendar, color: 'from-green-500 to-emerald-600' },
    { label: 'Account Status', value: 'Superhost', icon: Award, color: 'from-yellow-500 to-orange-600' },
  ];

  const hostStats = [
    { label: 'Total Properties', value: '8', color: 'from-blue-500 to-cyan-600', icon: Home },
    { label: 'Total Bookings', value: '156', color: 'from-emerald-500 to-green-600', icon: Calendar },
    { label: 'Average Rating', value: '4.8', color: 'from-yellow-500 to-orange-600', icon: Star },
    { label: 'Response Rate', value: '98%', color: 'from-purple-500 to-pink-600', icon: TrendingUp },
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-100/30"></div>
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-white/50">
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
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full border-2 border-white flex items-center justify-center">
                <Award className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{userData.name}</h1>
              <p className="text-sm text-slate-600">{userData.email}</p>
              <div className="flex items-center mt-1 space-x-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{userData.role}</span>
                </div>
                <div className="flex items-center px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-md border border-yellow-200/50">
                  <Award className="w-3 h-3 text-yellow-600 mr-1" />
                  <span className="text-xs font-medium text-yellow-700">Superhost</span>
                </div>
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

        {/* Host Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {hostStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-3 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            );
          })}
        </div>

        {/* Profile Information Grid */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
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

        {/* Host Verification */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-3"></div>
            Verification & Trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">Identity Verified</p>
                  <p className="text-xs text-emerald-600">Government ID confirmed</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Phone Verified</p>
                  <p className="text-xs text-blue-600">+250 788 987 654</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">Email Verified</p>
                  <p className="text-xs text-purple-600">sarah.johnson@example.com</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-100/80 backdrop-blur-sm rounded-lg border border-blue-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700">Edit Profile</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-emerald-700">Security</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm rounded-lg border border-purple-200/50 p-3 hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Host Settings</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostProfile;
