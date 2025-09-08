'use client'
import React, { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { 
  Home, 
  Plus, 
  Calendar, 
  TrendingUp, 
  Star, 
  MapPin, 
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  MessageCircle,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Activity,
  DollarSign,
  Award,
  Zap,
  Shield,
  ArrowUpRight,
  TrendingDown,
  Loader2,
  Bookmark,
  Gift,
  Compass,
  Wifi,
  Car,
  Coffee,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';

// TypeScript interfaces
interface HostData {
  name: string;
  email: string;
  role: 'HOST';
  avatar?: string;
  joinDate: string;
  totalEarnings: number;
  totalProperties: number;
  avgRating: number;
  responseRate: number;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change: string;
  trend: 'up' | 'down';
  trendIcon: React.ComponentType<{ className?: string }>;
}

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface PropertyTypeData {
  name: string;
  value: number;
  revenue: number;
  color: string;
}

interface Booking {
  id: number;
  guest: string;
  guestAvatar?: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  amount: string;
  guests: number;
  image: string;
  location: string;
  rating?: number;
  specialRequests?: string;
  nights: number;
}

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  bookings: number;
  rating: number;
  revenue: string;
  image: string;
  occupancyRate: number;
  lastBooked: string;
  amenities: string[];
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href?: string;
  onClick?: () => void;
}

const HostDashboard = () => {
  // State management
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');

  // Mock data
  const hostData: HostData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'HOST' as const,
    avatar: undefined,
    joinDate: 'Jan 2023',
    totalEarnings: 28450,
    totalProperties: 8,
    avgRating: 4.8,
    responseRate: 98
  };

  const stats: Stat[] = [
    { 
      label: 'Total Properties', 
      value: '8', 
      icon: Home, 
      color: 'from-blue-500 to-cyan-600', 
      change: '+2 this month',
      trend: 'up',
      trendIcon: TrendingUp
    },
    { 
      label: 'Active Bookings', 
      value: '15', 
      icon: Calendar, 
      color: 'from-emerald-500 to-green-600', 
      change: '+5 this week',
      trend: 'up',
      trendIcon: TrendingUp
    },
    { 
      label: 'Monthly Revenue', 
      value: '$8,450', 
      icon: DollarSign, 
      color: 'from-yellow-500 to-orange-600', 
      change: '+12% vs last month',
      trend: 'up',
      trendIcon: TrendingUp
    },
    { 
      label: 'Avg Rating', 
      value: '4.8', 
      icon: Star, 
      color: 'from-purple-500 to-pink-600', 
      change: '+0.2 this month',
      trend: 'up',
      trendIcon: TrendingUp
    },
  ];

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 6500, bookings: 12 },
    { month: 'Feb', revenue: 7200, bookings: 15 },
    { month: 'Mar', revenue: 6800, bookings: 13 },
    { month: 'Apr', revenue: 8100, bookings: 18 },
    { month: 'May', revenue: 7900, bookings: 16 },
    { month: 'Jun', revenue: 8450, bookings: 19 },
    { month: 'Jul', revenue: 9200, bookings: 22 },
    { month: 'Aug', revenue: 8800, bookings: 20 },
    { month: 'Sep', revenue: 7600, bookings: 17 },
    { month: 'Oct', revenue: 8200, bookings: 18 },
    { month: 'Nov', revenue: 8900, bookings: 21 },
    { month: 'Dec', revenue: 8450, bookings: 19 },
  ];

  const propertyTypeData: PropertyTypeData[] = [
    { name: 'Luxury Villas', value: 35, revenue: 12500, color: '#3B82F6' },
    { name: 'City Apartments', value: 28, revenue: 8900, color: '#10B981' },
    { name: 'Mountain Retreats', value: 22, revenue: 6200, color: '#F59E0B' },
    { name: 'Beach Houses', value: 15, revenue: 4800, color: '#EF4444' },
  ];

  const recentBookings: Booking[] = [
    {
      id: 1,
      guest: 'John Smith',
      guestAvatar: '/images/auth.png',
      property: 'Luxury Villa in Kigali',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      status: 'confirmed',
      amount: '$450',
      guests: 4,
      image: '/images/villa.jpg',
      location: 'Kigali, Rwanda',
      rating: 4.9,
      nights: 5,
      specialRequests: 'Late check-in requested'
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
      image: '/images/house.png',
      location: 'Kigali, Rwanda',
      nights: 5
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
      image: '/images/kigali.jpg',
      location: 'Musanze, Rwanda',
      rating: 4.7,
      nights: 5
    },
    {
      id: 4,
      guest: 'Lisa Anderson',
      property: 'Beach House Retreat',
      checkIn: 'Dec 10, 2024',
      checkOut: 'Dec 12, 2024',
      status: 'completed',
      amount: '$180',
      guests: 2,
      image: '/images/villa.jpg',
      location: 'Gisenyi, Rwanda',
      rating: 5.0,
      nights: 2
    }
  ];

  const properties: Property[] = [
    {
      id: 1,
      name: 'Luxury Villa in Kigali',
      location: 'Kigali, Rwanda',
      type: 'Villa',
      status: 'active',
      bookings: 12,
      rating: 4.9,
      revenue: '$2,450',
      image: '/images/villa.jpg',
      occupancyRate: 85,
      lastBooked: '2 days ago',
      amenities: ['WiFi', 'Pool', 'Parking']
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
      image: '/images/house.png',
      occupancyRate: 72,
      lastBooked: '1 week ago',
      amenities: ['WiFi', 'Kitchen', 'Balcony']
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
      image: '/images/kigali.jpg',
      occupancyRate: 60,
      lastBooked: '3 weeks ago',
      amenities: ['WiFi', 'Fireplace', 'Garden']
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'add-property',
      title: 'Add New Property',
      description: 'List a new property',
      icon: Plus,
      color: 'from-emerald-500 to-green-600',
      href: '/add-listing'
    },
    {
      id: 'manage-bookings',
      title: 'Manage Bookings',
      description: 'View and update reservations',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'respond-guests',
      title: 'Guest Messages',
      description: 'Reply to guest inquiries',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'view-analytics',
      title: 'Analytics',
      description: 'Performance insights',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'property-photos',
      title: 'Update Photos',
      description: 'Enhance property listings',
      icon: Camera,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'pricing-tools',
      title: 'Smart Pricing',
      description: 'Optimize your rates',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600'
    }
  ];

  // Utility functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5" />;
      case 'completed':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'cancelled':
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500'
        };
      case 'completed':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          dot: 'bg-blue-500'
        };
      case 'cancelled':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          dot: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-500'
        };
    }
  };

  const getPropertyStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'maintenance':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500'
        };
      case 'inactive':
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-500'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-500'
        };
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'kitchen':
        return <Coffee className="w-3 h-3" />;
      case 'pool':
        return <Activity className="w-3 h-3" />;
      default:
        return <Compass className="w-3 h-3" />;
    }
  };

  // Memoized filtered bookings
  const filteredBookings = useMemo(() => {
    return recentBookings.filter(booking => {
      const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.property.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  // Event handlers
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleExportData = useCallback(() => {
    console.log('Exporting data...');
  }, []);

  const handleQuickAction = useCallback((actionId: string) => {
    console.log(`Executing action: ${actionId}`);
  }, []);

  return (
    <DashboardLayout
      userRole={hostData.role}
      userName={hostData.name}
      userEmail={hostData.email}
      userAvatar={hostData.avatar}
    >
      <div className="space-y-6">
        {/* Enhanced Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-800/20 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjciLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    Welcome back, {hostData.name}!
                  </h1>
                  <p className="text-blue-100 text-sm">
                    Your properties are performing excellently. Keep up the great hosting!
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-blue-100 text-xs">
                    <span>Host since {hostData.joinDate}</span>
                    <span>•</span>
                    <span>{hostData.responseRate}% Response Rate</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {hostData.avgRating} Rating
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100 text-sm">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trendIcon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-600">
                    <TrendIcon className="w-3 h-3" />
                    <span className="text-xs font-medium">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-96">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Revenue Trends</h3>
                <p className="text-sm text-slate-600">Monthly performance overview</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">Live data</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B" 
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? `$${value.toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : 'Bookings'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#revenueGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Types Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-96">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Revenue by Type</h3>
                <p className="text-xs text-slate-600">Property performance</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">Live data</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mt-4 relative w-full max-w-sm">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <linearGradient id="villaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                        <linearGradient id="apartmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="retreatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>
                        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#DC2626" />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="45%"
                        innerRadius={25}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="white"
                        strokeWidth={1}
                      >
                        {propertyTypeData.map((entry, index) => {
                          const gradients = ['url(#villaGradient)', 'url(#apartmentGradient)', 'url(#retreatGradient)', 'url(#houseGradient)'];
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={gradients[index % gradients.length]}
                            />
                          );
                        })}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string) => [`${value}%`, `${name} Properties`]}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E2E8F0', 
                          borderRadius: '8px',
                          fontSize: '10px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={28}
                        iconType="circle"
                        wrapperStyle={{
                          fontSize: '8px',
                          paddingTop: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Quick Stats under pie chart */}
                <div className="grid grid-cols-2 gap-2 mt-6 w-full">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 text-center">
                    <div className="text-xs font-bold text-blue-900">
                      ${propertyTypeData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">Total Revenue</div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 text-center">
                    <div className="text-xs font-bold text-emerald-900">
                      {Math.round(propertyTypeData.reduce((sum, item) => sum + item.value, 0) / propertyTypeData.length)}%
                    </div>
                    <div className="text-xs text-emerald-600 font-medium">Avg Occupancy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
                  <p className="text-sm text-slate-600">Latest guest reservations</p>
                </div>
                
                {/* Responsive controls */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  {/* Search and Filter row */}
                  <div className="flex items-center space-x-3">
                    {/* Subtle Search */}
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 w-full sm:w-40 bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>
                    
                    {/* Filter */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as 'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled')}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 focus:bg-white transition-colors min-w-0 flex-shrink-0"
                    >
                      <option value="all">All</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  {/* View All button - responsive styling */}
                  <button className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200 flex-shrink-0 w-full sm:w-auto">
                    <span>View All</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const styles = getStatusStyles(booking.status);
                  return (
                    <div key={booking.id} className="group p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                      {/* Mobile-first responsive layout */}
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="w-full sm:w-16 h-32 sm:h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={booking.image}
                            alt={booking.property}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Header with guest name and status */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <h4 className="font-semibold text-slate-900 truncate text-base sm:text-sm">{booking.guest}</h4>
                            <div className={`self-start sm:self-center inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border}`}>
                              <div className={`w-2 h-2 rounded-full ${styles.dot} mr-1`}></div>
                              {booking.status}
                            </div>
                          </div>
                          
                          {/* Property name */}
                          <p className="text-sm text-slate-600 truncate">{booking.property}</p>
                          
                          {/* Location */}
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{booking.location}</span>
                          </div>
                          
                          {/* Dates and details */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center text-sm text-slate-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.checkIn} - {booking.checkOut}
                            </div>
                            <div className="flex items-center justify-between sm:justify-end space-x-4">
                              <div className="flex items-center space-x-1 text-sm text-slate-600">
                                <Users className="w-4 h-4" />
                                <span>{booking.guests} guests</span>
                              </div>
                              <span className="text-lg font-bold text-slate-900">{booking.amount}</span>
                            </div>
                          </div>
                          
                          {/* Rating and special requests */}
                          {(booking.rating || booking.specialRequests) && (
                            <div className="flex items-center justify-between text-xs">
                              {booking.rating && (
                                <div className="flex items-center space-x-1 text-amber-600">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span>{booking.rating}</span>
                                </div>
                              )}
                              {booking.specialRequests && (
                                <span className="text-slate-500 truncate">{booking.specialRequests}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Properties Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">My Properties</h3>
                  <p className="text-sm text-slate-600">Property performance</p>
                </div>
                <Link 
                  href="/add-listing" 
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {properties.map((property) => {
                  const styles = getPropertyStatusStyles(property.status);
                  return (
                    <div key={property.id} className="group p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900 text-sm truncate">{property.name}</h4>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border}`}>
                              <div className={`w-2 h-2 rounded-full ${styles.dot} mr-1`}></div>
                              {property.status}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-slate-500 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-slate-600">Bookings</p>
                          <p className="font-semibold text-slate-900">{property.bookings}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Rating</p>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-amber-400 fill-current mr-1" />
                            <span className="font-semibold text-slate-900">{property.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-600">Revenue</p>
                          <p className="font-semibold text-slate-900">{property.revenue}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center space-x-2">
                          {property.amenities.slice(0, 2).map((amenity, idx) => (
                            <div key={idx} className="flex items-center space-x-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                              {getAmenityIcon(amenity)}
                              <span className="hidden sm:inline">{amenity}</span>
                            </div>
                          ))}
                          {property.amenities.length > 2 && (
                            <span className="text-slate-500">+{property.amenities.length - 2}</span>
                          )}
                        </div>
                        <span className="text-slate-500">{property.occupancyRate}% occupied</span>
                      </div>
                      
                      {/* Management Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div className="flex space-x-1">
                          <Link href={`/listings/${property.id}`}>
                            <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <Link href={`/host/manage-property/${property.id}`}>
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors rounded-md hover:bg-emerald-50">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-50">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <Link href={`/host/manage-property/${property.id}`}>
                          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg text-xs transition-all duration-300 hover:scale-105 shadow-sm">
                            Manage
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
              <p className="text-sm text-slate-600">Manage your hosting business efficiently</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="group relative p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => action.href ? window.location.href = action.href : handleQuickAction(action.id)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-sm">{action.title}</h4>
                      <p className="text-xs text-slate-600">{action.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostDashboard;