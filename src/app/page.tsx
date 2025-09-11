'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Calendar, 
  Users, 
  Mountain, 
  Shield, 
  Award, 
  ArrowRight,  
  ChevronRight,
  ChevronLeft,
  Play,
  CreditCard,
  Lock,
  Home,
  Castle,
  Zap,
  Sparkles,
  User,
  Loader2,
  ArrowUp,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowUpRight,
  Mail,
} from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { ImigongoPattern } from '@/components/ui/imigongo-pattern';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  
  // Hero carousel images
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=675&fit=crop&crop=center&q=95",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=675&fit=crop&crop=center&q=95", 
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=675&fit=crop&crop=center&q=95",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&h=675&fit=crop&crop=center&q=95",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=675&fit=crop&crop=center&q=95"
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [guestsCount, setGuestsCount] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [autoScrollProgress, setAutoScrollProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 300);
    };
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

  // Carousel functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
    resetAutoScroll();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
    resetAutoScroll();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    resetAutoScroll();
  };

  const startAutoScroll = () => {
    if (heroImages.length <= 1) return;
    
    // Reset progress
    setAutoScrollProgress(0);
    
    // Progress tracking
    progressIntervalRef.current = setInterval(() => {
      if (!isCarouselHovered) {
        setAutoScrollProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 2.5; // Increment by 2.5% every 100ms (4000ms / 100 = 40 steps, 100/40 = 2.5)
        });
      }
    }, 100);
    
    // Main auto-scroll
    intervalRef.current = setInterval(() => {
      if (!isCarouselHovered) {
        setCurrentImageIndex((prev) => 
          prev === heroImages.length - 1 ? 0 : prev + 1
        );
        setAutoScrollProgress(0); // Reset progress after transition
      }
    }, 4000); // Auto-scroll every 4 seconds
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    setAutoScrollProgress(0);
    startAutoScroll();
  };

  // Auto-scroll effect for carousel
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImages.length, isCarouselHovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navigation with Scroll Effect */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        {/* Greenish Fade Overlay for Navbar Visibility */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-gradient-to-b from-emerald-900/60 via-emerald-800/40 to-transparent h-full"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent"></div>
        </div>
        <SearchResultsNavbar />
      </div>
      
      {/* Hero Section - Modern Split Layout Design */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden pt-20">
        {/* Green Overlay for Navbar Visibility */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute w-96 h-96 bg-emerald-500 rounded-full opacity-10 -top-20 -left-20"></div>
          <div className="absolute w-64 h-64 bg-green-600 rounded-full opacity-15 top-10 right-10"></div>
          <div className="absolute w-80 h-80 bg-teal-500 rounded-full opacity-8 bottom-10 left-1/4"></div>
        </div>
        
        {/* Modern Background Elements */}
        <div className="absolute inset-0 z-10">
          {/* Geometric Shapes */}
          <div className="absolute top-8 right-8 w-40 h-40 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 left-8 w-48 h-48 bg-teal-100/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-green-200/40 rounded-2xl rotate-45 blur-2xl"></div>
        </div>

        {/* Modern Grid Container */}
        <div className="container mx-auto px-4 lg:px-6 min-h-[85vh] flex items-center py-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-6 items-center w-full max-w-5xl mx-auto">

            {/* Left Content */}
            <div className="relative z-10 lg:pr-3">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Modern Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-1 mb-3 text-xs font-medium">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  Trusted by 10K+ travelers
                </div>
                
                {/* Modern Headline */}
                <div className="space-y-1 mb-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                    Find Your Perfect
                    <span className="block text-emerald-600">East African</span>
                    <span className="block">Stay</span>
                  </h1>
                </div>
                
                {/* Modern Subtitle */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed max-w-md">
                  Discover handpicked homes, authentic experiences, and warm hospitality across the pearl of Africa.
                </p>

                {/* Modern Search Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 mb-4 max-w-lg">
                  <div className="space-y-2.5">
                    {/* Location Input */}
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                      <input
                        type="text"
                        placeholder="Where would you like to stay?"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Date and Guests Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm"
                        />
                      </div>
                      
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <div className="flex items-center pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer text-xs"
                            onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                          >
                            -
                          </button>
                          <span className="flex-1 text-center mx-2 text-gray-700 font-medium text-xs">
                            {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                          </span>
                          <button
                            type="button"
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer text-xs"
                            onClick={() => setGuestsCount(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          Search Properties
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Futuristic Right Visual */}
            <div className="relative lg:pl-3 block">
              <div className="relative h-full">
                {/* Futuristic House Showcase */}
                <div className="relative z-10 group">
                  {/* Main Futuristic House Image Carousel */}
                  <div 
                    className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mb-4 relative"
                    onMouseEnter={() => setIsCarouselHovered(true)}
                    onMouseLeave={() => setIsCarouselHovered(false)}
                  >
                    <Image
                      src={heroImages[currentImageIndex]}
                      alt="Futuristic Modern House"
                      fill
                      className="object-cover transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={95}
                    />
                    
                    {/* Image Indicators with Progress - Simplified */}
                    {heroImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {heroImages.map((_, index) => (
                          <div key={index} className="relative">
                            <div className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50'
                            }`} />
                            {/* Progress ring for current image */}
                            {index === currentImageIndex && !isCarouselHovered && (
                              <div className="absolute inset-0 -m-1">
                                <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="6"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1"
                                  />
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="6"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeDasharray={`${2 * Math.PI * 6}`}
                                    strokeDashoffset={`${2 * Math.PI * 6 * (1 - autoScrollProgress / 100)}`}
                                    className="transition-all duration-100 ease-linear"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Futuristic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Property Cards - Now positioned outside the image container */}
                  {/* Card 1 - Modern House in Kigali - Positioned to overlap top-right edge */}
                  <div 
                    className="absolute -top-2 -right-12 bg-white/95 backdrop-blur-xl rounded-xl p-2.5 shadow-2xl border border-white/50 animate-float max-w-[160px] z-20"
                    style={{ 
                      animation: 'float 6s ease-in-out infinite',
                      animationDelay: '0s'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center&q=90"
                          alt="Modern House"
                          width={24}
                          height={24}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs truncate">Modern House</h4>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin className="w-2 h-2" />
                          Kigali
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                        <span className="text-xs font-bold">4.8</span>
                      </div>
                      <span className="text-sm font-black text-emerald-600">$120</span>
                    </div>
                  </div>
                  
                  {/* Card 2 - Luxury Apartment in Huye - Positioned to overlap bottom-left edge */}
                  <div 
                    className="absolute -bottom-2 -left-8 bg-white/95 backdrop-blur-xl rounded-xl p-2.5 shadow-2xl border border-white/50 animate-float max-w-[160px] z-20"
                    style={{ 
                      animation: 'float 6s ease-in-out infinite',
                      animationDelay: '3s'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center&q=90"
                          alt="Luxury Apartment"
                          width={24}
                          height={24}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs truncate">Luxury Apartment</h4>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin className="w-2 h-2" />
                          Huye
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                        <span className="text-xs font-bold">4.7</span>
                      </div>
                      <span className="text-sm font-black text-emerald-600">$85</span>
                    </div>
                  </div>

                  {/* Futuristic Elements inside the image */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                    </div>
                    <div className="absolute top-1/4 right-1/4">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-80"></div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/4">
                      <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce opacity-70"></div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Futuristic Background Decorations */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-200/40 to-emerald-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-200/50 to-green-200/50 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-300/30 to-cyan-300/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-6 bg-gradient-to-r from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-xl font-black text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 cursor-pointer group ${
          showBackToTop ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-hover-float transition-all duration-300" />
      </button>

      {/* Featured Properties with Enhanced Professional Design */}
 <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
  {/* Imigongo Design - Top Left */}
  <div className="absolute top-20 left-8 z-10 hidden lg:block">
    <ImigongoPattern variant="left" size="md" className="imigongo-pattern opacity-15" message="Handpicked luxury properties" />
  </div>
  
  {/* Imigongo Design - Top Right */}
  <div className="absolute top-20 right-8 z-10 hidden lg:block">
    <ImigongoPattern variant="right" size="md" className="imigongo-pattern opacity-15" message="Curated for your comfort" />
  </div>
  
  <div className="max-w-5xl mx-auto px-4 lg:px-6">
     {/* Section Header */}
     <div className="text-center mb-6 lg:mb-8">
       <div className="mb-3">
         <span className="inline-block text-xs font-semibold tracking-wider uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-full mb-2">
           Featured Collection
         </span>
       </div>
       <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-3 tracking-tight leading-none">
         <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
           Handpicked
         </span>{" "}
         <span className="font-light">for You</span>
       </h2>
       <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
         Curated collection of exceptional properties that define luxury and comfort
       </p>
     </div>
     
     {/* Featured Property Showcase */}
     <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 lg:mb-10">
       {/* Property Image - 7 columns */}
       <div className="lg:col-span-7 relative group">
         <div className="aspect-[3/2] rounded-lg overflow-hidden shadow-md ring-1 ring-gray-100">
           <Image
             src={featuredListings[activeCard]?.imageUrl}
             alt={featuredListings[activeCard]?.title}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
           
           {/* Price Badge */}
           <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-white/20 rounded-md px-2.5 py-1.5 shadow-lg">
             <div className="text-center">
               <span className="text-lg font-bold text-gray-900">${featuredListings[activeCard]?.price}</span>
               <span className="text-gray-500 text-xs font-medium">/night</span>
             </div>
           </div>

           {/* Guest Favorite */}
           {featuredListings[activeCard]?.isGuestFavorite && (
             <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg border border-white/20">
               <Heart className="h-3 w-3 text-red-500 fill-current" />
               <span className="text-xs font-semibold text-gray-800">Favorite</span>
             </div>
           )}
         </div>

         {/* Navigation Dots */}
         <div className="flex justify-center space-x-1.5 mt-4">
           {featuredListings.map((_, index) => (
             <button
               key={index}
               onClick={() => setActiveCard(index)}
               className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                 activeCard === index 
                   ? 'bg-green-500 w-6 shadow-sm' 
                   : 'bg-gray-300 w-1 hover:bg-gray-400'
               }`}
             />
           ))}
         </div>
       </div>

       {/* Property Details - 5 columns */}
       <div className="lg:col-span-5 space-y-3">
         {/* Title and Location */}
         <div className="space-y-2">
           <h3 className="text-xl lg:text-2xl xl:text-3xl font-light text-gray-900 leading-tight tracking-tight">
             {featuredListings[activeCard]?.title}
           </h3>
           <div className="flex items-center text-gray-600">
             <MapPin className="h-4 w-4 mr-2 text-green-500" />
             <span className="text-sm font-medium">{featuredListings[activeCard]?.location}</span>
           </div>
         </div>
         
         {/* Rating and Verification */}
         <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5">
             <div className="flex items-center gap-1">
               <Star className="h-4 w-4 text-yellow-400 fill-current" />
               <span className="font-bold text-sm">{featuredListings[activeCard]?.rating}</span>
             </div>
             <span className="text-gray-500 text-xs font-medium">
               ({featuredListings[activeCard]?.reviews} reviews)
             </span>
           </div>
           {featuredListings[activeCard]?.verified && (
             <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
               <Shield className="h-3 w-3 text-green-500" />
               <span className="text-xs text-green-700 font-semibold">Verified</span>
             </div>
           )}
         </div>

         {/* Amenities */}
         <div className="space-y-1.5">
           <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Amenities</h4>
           <div className="flex flex-wrap gap-1">
             {featuredListings[activeCard]?.amenities.map((amenity, idx) => (
               <span 
                 key={idx} 
                 className="bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200"
               >
                 {amenity}
               </span>
             ))}
           </div>
         </div>

         {/* Host Info */}
         <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
           <div className="flex items-center gap-2.5">
             <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
               <span className="text-white font-semibold text-xs">
                 {featuredListings[activeCard]?.host?.split(' ')[0]?.[0]}{featuredListings[activeCard]?.host?.split(' ')[1]?.[0]}
               </span>
             </div>
             <div>
               <p className="font-semibold text-gray-900 text-xs">Hosted by {featuredListings[activeCard]?.host}</p>
               <p className="text-gray-500 text-xs font-medium">Superhost • 3 years hosting</p>
             </div>
           </div>
         </div>

         {/* CTA Button */}
         <div className="pt-1">
           <button 
             onClick={() => handlePropertyClick(featuredListings[activeCard]?.id)}
             className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
           >
             View Details
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
         </div>
       </div>
    </div>

    {/* All Properties Grid */}
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-3">
          More Exceptional Properties
        </h3>
        <p className="text-gray-600 font-light">
          Discover our full collection of luxury accommodations
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {featuredListings.map((listing, index) => (
          <div 
            key={listing.id} 
            className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:scale-[1.02] cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-green-200"
            onClick={() => handlePropertyClick(listing.id)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {listing.isGuestFavorite && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-pink-200 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                  <Heart className="h-3 w-3 text-pink-500 fill-current" />
                  <span className="text-xs font-semibold text-pink-700">Favorite</span>
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg">
                <div className="text-center">
                  <span className="text-lg font-bold text-gray-900">${listing.price}</span>
                  <span className="text-gray-500 text-sm font-medium">/night</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                  {listing.title}
                </h4>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{listing.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{listing.rating}</span>
                  <span className="text-xs text-gray-500">({listing.reviews})</span>
                </div>
                
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Popular Cities with Enhanced Design */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
  {/* Imigongo Design - Center Left */}
  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block">
    <ImigongoPattern variant="left" size="sm" className="imigongo-pattern opacity-12" message="Explore amazing destinations" />
  </div>
  
  {/* Imigongo Design - Center Right */}
  <div className="absolute right-16 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block">
    <ImigongoPattern variant="right" size="sm" className="imigongo-pattern opacity-12" message="Discover hidden gems" />
  </div>
  
  {/* Subtle background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
  </div>
  
   <div className="max-w-5xl mx-auto px-4 lg:px-6 relative">
     {/* Section Header */}
     <div className="text-center mb-6 lg:mb-8">
       <div className="mb-3">
         <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-100/80 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
           Destinations
         </span>
       </div>
       <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-3 tracking-tight leading-none">
         <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
           Explore
         </span>{" "}
         <span className="font-light">East Africa</span>
       </h2>
       <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
         From bustling cities to serene landscapes, discover your perfect destination
       </p>
     </div>
    
    {/* Cities Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {popularCities.map((city, index) => (
        <div
          key={index}
          className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:scale-[1.02] cursor-pointer transition-all duration-700 hover:shadow-2xl hover:bg-white/90"
          style={{ 
            animationDelay: `${index * 150}ms`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={city.imageUrl}
              alt={city.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40"></div>
            
            {/* Property Count Badge */}
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">
                  {city.properties} stays
                </span>
              </div>
            </div>
            
            {/* City Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-2xl lg:text-3xl text-white leading-tight tracking-tight">
                  {city.name}
                </h3>
                <p className="text-gray-200 text-sm font-medium leading-relaxed line-clamp-2">
                  {city.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  <p className="text-blue-200 text-sm font-medium">
                    {city.country}
                  </p>
                </div>
                
                {/* Explore indicator */}
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-full p-4 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            
            {/* Subtle shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      ))}
    </div>
    
     {/* Premium Call to Action */}
     <div className="text-center mt-8 lg:mt-10">
      <div className="relative inline-block">
        {/* Background glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl">
            {/* Icon and text content */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-3">
                Can't find your 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium"> perfect destination?</span>
              </h3>
              
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                We're continuously expanding our portfolio across East Africa's most extraordinary locations
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">12+ new destinations this year</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3 border border-blue-500/20">
                <span>View All Destinations</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 border border-gray-200 transition-all duration-300 hover:shadow-lg flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Request Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Property Types with Enhanced Cards */}
      <section className="py-10 lg:py-16 bg-white relative overflow-hidden">
        {/* Imigongo Design - Bottom Left */}
        <div className="absolute bottom-16 left-8 z-10 hidden lg:block">
          <ImigongoPattern variant="left" size="md" className="imigongo-pattern opacity-20" message="Find your perfect stay" />
        </div>
        
        {/* Imigongo Design - Bottom Right */}
        <div className="absolute bottom-16 right-8 z-10 hidden lg:block">
          <ImigongoPattern variant="right" size="md" className="imigongo-pattern opacity-20" message="Every type, every comfort" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-6 lg:mb-8">
            <div className="mb-3">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-full mb-2">
                Property Types
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-3 tracking-tight leading-none">
              Find Your <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                Perfect Stay
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
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
      <section className="py-10 lg:py-16 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Imigongo Design - Top Center */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
          <ImigongoPattern variant="center" size="sm" className="imigongo-pattern opacity-10" message="Premium features await" />
        </div>
        
        {/* Imigongo Design - Bottom Center */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
          <ImigongoPattern variant="center" size="sm" className="imigongo-pattern opacity-10" message="Experience excellence" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 lg:px-6 relative">
          <div className="text-center mb-6 lg:mb-8">
            <div className="mb-3">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full mb-2">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-3 tracking-tight leading-none">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                KWETU
              </span>?
            </h2>
            <h3 className="text-base sm:text-lg lg:text-xl font-light text-gray-700 mb-2">Excellence in Every Detail</h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
              We&apos;re redefining hospitality across East Africa with unmatched quality and personalized service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-6 bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400/60 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-10 lg:py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        {/* Imigongo Design - Left Side */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
          <ImigongoPattern variant="left" size="md" className="imigongo-pattern opacity-15" message="Ready to explore?" />
        </div>
        
        {/* Imigongo Design - Right Side */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
          <ImigongoPattern variant="right" size="md" className="imigongo-pattern opacity-15" message="Your journey starts here" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">Ready to Host?</h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 opacity-90 leading-relaxed">
              Join thousands of successful hosts earning income while sharing the beauty of East Africa with travelers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2 cursor-pointer">
                <Home className="w-5 h-5" />
                Start Hosting Today
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl flex items-center gap-2 cursor-pointer">
                <Play className="w-5 h-5" />
                Watch Success Stories
              </button>
            </div>
            
            {/* Host Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: <CreditCard className="h-6 w-6" />, title: 'Earn $2,000+', subtitle: 'Average monthly income' },
                { icon: <Shield className="h-6 w-6" />, title: 'Full Protection', subtitle: 'Host guarantee included' },
                { icon: <Zap className="h-6 w-6" />, title: 'Easy Setup', subtitle: 'List in under 10 minutes' }
              ].map((benefit, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-white mb-2">{benefit.icon}</div>
                  <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                  <p className="text-white/80 text-xs">{benefit.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300 py-10 lg:py-16 relative overflow-hidden">
        {/* Imigongo Design - Top Left */}
        <div className="absolute top-16 left-8 z-10 hidden lg:block">
          <ImigongoPattern variant="left" size="sm" className="imigongo-pattern opacity-10" message="Thank you for choosing KWETU" />
        </div>
        
        {/* Imigongo Design - Top Right */}
        <div className="absolute top-16 right-8 z-10 hidden lg:block">
          <ImigongoPattern variant="right" size="sm" className="imigongo-pattern opacity-10" message="Stay connected with us" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          {/* Newsletter Signup */}
          <div className="text-center mb-10 lg:mb-14 bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Get the latest deals, travel tips, and exclusive offers from KWETU delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
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
              <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">
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
    </>
  );
};

export default HomePage;