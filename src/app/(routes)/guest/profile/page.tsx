'use client'
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';

const GuestProfile = () => {
  // Hardcoded user data for testing
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined
  };

  const profileInfo = [
    { label: 'Full Name', value: 'John Doe', icon: User },
    { label: 'Email', value: 'john.doe@example.com', icon: Mail },
    { label: 'Phone', value: '+250 788 123 456', icon: Phone },
    { label: 'Location', value: 'Kigali, Rwanda', icon: MapPin },
    { label: 'Member Since', value: 'January 2024', icon: Calendar },
    { label: 'Account Status', value: 'Verified', icon: Shield },
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
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-green-600" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-lg text-gray-600">{userData.email}</p>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-500 capitalize">{userData.role.toLowerCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-600" />
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

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
              <User className="w-5 h-5 text-green-600 mr-3" />
              <span className="font-medium text-green-700">Edit Profile</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group">
              <Shield className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-blue-700">Change Password</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors group">
              <Mail className="w-5 h-5 text-purple-600 mr-3" />
              <span className="font-medium text-purple-700">Email Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestProfile;
