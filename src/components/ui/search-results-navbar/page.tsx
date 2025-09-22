'use client'
import { Menu, Search, User, X, Loader2, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

// Navbar Component
export const SearchResultsNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, loading, logout } = useAuth();
    
    // Check if we're on the homepage
    const isHomePage = pathname === '/';

    // Handle scroll effect - only on homepage
    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(true); // Always show solid navbar on other pages
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Add body class for non-homepage pages to ensure proper spacing
    useEffect(() => {
        if (!isHomePage) {
            document.body.classList.add('non-homepage');
        } else {
            document.body.classList.remove('non-homepage');
        }

        return () => {
            document.body.classList.remove('non-homepage');
        };
    }, [isHomePage]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            router.push('/search-results');
        }, 1000);
    }

    const handleLogout = async () => {
        try {
            await logout();
            // Redirect to home page after logout
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: redirect anyway
            router.push('/');
        }
    }

    // Determine navbar styling based on page and scroll state
    const getNavbarClasses = () => {
        if (!isHomePage) {
            // Other pages: always solid white navbar
            return 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200';
        }
        
        // Homepage: transparent initially, solid on scroll
        return isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent';
    };

    // Determine text colors based on page and scroll state
    const getTextColors = (isLogo = false) => {
        if (!isHomePage) {
            // Other pages: always dark text
            return isLogo ? 'text-green-500 hover:text-green-600' : 'text-gray-700 hover:text-green-500';
        }
        
        // Homepage: white initially, dark on scroll
        if (isScrolled) {
            return isLogo ? 'text-green-500 hover:text-green-600' : 'text-gray-700 hover:text-green-500';
        } else {
            return isLogo ? 'text-white hover:text-green-200' : 'text-white/90 hover:text-white';
        }
    };

    // Determine search bar styling
    const getSearchBarClasses = () => {
        if (!isHomePage) {
            // Other pages: always solid white
            return 'border-gray-300 bg-white';
        }
        
        // Homepage: transparent initially, solid on scroll
        return isScrolled 
            ? 'border-gray-300 bg-white' 
            : 'border-white/30 bg-white/20 text-white placeholder:text-white/70';
    };

    // Determine search icon color
    const getSearchIconColor = () => {
        if (!isHomePage) {
            return 'text-gray-400';
        }
        
        return isScrolled ? 'text-gray-400' : 'text-white/70';
    };

    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarClasses()}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className={`text-xl font-bold transition-colors ${getTextColors(true)}`}>
                KWETU
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href='/rent' className={`cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors ${getTextColors()}`}>
                Rent
              </Link>
              <Link href='/buy' className={`cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors ${getTextColors()}`}>
                Buy
              </Link>
              <Link href='/sell' className={`cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors ${getTextColors()}`}>
                Sell
              </Link>
              <Link href='/manage-property' className={`cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors ${getTextColors()}`}>
                Manage Property
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Where to?"
                  className={`w-full pl-8 pr-3 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm ${getSearchBarClasses()}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className={`absolute left-2.5 top-2 h-4 w-4 transition-colors duration-300 ${getSearchIconColor()}`} />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs px-2 py-0.5 rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer"
                  disabled={isSearching}
                >
                  {isSearching ? <Loader2 className="animate-spin w-3 h-3" /> : 'Search'}
                </button>
              </form>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-3 relative">
                      <Link href="/add-listing" className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          List your place
        </Link>
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors overflow-hidden ${
                  !isHomePage || isScrolled
                    ? 'bg-gray-300 hover:bg-gray-400' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                {loading ? (
                  <Loader2 className={`h-4 w-4 animate-spin ${
                    !isHomePage || isScrolled ? 'text-gray-600' : 'text-white'
                  }`} />
                ) : isAuthenticated && user?.profile_picture ? (
                  <Image
                    src={user.profile_picture}
                    alt={user.names}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                ) : isAuthenticated && user ? (
                  <div className={`w-full h-full flex items-center justify-center text-xs font-semibold ${
                    !isHomePage || isScrolled 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                      : 'bg-white/30 text-white'
                  }`}>
                    {user.names.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                ) : (
                  <User className={`h-4 w-4 transition-colors duration-300 ${
                    !isHomePage || isScrolled ? 'text-gray-600' : 'text-white'
                  }`} />
                )}
              </div>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="border-[1px] border-green-100 absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {loading ? (
                    <div className="px-3 py-2 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : isAuthenticated && user ? (
                    <>
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                            {user.profile_picture ? (
                              <Image
                                src={user.profile_picture}
                                alt={user.names}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                  {user.names.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{user.names}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/${user.roles[0]?.toLowerCase()}/profile`} 
                        className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-500 hover:border-b-[1px] hover:border-b-gray-300"
                      >
                        Profile
                      </Link>
                      <button 
                        className="block w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-500"
                        onClick={() => {
                          handleLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth"
                      className="cursor-pointer block w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-500"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-1.5 transition-colors ${
                  !isHomePage || isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Hidden since hero has search */}
          <div className="hidden md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Where to?"
                className={`w-full pl-8 pr-3 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm ${getSearchBarClasses()}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className={`absolute left-2.5 top-2 h-4 w-4 transition-colors duration-300 ${getSearchIconColor()}`} />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-0.5 rounded-full transition cursor-pointer"
                disabled={isSearching}
              >
                {isSearching ? <Loader2 className="animate-spin w-3 h-3" /> : 'Search'}
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className={`md:hidden pb-4 pt-2 transition-all duration-300 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${
              !isHomePage || isScrolled 
                ? 'bg-gradient-to-br from-white via-gray-50 to-white shadow-lg border-t border-gray-100' 
                : 'bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl shadow-2xl border-t border-white/20'
            }`}>
              <div className="flex flex-col space-y-2 px-6 max-w-md mx-auto">
                <Link href='/rent' className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                  !isHomePage || isScrolled 
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                    : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                }`}>
                  Rent
                </Link>
                <Link href='/buy' className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                  !isHomePage || isScrolled 
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                    : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                }`}>
                  Buy
                </Link>
                <Link href='/sell' className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                  !isHomePage || isScrolled 
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                    : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                }`}>
                  Sell
                </Link>
                <Link href='/manage-property' className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                  !isHomePage || isScrolled 
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                    : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                }`}>
                  Manage Property
                </Link>
                        <Link href="/add-listing" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold mt-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-center">
          List your place
        </Link>
                {loading ? (
                  <div className="px-4 py-2.5 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                ) : isAuthenticated && user ? (
                  <>
                    {/* User Profile Section */}
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                          {user.profile_picture ? (
                            <Image
                              src={user.profile_picture}
                              alt={user.names}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">
                                {user.names.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.names}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <Link 
                      href={`/${user.roles[0]?.toLowerCase()}/profile`} 
                      className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                        !isHomePage || isScrolled 
                          ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                          : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                      }`}
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Profile
                    </Link>
                    <button 
                      className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                        !isHomePage || isScrolled 
                          ? 'text-gray-700 hover:text-red-600 hover:bg-red-50' 
                          : 'text-gray-800 hover:text-red-700 hover:bg-white/80 backdrop-blur-sm'
                      }`}
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth"
                    className={`px-4 py-2.5 text-sm font-medium text-left transition-all duration-300 rounded-lg hover:scale-[1.02] ${
                      !isHomePage || isScrolled 
                        ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' 
                        : 'text-gray-800 hover:text-green-700 hover:bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };