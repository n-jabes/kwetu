'use client'
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Lock, Bell, Star, Heart, TrendingUp, Save, Camera, CreditCard, Settings, Check, ChevronRight } from 'lucide-react';

const GuestProfile = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: 'Rafiqur',
    lastName: 'Rahman',
    email: 'rafiqurrahman51@gmail.com',
    phone: '+39 345 346 46',
    bio: 'Team Manager',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    postalCode: 'ER1 2354',
    taxId: 'AS45645756'
  });

  // Saved data state to display updated information
  const [savedData, setSavedData] = useState({
    firstName: 'Rafiqur',
    lastName: 'Rahman',
    email: 'rafiqurrahman51@gmail.com',
    phone: '+39 345 346 46',
    bio: 'Team Manager',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    postalCode: 'ER1 2354',
    taxId: 'AS45645756'
  });

  // Hardcoded user data for testing
  const userData = {
    name: `${savedData.firstName} ${savedData.lastName}`,
    email: savedData.email,
    role: 'GUEST' as const,
    avatar: profileImage
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePersonal = () => {
    setSavedData(prev => ({
      ...prev,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio
    }));
    setIsEditingPersonal(false);
  };

  const handleSaveAddress = () => {
    setSavedData(prev => ({
      ...prev,
      country: formData.country,
      city: formData.city,
      postalCode: formData.postalCode,
      taxId: formData.taxId
    }));
    setIsEditingAddress(false);
  };

  const stats = [
    { label: 'Total Bookings', value: '24', icon: Calendar },
    { label: 'Saved Places', value: '12', icon: Heart },
    { label: 'Average Rating', value: '4.9', icon: Star },
    { label: 'Reviews Given', value: '18', icon: TrendingUp }
  ];

  const quickActions = [
    { label: 'Security Settings', icon: Lock, href: '/security' },
    { label: 'Payment Methods', icon: CreditCard, href: '/payments' },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Account Settings', icon: Settings, href: '/settings' }
  ];

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="min-h-screen bg-slate-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Profile</h1>
            <p className="text-slate-600 mt-1">Manage your account information and preferences</p>
          </div>

          {/* Hero Profile Section */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm mb-8 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={userData.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-slate-400" />
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 group"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{userData.name}</h2>
                    <p className="text-slate-600 text-lg mb-1">{savedData.bio}</p>
                    <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-4 h-4" />
                      {savedData.city}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl mx-auto mb-3 group-hover:bg-slate-100 transition-colors">
                            <Icon className="w-5 h-5 text-slate-600" />
                </div>
                          <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                          <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
                    <p className="text-slate-600 text-sm mt-1">Update your personal details and contact information</p>
                  </div>
                  <button
                    onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>

                <div className="p-8">
                  {isEditingPersonal ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
              </div>
            </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                        <input
                          type="text"
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setIsEditingPersonal(false)}
                          className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSavePersonal}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.firstName}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.lastName}</p>
                  </div>
            </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.email}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Bio</label>
                        <p className="text-slate-900 font-medium text-lg">{savedData.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Address Information</h3>
                    <p className="text-slate-600 text-sm mt-1">Manage your location and address details</p>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
            </div>

                <div className="p-8">
                  {isEditingAddress ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">City/State</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
            </div>
          </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                  </div>
                  <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">TAX ID</label>
                          <input
                            type="text"
                            value={formData.taxId}
                            onChange={(e) => handleInputChange('taxId', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                          />
                  </div>
                </div>
                
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setIsEditingAddress(false)}
                          className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveAddress}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Country</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.country}</p>
                  </div>
                  <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">City/State</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.city}</p>
                  </div>
                </div>
                
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Postal Code</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.postalCode}</p>
                  </div>
                  <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">TAX ID</label>
                          <p className="text-slate-900 font-medium text-lg">{savedData.taxId}</p>
                        </div>
                      </div>
                  </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
            {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  <p className="text-slate-600 text-sm mt-1">Manage your account settings</p>
                </div>
                <div className="p-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                <button 
                        key={index}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 rounded-xl transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-200">
                            <Icon className="w-5 h-5 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-900">{action.label}</span>
                  </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-200" />
                </button>
                    );
                  })}
                  </div>
                  </div>

              {/* Verification Status */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Verification Status</h3>
                <p className="text-slate-600 text-xs mt-0.5">Your account security level</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200/50">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-700">Complete</span>
              </div>
            </div>
          </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="group relative overflow-hidden rounded-xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50/50 to-emerald-50/30 hover:from-emerald-50/70 hover:to-emerald-50/50 transition-all duration-300">
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-600 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="font-semibold text-slate-900 text-xs truncate">Identity Verification</p>
                            <div className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex-shrink-0">
                              Verified
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 truncate">Government-issued ID confirmed</p>
                          <p className="text-xs text-emerald-600 font-medium"> Enhanced security enabled</p>
                        </div>
                        <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-xl border border-blue-200/60 bg-gradient-to-r from-blue-50/50 to-blue-50/30 hover:from-blue-50/70 hover:to-blue-50/50 transition-all duration-300">
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="font-semibold text-slate-900 text-xs truncate">Phone Number</p>
                            <div className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex-shrink-0">
                              Verified
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 font-mono truncate">{savedData.phone}</p>
                          <p className="text-xs text-blue-600 font-medium"> SMS notifications active</p>
                        </div>
                        <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          <ChevronRight className="w-3 h-3" />
                        </div>
              </div>
            </div>

                    <div className="group relative overflow-hidden rounded-xl border border-violet-200/60 bg-gradient-to-r from-violet-50/50 to-violet-50/30 hover:from-violet-50/70 hover:to-violet-50/50 transition-all duration-300">
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-violet-600 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="font-semibold text-slate-900 text-xs truncate">Email Address</p>
                            <div className="px-1.5 py-0.5 bg-violet-100 text-violet-700 text-xs font-medium rounded-full flex-shrink-0">
                              Verified
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 truncate font-mono">{savedData.email}</p>
                          <p className="text-xs text-violet-600 font-medium"> Email notifications enabled</p>
                        </div>
                        <div className="text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">Trust Score</p>
                        <p className="text-xs text-slate-600">Based on verification completeness</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">100%</div>
                        <div className="text-xs text-slate-500">Excellent</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                      <span>Basic</span>
                      <span>Enhanced</span>
                      <span>Premium</span>
                    </div>
                  </div>
                  </div>
                </div>
                
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <p className="text-slate-600 text-sm mt-1">Your latest account activity</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                      <p className="font-medium text-slate-900">Left a review</p>
                      <p className="text-sm text-slate-600">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Booked a stay</p>
                      <p className="text-sm text-slate-600">1 week ago</p>
                </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                      <p className="font-medium text-slate-900">Saved a place</p>
                      <p className="text-sm text-slate-600">2 weeks ago</p>
                    </div>
                  </div>
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
