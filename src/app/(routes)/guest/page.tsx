'use client'
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useGuestGuard } from '@/hooks/useAuthGuard';
import { 
  Calendar, 
  Star, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
  Users,
  Search,
  Activity,
  DollarSign,
  Shield,
  Award,
  Wifi,
  Car,
  Coffee,
  Compass
} from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// TypeScript interfaces
interface UserData {
  name: string;
  email: string;
  role: 'GUEST';
  avatar?: string;
  joinDate: string;
  totalSpent: number;
  loyaltyTier: string;
  loyaltyPoints: number;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  completedBookings: number;
  averageRating: number;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  previousValue?: string;
}

interface BookingTrendData {
  month: string;
  bookings: number;
  spent: number;
  satisfaction: number;
}

interface CategorySpending {
  name: string;
  value: number;
  amount: number;
  color: string;
  bookings: number;
}

interface SatisfactionData {
  rating: string;
  count: number;
  percentage: number;
}

interface RecentBooking {
  id: number;
  property: string;
  location: string;
  date: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  amount: string;
  host: string;
  rating: number;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amenities: string[];
}

interface UpcomingTrip {
  id: number;
  property: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  image: string;
  host: string;
  amenities: string[];
  specialRequests?: string;
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

const GuestDashboard = () => {
  // Ensure only GUEST users can access this page
  const { user, loading } = useGuestGuard();
  
  // State management - moved to top to avoid conditional hook calls
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '3m' | '12m'>('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed'>('all');

  // Enhanced user data
  const userData: UserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined,
    joinDate: 'March 2023',
    totalSpent: 12450,
    loyaltyTier: 'Gold Member',
    loyaltyPoints: 2840,
    membershipLevel: 'Gold',
    completedBookings: 24,
    averageRating: 4.9
  };

  // Enhanced booking data with more details
  const recentBookings: RecentBooking[] = [
    {
      id: 1,
      property: 'Luxury Villa Kiyovu',
      location: 'Kigali, Rwanda',
      date: 'Dec 15-20, 2024',
      status: 'confirmed',
      amount: '$450',
      host: 'Marie Uwimana',
      rating: 4.9,
      image: '/images/house.png',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      guests: 4,
      amenities: ['Wifi', 'Pool', 'Kitchen', 'Parking']
      },
      {
        id: 2,
      property: 'Modern Loft Downtown',
        location: 'Kigali, Rwanda',
        date: 'Dec 25-30, 2024',
        status: 'pending',
        amount: '$320',
      host: 'Jean Baptiste',
      rating: 4.8,
      image: '/images/kigali.jpg',
      checkIn: 'Dec 25, 2024',
      checkOut: 'Dec 30, 2024',
      guests: 2,
      amenities: ['Wifi', 'Kitchen', 'Gym', 'Security']
    },
    {
      id: 3,
      property: 'Gorilla View Lodge',
      location: 'Musanze, Rwanda',
      date: 'Jan 5-10, 2025',
      status: 'completed',
      amount: '$680',
      host: 'Safari Adventures',
      rating: 5.0,
      image: '/images/villa.jpg',
      checkIn: 'Jan 5, 2025',
      checkOut: 'Jan 10, 2025',
      guests: 6,
      amenities: ['Wifi', 'Restaurant', 'Tours', 'Spa']
    }
  ];

  // Enhanced stats with better metrics
  const stats: Stat[] = useMemo(() => [
    { 
      label: 'Total Bookings', 
      value: userData.completedBookings.toString(), 
      change: '+15%',
      trend: 'up',
      icon: Calendar, 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      description: 'Lifetime bookings',
      previousValue: '21'
    },
    { 
      label: 'This Year Spent', 
      value: `$${(userData.totalSpent * 0.34).toFixed(0)}`, 
      change: '+23%',
      trend: 'up',
      icon: DollarSign, 
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      description: 'Year-to-date spending',
      previousValue: '$3,480'
    },
    { 
      label: 'Avg. Rating Given', 
      value: userData.averageRating.toString(), 
      change: '+0.2',
      trend: 'up',
      icon: Star, 
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      description: 'Your review average',
      previousValue: '4.7'
    },
    { 
      label: 'Loyalty Points', 
      value: userData.loyaltyPoints.toLocaleString(), 
      change: '+180',
      trend: 'up',
      icon: Award, 
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      description: 'Redeemable points',
      previousValue: '2,660'
    },
  ], [userData]);

  // Filtered bookings based on search and filter
  const filteredBookings = useMemo(() => {
    return recentBookings.filter(booking => {
      const matchesSearch = booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [recentBookings, searchTerm, filterStatus]);

  // Event handlers
  const handleQuickAction = useCallback((action: string) => {
    console.log(`Quick action: ${action}`);
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Enhanced upcoming trips data
  const upcomingTrips: UpcomingTrip[] = [
    {
      id: 1,
      property: 'Luxury Villa Kiyovu',
      location: 'Kigali, Rwanda',
      checkIn: 'Dec 15, 2024',
      checkOut: 'Dec 20, 2024',
      guests: 4,
      image: '/images/villa.jpg',
      host: 'Marie Uwimana',
      amenities: ['Wifi', 'Pool', 'Kitchen', 'Parking'],
      specialRequests: 'Late check-in requested'
      },
      {
        id: 2,
      property: 'Modern Loft Downtown',
        location: 'Kigali, Rwanda',
        checkIn: 'Dec 25, 2024',
        checkOut: 'Dec 30, 2024',
        guests: 2,
      image: '/images/house.png',
      host: 'Jean Baptiste',
      amenities: ['Wifi', 'Kitchen', 'Gym', 'Security']
    }
  ];

  // Chart data for analytics
  const bookingTrendData: BookingTrendData[] = [
    { month: 'Jan', bookings: 2, spent: 420, satisfaction: 4.8 },
    { month: 'Feb', bookings: 1, spent: 280, satisfaction: 4.9 },
    { month: 'Mar', bookings: 3, spent: 740, satisfaction: 4.7 },
    { month: 'Apr', bookings: 2, spent: 560, satisfaction: 4.8 },
    { month: 'May', bookings: 4, spent: 980, satisfaction: 4.9 },
    { month: 'Jun', bookings: 3, spent: 720, satisfaction: 4.8 },
    { month: 'Jul', bookings: 5, spent: 1200, satisfaction: 5.0 },
    { month: 'Aug', bookings: 2, spent: 480, satisfaction: 4.9 },
    { month: 'Sep', bookings: 3, spent: 650, satisfaction: 4.8 },
    { month: 'Oct', bookings: 4, spent: 890, satisfaction: 4.9 },
    { month: 'Nov', bookings: 3, spent: 720, satisfaction: 4.8 },
    { month: 'Dec', bookings: 2, spent: 450, satisfaction: 4.9 }
  ];

  const categorySpendingData: CategorySpending[] = [
    { name: 'Luxury Villas', value: 45, amount: 1980, color: '#3B82F6', bookings: 8 },
    { name: 'City Apartments', value: 30, amount: 1320, color: '#10B981', bookings: 6 },
    { name: 'Mountain Retreats', value: 15, amount: 660, color: '#F59E0B', bookings: 4 },
    { name: 'Beach Houses', value: 10, amount: 440, color: '#EF4444', bookings: 2 }
  ];

  const satisfactionData: SatisfactionData[] = [
    { rating: '5 Stars', count: 18, percentage: 75 },
    { rating: '4 Stars', count: 5, percentage: 21 },
    { rating: '3 Stars', count: 1, percentage: 4 },
    { rating: '2 Stars', count: 0, percentage: 0 },
    { rating: '1 Star', count: 0, percentage: 0 }
  ];

  // Utility functions

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
      case 'pending':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
      case 'completed':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
      case 'cancelled':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' };
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'pool':
        return <Activity className="w-3 h-3" />;
      case 'kitchen':
        return <Coffee className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'gym':
        return <Activity className="w-3 h-3" />;
      case 'security':
        return <Shield className="w-3 h-3" />;
      case 'restaurant':
        return <Coffee className="w-3 h-3" />;
      case 'tours':
        return <Compass className="w-3 h-3" />;
      case 'spa':
        return <Star className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  // Quick actions data
  const quickActions: QuickAction[] = [
    { 
      icon: MapPin, 
      title: 'Explore Places', 
      desc: 'Find new destinations', 
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      onClick: () => handleQuickAction('explore')
    },
    { 
      icon: Calendar, 
      title: 'Book a Stay', 
      desc: 'Reserve your next trip', 
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      onClick: () => handleQuickAction('book')
    },
    { 
      icon: Star, 
      title: 'Write Review', 
      desc: 'Share your experience', 
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      onClick: () => handleQuickAction('review'),
      badge: '3'
    },
    { 
      icon: Activity, 
      title: 'View Analytics', 
      desc: 'See your travel stats', 
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      onClick: () => handleQuickAction('analytics')
    }
  ];

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        {/* Enhanced User Info Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <div className="flex items-center space-x-2 text-blue-100">
                  <span className="text-sm">{userData.loyaltyTier}</span>
                  <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                  <span className="text-sm">Member since {userData.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-blue-100 text-sm">Lifetime Value</p>
              <p className="text-2xl font-bold">${userData.totalSpent.toLocaleString()}</p>
              <div className="flex items-center justify-start md:justify-end space-x-2 mt-2">
                <Award className="w-4 h-4 text-blue-200" />
                <span className="text-sm text-blue-100">{userData.loyaltyPoints.toLocaleString()} points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const trendIcon = stat.trend === 'up' ? TrendingUp : Activity;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-2 bg-gradient-to-br ${stat.bgGradient} rounded-lg`}>
                        <Icon className={`w-4 h-4 text-slate-700`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 
                        stat.trend === 'down' ? 'bg-red-50 text-red-700' : 
                        'bg-slate-50 text-slate-700'
                      }`}>
{React.createElement(trendIcon, { className: "w-3 h-3" })}
                        <span className="text-xs font-medium">{stat.change}</span>
                      </div>
                  </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Booking Trends */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-96">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Booking Trends</h3>
                <p className="text-sm text-slate-600">Monthly activity over the past year</p>
              </div>
              <div className="flex items-center space-x-2">
                {(['7d', '30d', '3m', '12m'] as const).map((period) => (
                  <button 
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedPeriod === period ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {period.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bookingTrendData}>
                  <defs>
                    <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#bookingGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enhanced Spending by Category with Interactive Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-96">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Spending by Category</h3>
                <p className="text-xs text-slate-600">Your booking preferences breakdown</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">Live Data</span>
              </div>
            </div>
            
             <div className="flex flex-col items-center">
               {/* Enhanced Pie Chart */}
               <div className="mt-4 relative w-full max-w-sm">
                 <div className="h-36">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <defs>
                         <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#3B82F6" />
                           <stop offset="100%" stopColor="#1D4ED8" />
                         </linearGradient>
                         <linearGradient id="cityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#10B981" />
                           <stop offset="100%" stopColor="#059669" />
                         </linearGradient>
                         <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#F59E0B" />
                           <stop offset="100%" stopColor="#D97706" />
                         </linearGradient>
                         <linearGradient id="beachGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#EF4444" />
                           <stop offset="100%" stopColor="#DC2626" />
                         </linearGradient>
                       </defs>
                       <Pie
                         data={categorySpendingData}
                         cx="50%"
                         cy="45%"
                         innerRadius={25}
                         outerRadius={50}
                         paddingAngle={2}
                         dataKey="value"
                         stroke="white"
                         strokeWidth={1}
                       >
                         {categorySpendingData.map((entry, index) => {
                           const gradients = ['url(#luxuryGradient)', 'url(#cityGradient)', 'url(#mountainGradient)', 'url(#beachGradient)'];
                           return (
                             <Cell 
                               key={`cell-${index}`} 
                               fill={gradients[index]} 
                               className="hover:opacity-80 transition-opacity cursor-pointer"
                             />
                           );
                         })}
                       </Pie>
                       <Tooltip 
                         formatter={(value: number) => [
                           `${value}%`,
                           'Share'
                         ]}
                         labelFormatter={(label: string) => label}
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
                           fontSize: '10px',
                           paddingTop: '10px'
                         }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
                 
                 {/* Quick Stats under pie chart */}
                 <div className="grid grid-cols-2 gap-2 mt-6 w-full">
                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 text-center">
                     <div className="text-xs font-bold text-blue-900">
                       {categorySpendingData.reduce((sum, item) => sum + item.bookings, 0)}
                     </div>
                     <div className="text-xs text-blue-600 font-medium">Total Bookings</div>
                   </div>
                   <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 text-center">
                     <div className="text-xs font-bold text-emerald-900">
                       ${Math.round(categorySpendingData.reduce((sum, item) => sum + item.amount, 0) / categorySpendingData.reduce((sum, item) => sum + item.bookings, 0)).toLocaleString()}
                     </div>
                     <div className="text-xs text-emerald-600 font-medium">Avg per Booking</div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Recent Bookings & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
                  <p className="text-sm text-slate-600">Your latest travel activities</p>
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
                      onChange={(e) => setFilterStatus(e.target.value as 'all' | 'confirmed' | 'pending' | 'completed')}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 focus:bg-white transition-colors min-w-0 flex-shrink-0"
                    >
                      <option value="all">All</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
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
                          <Image
                            src={booking.image}
                            alt={booking.property}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Header with title and status */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <h4 className="font-semibold text-slate-900 truncate text-base sm:text-sm">{booking.property}</h4>
                            <div className={`self-start sm:self-center inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border}`}>
                              <div className={`w-2 h-2 rounded-full ${styles.dot} mr-1`}></div>
                              {booking.status}
                            </div>
                          </div>
                          
                          {/* Location */}
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{booking.location}</span>
                          </div>
                          
                          {/* Date, rating, and amount */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <span className="text-sm text-slate-600">{booking.date}</span>
                            <div className="flex items-center justify-between sm:justify-end space-x-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-sm font-medium text-slate-700">{booking.rating}</span>
                              </div>
                              <span className="text-lg font-bold text-slate-900">{booking.amount}</span>
                            </div>
                          </div>
                          
                          {/* Amenities - responsive display */}
                          <div className="flex flex-wrap gap-2">
                            {booking.amenities.slice(0, 3).map((amenity, idx) => (
                              <div key={idx} className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                {getAmenityIcon(amenity)}
                                <span className="hidden sm:inline">{amenity}</span>
                              </div>
                            ))}
                            {booking.amenities.length > 3 && (
                              <span className="text-xs text-slate-500 self-center">+{booking.amenities.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Your Reviews</h3>
              <p className="text-sm text-slate-600">Review satisfaction breakdown</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {satisfactionData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs text-slate-600">{5 - index}</span>
                        </div>
                    <div className="flex-1">
                      <div className="bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 w-16 justify-end">
                      <span className="text-sm font-medium text-slate-900">{item.count}</span>
                      <span className="text-xs text-slate-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">4.9</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">Average rating given</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
              <p className="text-sm text-slate-600">Common tasks and shortcuts</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button 
                  key={index} 
                  onClick={action.onClick}
                  className={`relative p-4 bg-gradient-to-br ${action.bgGradient} rounded-lg border ${action.borderColor} hover:shadow-md transition-all duration-200 group`}
                >
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {action.badge}
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">{action.title}</h4>
                    <p className="text-xs text-slate-600">{action.desc}</p>
                  </div>
                </button>
              );
            })}
            </div>
          </div>

        {/* Upcoming Trips Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Upcoming Trips</h3>
              <p className="text-sm text-slate-600">Your confirmed reservations</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                View All
              </button>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="group p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200">
                  <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.property}
                      width={300}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">{trip.property}</h4>
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.location}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 font-medium">Check-in</p>
                      <p className="font-semibold text-slate-900">{trip.checkIn}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 font-medium">Check-out</p>
                      <p className="font-semibold text-slate-900">{trip.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{trip.guests}</span> guests
                      </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium hover:scale-105 shadow-sm">
                        View Details
                      </button>
                  </div>
                  {trip.specialRequests && (
                    <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-700 font-medium">Special Request:</p>
                      <p className="text-xs text-amber-600">{trip.specialRequests}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium mb-2">No upcoming trips</p>
              <p className="text-sm text-slate-400 mb-4">Start planning your next adventure</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium hover:scale-105 shadow-lg">
                    Book Your Next Stay
                  </button>
                </div>
              )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestDashboard;