'use client'
import { Menu, Search, User, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Navbar Component
export const SearchResultsNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state for login status
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
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
                className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  !isHomePage || isScrolled
                    ? 'bg-gray-300 hover:bg-gray-400' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <User className={`h-4 w-4 transition-colors duration-300 ${
                  !isHomePage || isScrolled ? 'text-gray-600' : 'text-white'
                }`} />
              </div>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="border-[1px] border-green-100 absolute right-0 top-10 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link href="/profile" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-500 hover:border-b-[1px] hover:border-b-gray-300">
                        Profile
                      </Link>
                      <Link 
                        href='/'
                        className=" cursor-pointer block w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-500 "
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={'/auth'}
                      className="cursor-pointer block w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-500"
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsProfileDropdownOpen(false);
                      }}
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
            <div className={`md:hidden pb-3 transition-all duration-300 ${
              !isHomePage || isScrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-md'
            }`}>
              <div className="flex flex-col space-y-1.5">
                <Link href='/rent' className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                  !isHomePage || isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                }`}>
                  Rent
                </Link>
                <Link href='/buy' className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                  !isHomePage || isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                }`}>
                  Buy
                </Link>
                <Link href='/sell' className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                  !isHomePage || isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                }`}>
                  Sell
                </Link>
                <Link href='/manage-property' className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                  !isHomePage || isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                }`}>
                  Manage Property
                </Link>
                        <Link href="/add-listing" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium mt-1.5 transition-colors">
          List your place
        </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                    }`}>
                      Profile
                    </Link>
                    <button 
                      className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                        isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                      }`}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    className={`px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-green-500' : 'text-white hover:text-green-200'
                    }`}
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };