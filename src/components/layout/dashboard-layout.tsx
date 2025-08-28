'use client'
import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  BookOpen,
  Heart,
  Calendar,
  MapPin,
  CreditCard,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  FileText,
  Shield,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'GUEST' | 'HOST';
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  userName,
  userEmail,
  userAvatar
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  // Guest navigation items
  const guestNavItems = [
    { id: 'overview', label: 'Overview', icon: Home, href: '/guest' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, href: '/guest/bookings' },
    { id: 'favorites', label: 'Favorites', icon: Heart, href: '/guest/favorites' },
    { id: 'payments', label: 'Payments', icon: CreditCard, href: '/guest/payments' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/guest/messages' },
    { id: 'reviews', label: 'My Reviews', icon: Star, href: '/guest/reviews' },
    { id: 'profile', label: 'Profile', icon: User, href: '/guest/profile' },
  ];

  // Host navigation items
  const hostNavItems = [
    { id: 'overview', label: 'Overview', icon: Home, href: '/host' },
    { id: 'listings', label: 'My Listings', icon: MapPin, href: '/host/listings' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/host/bookings' },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp, href: '/host/earnings' },
    { id: 'guests', label: 'Guests', icon: Users, href: '/host/guests' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/host/messages' },
    { id: 'reviews', label: 'Reviews', icon: Star, href: '/host/reviews' },
    { id: 'analytics', label: 'Analytics', icon: FileText, href: '/host/analytics' },
    { id: 'profile', label: 'Profile', icon: User, href: '/host/profile' },
  ];

  const navItems = userRole === 'GUEST' ? guestNavItems : hostNavItems;

  const handleLogout = () => {
    router.push('/auth');
  };

  const getCurrentTab = () => {
    const path = window.location.pathname;
    const item = navItems.find(nav => nav.href === path);
    return item ? item.id : 'overview';
  };

  React.useEffect(() => {
    setActiveTab(getCurrentTab());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 transform transition-all duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">KWETU</h1>
              <p className="text-xs text-slate-500 font-medium">Dashboard</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-5 border-b border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center ring-2 ring-emerald-200 shadow-sm">
              {userAvatar ? (
                <Image src={userAvatar} alt={userName} width={48} height={48} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <User className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
              <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              <div className="inline-flex items-center px-2 py-1 mt-1 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg text-xs font-medium text-emerald-700">
                {userRole === 'GUEST' ? 'Guest User' : 'Host User'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {userRole === 'GUEST' ? (
              guestNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-105'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-slate-100 group-hover:bg-emerald-100'
                  }`}>
                    <item.icon className={`w-4 h-4 transition-all duration-300 ${
                      activeTab === item.id
                        ? 'text-white'
                        : 'text-slate-600 group-hover:text-emerald-600'
                    }`} />
                  </div>
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
                  )}
                </Link>
              ))
            ) : (
              hostNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-105'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-slate-100 group-hover:bg-blue-100'
                  }`}>
                    <item.icon className={`w-4 h-4 transition-all duration-300 ${
                      activeTab === item.id
                        ? 'text-white'
                        : 'text-slate-600 group-hover:text-blue-600'
                    }`} />
                  </div>
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
                  )}
                </Link>
              ))
            )}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-100 transition-all duration-300">
              <LogOut className="w-4 h-4 group-hover:text-red-600" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between px-5 py-3">
            {/* Menu button for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Dashboard title */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-slate-900">{getCurrentTab()}</h1>
              <p className="text-xs text-slate-500">Welcome to your dashboard</p>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Search input */}
              <div className="hidden md:flex items-center space-x-3 bg-slate-50/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200/50 hover:border-emerald-300 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400">
                <Search className="w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search properties, bookings..." className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-48" />
              </div>
              {/* Notifications button */}
              <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:scale-105 group">
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-sm"></div>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
              </button>
              {/* User Menu dropdown */}
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:scale-105 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center ring-2 ring-emerald-200 shadow-sm">
                    {userAvatar ? (
                      <Image src={userAvatar} alt={userName} width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-200/50">
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                      <p className="text-xs text-slate-500">{userEmail}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="p-5">{children}</main>
      </div>

      <style jsx>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.2s ease-out;
        }
        
        .slide-in-from-top-2 {
          animation: slide-in-from-top-2 0.2s ease-out;
        }
        
        @keyframes slide-in-from-top-2 {
          from {
            transform: translateY(-8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;