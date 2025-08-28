'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Award, Star } from 'lucide-react';

const HostProfile = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HOST' as const,
    avatar: undefined
  };

  const profileInfo = [
    { label: 'Full Name', value: 'Sarah Johnson', icon: User },
    { label: 'Email', value: 'sarah.johnson@example.com', icon: Mail },
    { label: 'Phone', value: '+250 788 987 654', icon: Phone },
    { label: 'Location', value: 'Kigali, Rwanda', icon: MapPin },
    { label: 'Host Since', value: 'March 2023', icon: Calendar },
    { label: 'Account Status', value: 'Superhost', icon: Award },
  ];

  const hostStats = [
    { label: 'Total Properties', value: '8', color: 'bg-blue-500' },
    { label: 'Total Bookings', value: '156', color: 'bg-green-500' },
    { label: 'Average Rating', value: '4.8', color: 'bg-yellow-500' },
    { label: 'Response Rate', value: '98%', color: 'bg-purple-500' },
  ];

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-lg text-gray-600">{userData.email}</p>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-500 capitalize">{userData.role.toLowerCase()}</span>
                <div className="ml-4 flex items-center">
                  <Award className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600 font-medium">Superhost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Host Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hostStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  {index === 0 && <User className="w-6 h-6 text-white" />}
                  {index === 1 && <Calendar className="w-6 h-6 text-white" />}
                  {index === 2 && <Star className="w-6 h-6 text-white" />}
                  {index === 3 && <Award className="w-6 h-6 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{info.label}</p>
                    <p className="text-base font-semibold text-gray-900">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Host Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Verification & Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-700">Identity Verified</p>
                <p className="text-sm text-green-600">Government ID confirmed</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-700">Phone Verified</p>
                <p className="text-sm text-blue-600">+250 788 987 654</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-purple-700">Email Verified</p>
                <p className="text-sm text-purple-600">sarah.johnson@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group">
              <User className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-blue-700">Edit Profile</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              <span className="font-medium text-green-700">Security Settings</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors group">
              <Award className="w-5 h-5 text-purple-600 mr-3" />
              <span className="font-medium text-purple-700">Host Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostProfile;
