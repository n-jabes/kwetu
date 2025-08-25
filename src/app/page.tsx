'use client'
import React, { useState, useEffect } from 'react';
import { MapPin, Home, Mountain, Castle, Loader2, Star, Shield, CreditCard, Lock, Instagram, Twitter, Facebook, Youtube, ArrowRight, Sparkles, Zap, Globe, Heart, Users, Award, Play, ChevronRight, Menu, X, Calendar, User, Search } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate featured cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % featuredListings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredListings = [
    {
      id: '1',
      title: 'Modern House in Kigali',
      location: 'Kigali, Rwanda',
      sublocation: 'Kigali',
      price: 120,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
      propertyType: 'house',
      amenities: ['Wi-Fi', 'Parking', 'Pool'],
      reviews: 127,
      isGuestFavorite: true,
      host: 'Sarah M.',
      verified: true
    },
    {
      id: '2',
      title: 'Luxury Apartment in Huye',
      location: 'Huye, Rwanda',
      sublocation: 'Huye',
      price: 85,
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
      propertyType: 'apartment',
      amenities: ['Wi-Fi', 'Parking', 'Kitchen'],
      reviews: 89,
      isGuestFavorite: true,
      host: 'David K.',
      verified: true
    },
    {
      id: '3',
      title: 'Villa in Musanze',
      location: 'Musanze, Rwanda',
      sublocation: 'Musanze',
      price: 200,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center',
      propertyType: 'villa',
      amenities: ['Wi-Fi', 'Parking', 'Pool', 'Gym'],
      reviews: 203,
      isGuestFavorite: false,
      host: 'Marie T.',
      verified: true
    },
    {
      id: '4',
      title: 'Traditional Home in Gisenyi',
      location: 'Gisenyi, Rwanda',
      sublocation: 'Gisenyi',
      price: 95,
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center',
      propertyType: 'traditional',
      amenities: ['Wi-Fi', 'Garden', 'Cultural'],
      reviews: 156,
      isGuestFavorite: true,
      host: 'Joseph R.',
      verified: true
    }
  ];

  const popularCities = [
    { name: 'Kigali', country: 'Rwanda', imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop&crop=center', properties: 1247, description: 'The City of a Thousand Hills' },
    { name: 'Huye', country: 'Rwanda', imageUrl: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=400&fit=crop&crop=center', properties: 892, description: 'Academic and Cultural Hub' },
    { name: 'Musanze', country: 'Rwanda', imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop&crop=center', properties: 634, description: 'Gateway to Gorillas' },
    { name: 'Gisenyi', country: 'Rwanda', imageUrl: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=400&fit=crop&crop=center', properties: 445, description: 'Lakeside Paradise' },
  ];

  const propertyTypes = [
    { name: 'Apartments', icon: <Home className="h-8 w-8" />, imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop&crop=center', count: 1247 },
    { name: 'Villas', icon: <Castle className="h-8 w-8" />, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop&crop=center', count: 892 },
    { name: 'Traditional', icon: <Home className="h-8 w-8" />, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&crop=center', count: 634 },
    { name: 'City Homes', icon: <Home className="h-8 w-8" />, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop&crop=center', count: 445 },
    { name: 'Mountain', icon: <Mountain className="h-8 w-8" />, imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop&crop=center', count: 298 },
  ];

  const features = [
    { icon: <Shield className="h-8 w-8" />, title: 'Trusted & Verified', description: 'Every host and property is thoroughly verified for your safety and peace of mind.', color: 'from-emerald-500 to-teal-500' },
    { icon: <MapPin className="h-8 w-8" />, title: 'Local Experiences', description: 'Discover authentic East African culture with insider tips from local hosts.', color: 'from-blue-500 to-indigo-500' },
    { icon: <CreditCard className="h-8 w-8" />, title: 'Flexible Payments', description: 'Multiple payment options including mobile money and flexible installments.', color: 'from-purple-500 to-pink-500' },
    { icon: <Lock className="h-8 w-8" />, title: 'Secure Booking', description: 'Bank-level security with instant booking confirmation and 24/7 support.', color: 'from-orange-500 to-red-500' }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Guests', icon: <Users className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500' },
    { number: '2.5K+', label: 'Premium Listings', icon: <Award className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
    { number: '98%', label: 'Satisfaction Rate', icon: <Star className="h-6 w-6" />, color: 'from-yellow-500 to-orange-500' },
    { number: '24/7', label: 'Support Available', icon: <Zap className="h-6 w-6" />, color: 'from-green-500 to-emerald-500' }
  ];

  const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      router.push('/search-results');
    }, 1000);
  };

  const handlePropertyClick = (id: string) => {
    router.push(`/listings/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navigation */}
      <SearchResultsNavbar />
      
      {/* Hero Section - Professional & Responsive Design */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-16">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Morphing Blobs */}
          <div className="absolute top-20 left-20 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-2xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-float blur-2xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-40 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-float blur-2xl" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-float blur-2xl" style={{ animationDelay: '6s' }}></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
        </div>

        {/* Enhanced Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out opacity-40"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&h=1200&fit=crop&crop=center')`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80" />
        
        {/* Hero Content - Professional Design */}
        <div className="relative z-10 text-center max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Professional Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 animate-pulse-glow">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Premium East African Stays</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Professional Main Headline */}
            <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 sm:mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                Experience
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">East Africa</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-200 drop-shadow-lg">
                Like Never Before
              </span>
            </h1>
            
            {/* Professional Subtitle */}
            <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-10 sm:mb-12 leading-relaxed max-w-4xl mx-auto font-light px-4">
              Discover handpicked homes, authentic experiences, and warm hospitality across the pearl of Africa.
            </p>

            {/* Professional Search Bar - Fully Responsive */}
            <div className="w-full max-w-5xl mx-auto mb-12 px-4">
              <div className="bg-white/95 backdrop-blur-xl border-2 border-white/30 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                      <MapPin className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Where to?"
                        className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-base font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                        <Calendar className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder="Check in"
                          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-base font-medium"
                        />
                      </div>
                      
                      <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                        <User className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder="Guests"
                          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-base font-medium"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 hover:shadow-xl disabled:opacity-50 cursor-pointer"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Explore Now
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center p-2">
                  <div className="flex items-center flex-1 px-6 py-4 min-w-0">
                    <MapPin className="text-gray-500 w-6 h-6 mr-4 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Where would you like to stay?"
                      className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-lg font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="w-px h-8 bg-gray-300 mx-2"></div>
                  
                  <div className="flex items-center px-6 py-4 min-w-0">
                    <Calendar className="text-gray-500 w-6 h-6 mr-4 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Check in"
                      className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-lg font-medium"
                    />
                  </div>
                  
                  <div className="w-px h-8 bg-gray-300 mx-2"></div>
                  
                  <div className="flex items-center px-6 py-4 min-w-0">
                    <User className="text-gray-500 w-6 h-6 mr-4 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Guests"
                      className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 text-lg font-medium"
                    />
                  </div>
                  
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-4 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 ml-4 cursor-pointer"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Explore Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties with Enhanced Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Handpicked
              </span> for You
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Curated collection of exceptional properties that define luxury and comfort
            </p>
          </div>
          
          {/* Featured Property Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Property Image */}
            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={featuredListings[activeCard]?.imageUrl}
                  alt={featuredListings[activeCard]?.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-2xl font-black text-gray-900">${featuredListings[activeCard]?.price}</span>
                  <span className="text-gray-500">/night</span>
                </div>

                {/* Guest Favorite */}
                {featuredListings[activeCard]?.isGuestFavorite && (
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">Guest Favorite</span>
                  </div>
                )}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {featuredListings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      activeCard === index ? 'bg-green-500 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-black text-gray-900 mb-4">
                  {featuredListings[activeCard]?.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-lg">{featuredListings[activeCard]?.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">{featuredListings[activeCard]?.rating}</span>
                  <span className="text-gray-500">({featuredListings[activeCard]?.reviews} reviews)</span>
                </div>
                {featuredListings[activeCard]?.verified && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">Verified</span>
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 mb-6">
                {featuredListings[activeCard]?.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Host Info */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {featuredListings[activeCard]?.host?.split(' ')[0]?.[0]}{featuredListings[activeCard]?.host?.split(' ')[1]?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Hosted by {featuredListings[activeCard]?.host}</p>
                  <p className="text-gray-500 text-sm">Superhost • 3 years hosting</p>
                </div>
              </div>

              <button 
                onClick={() => handlePropertyClick(featuredListings[activeCard]?.id)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 cursor-pointer"
              >
                View Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* All Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredListings.map((listing, index) => (
              <div 
                key={listing.id} 
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:scale-105 cursor-pointer transition-all duration-500 hover:shadow-2xl"
                onClick={() => handlePropertyClick(listing.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {listing.isGuestFavorite && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-pink-200 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Heart className="h-3 w-3 text-pink-500 fill-current" />
                      <span className="text-xs font-semibold text-pink-700">Favorite</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-2 shadow-lg">
                    <span className="text-lg font-bold text-gray-900">${listing.price}</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{listing.rating}</span>
                      <span className="text-xs text-gray-500">({listing.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Explore
              </span> East Africa
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From bustling cities to serene landscapes, discover your perfect destination
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCities.map((city, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:scale-105 cursor-pointer transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Property Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-lg">
                    <span className="text-xs font-semibold text-gray-700">{city.properties} stays</span>
                  </div>
                  
                  {/* City Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-black text-2xl text-white mb-2">{city.name}</h3>
                    <p className="text-gray-200 text-sm mb-2">{city.description}</p>
                    <p className="text-gray-300 text-xs">{city.country}</p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <ArrowRight className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types with Enhanced Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Find Your <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Perfect Stay
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our diverse collection of unique accommodations
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {propertyTypes.map((type, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:scale-105 cursor-pointer transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={type.imageUrl}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Count Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-2 py-1 shadow-lg">
                    <span className="text-xs font-semibold text-gray-700">{type.count}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3">
                      <div className="text-white">
                        {type.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-lg">{type.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                KWETU
              </span>?
            </h2>
            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">Excellence in Every Detail</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're redefining hospitality across East Africa with unmatched quality and personalized service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400/60 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <h3 className="font-bold text-xl mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-black mb-8">Ready to Host?</h2>
            <p className="text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed">
              Join thousands of successful hosts earning income while sharing the beauty of East Africa with travelers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3 cursor-pointer">
                <Home className="w-6 h-6" />
                Start Hosting Today
                <ArrowRight className="w-6 h-6" />
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl flex items-center gap-3 cursor-pointer">
                <Play className="w-6 h-6" />
                Watch Success Stories
              </button>
            </div>
            
            {/* Host Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: <CreditCard className="h-8 w-8" />, title: 'Earn $2,000+', subtitle: 'Average monthly income' },
                { icon: <Shield className="h-8 w-8" />, title: 'Full Protection', subtitle: 'Host guarantee included' },
                { icon: <Zap className="h-8 w-8" />, title: 'Easy Setup', subtitle: 'List in under 10 minutes' }
              ].map((benefit, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-white mb-3">{benefit.icon}</div>
                  <h4 className="font-bold text-xl mb-2">{benefit.title}</h4>
                  <p className="text-white/80 text-sm">{benefit.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Newsletter Signup */}
          <div className="text-center mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest deals, travel tips, and exclusive offers from KWETU delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">KWETU</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Connecting travelers with authentic East African experiences through carefully curated accommodations and local hospitality.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Youtube, href: "#" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="p-3 bg-gray-800/50 hover:bg-green-500 rounded-xl transition-all duration-300 hover:scale-110 border border-gray-700/50"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Company", items: ["About KWETU", "Our Story", "Careers", "Press & Media", "Sustainability"] },
              { title: "Support", items: ["Help Center", "Safety & Security", "Cancellation Policy", "Contact Support", "Community Guidelines"] },
              { title: "Hosting", items: ["Become a Host", "Host Resources", "Host Community", "Host Protection", "Hosting Standards"] }
            ].map((section, idx) => (
              <div key={idx} style={{ animationDelay: `${idx * 200}ms` }}>
                <h4 className="text-white font-bold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3 text-sm">
                  {section.items.map((item, i) => (
                    <li key={i} className="hover:text-green-400 cursor-pointer transition-colors duration-300 flex items-center group">
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700/50 pt-8 text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
              <p>© 2024 KWETU. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-green-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-green-400 transition-colors duration-300">Sitemap</a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
              <span>•</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;