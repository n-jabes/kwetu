'use client'
import { Menu, Search, User, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Navbar Component
export const SearchResultsNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state for login status
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            router.push('/search-results');
        }, 1000);
    }

    return (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors">
                KWETU
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href='/rent' className="cursor-pointer text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium transition-colors">
                Rent
              </Link>
              <Link href='/buy' className="cursor-pointer text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium transition-colors">
                Buy
              </Link>
              <Link href='/sell' className="cursor-pointer text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium transition-colors">
                Sell
              </Link>
              <Link href='/manage-property' className="cursor-pointer text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium transition-colors">
                Manage Property
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-full transition cursor-pointer"
                  disabled={isSearching}
                >
                  {isSearching ? <Loader2 className="animate-spin w-4 h-4" /> : 'Search'}
                </button>
              </form>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4 relative">
                      <Link href="/add-listing" className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          List your place
        </Link>
              <div 
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <User className="h-5 w-5 text-gray-600" />
              </div>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="border-[1px] border-green-100 absolute right-0 top-12 mt-2 w-38 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-500 hover:border-b-[1px] hover:border-b-gray-300">
                        Profile
                      </Link>
                      <Link 
                        href='/'
                        className=" cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-500 "
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
                      className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-500"
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
                className="text-gray-700 hover:text-green-500 p-2 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-full transition cursor-pointer"
                disabled={isSearching}
              >
                {isSearching ? <Loader2 className="animate-spin w-4 h-4" /> : 'Search'}
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <Link href='/rent' className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors">
                  Rent
                </Link>
                <Link href='/buy' className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors">
                  Buy
                </Link>
                <Link href='/sell' className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors">
                  Sell
                </Link>
                <Link href='/manage-property' className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors">
                  Manage Property
                </Link>
                        <Link href="/add-listing" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 transition-colors">
          List your place
        </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors">
                      Profile
                    </Link>
                    <button 
                      className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    className="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium text-left transition-colors"
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