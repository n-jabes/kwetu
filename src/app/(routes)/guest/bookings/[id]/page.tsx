'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Star,
  Heart,
  Share2,
  Download,
  MessageCircle,
  Wifi,
  Car,
  Utensils,
  Tv,
  AirVent,
  Bath,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const BookingDetails = () => {
  const params = useParams();
  const bookingId = params.id;

  // Hardcoded user data for testing
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'GUEST' as const,
    avatar: undefined
  };

  // State management
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isReviewsHovered, setIsReviewsHovered] = useState(false);
  const [autoScrollProgress, setAutoScrollProgress] = useState(0);
  const [reviewsAutoScrollProgress, setReviewsAutoScrollProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reviewsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reviewsProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Michael Chen',
      userAvatar: undefined,
      rating: 5,
      title: 'Amazing stay!',
      comment: 'The villa exceeded all our expectations. Beautiful location, spotless clean, and Sarah was an incredible host. The pool area was perfect for our family vacation.',
      date: 'Dec 2024',
      verified: true
    },
    {
      id: 2,
      userName: 'Emily Rodriguez',
      userAvatar: undefined,
      rating: 4,
      title: 'Great location and amenities',
      comment: 'Loved the central location and modern amenities. The kitchen was well-equipped and the WiFi was excellent for remote work. Only minor issue was the AC in one bedroom.',
      date: 'Nov 2024',
      verified: true
    },
    {
      id: 3,
      userName: 'David Thompson',
      userAvatar: undefined,
      rating: 5,
      title: 'Perfect for families',
      comment: 'This place is ideal for families. Kids loved the pool, adults enjoyed the spacious living areas. Sarah provided great local recommendations. Will definitely book again!',
      date: 'Oct 2024',
      verified: true
    }
  ]);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    title: '',
    comment: ''
  });

  // Mock booking data - in real app, this would be fetched based on bookingId
  const booking = {
    id: bookingId,
    location: 'Kigali, Rwanda',
    checkIn: 'Dec 15, 2024',
    checkOut: 'Dec 20, 2024',
    status: 'completed',
    amount: '$450',
    guests: 4,
    bookingDate: 'Nov 20, 2024',
    propertyImage: '/images/villa.jpg',
    nights: 5,
    propertyType: 'Villa',
    bookingReference: 'KWT-' + bookingId + '-2024',
    totalAmount: 450,
    breakdown: {
      basePrice: 90,
      nights: 5,
      subtotal: 450,
      serviceFee: 45,
      taxes: 35,
      total: 530
    },
    host: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@kwetu.com',
      phone: '+250 788 123 456',
      avatar: undefined,
      joinedDate: 'Jan 2023',
      rating: 4.9,
      reviews: 127
    },
    property: {
      name: 'Luxury Villa in Kigali',
      type: 'Villa',
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      description: 'A beautiful luxury villa located in the heart of Kigali with stunning city views and modern amenities.',
      amenities: ['WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'TV', 'Balcony', 'Garden'],
      images: ['/images/villa.jpg', '/images/house.png', '/images/kigali.jpg'],
      address: '123 Kigali Heights, Kigali, Rwanda',
      coordinates: { lat: -1.9441, lng: 30.0619 }
    },
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    specialRequests: 'Late check-in requested',
    paymentMethod: 'Credit Card ending in 1234',
    hasReview: false
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'completed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending Confirmation';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const handleStarClick = (rating: number) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === booking.property.images.length - 1 ? 0 : prev + 1
    );
    resetAutoScroll();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? booking.property.images.length - 1 : prev - 1
    );
    resetAutoScroll();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    resetAutoScroll();
  };

  const startAutoScroll = () => {
    if (booking.property.images.length <= 1) return;
    
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
          prev === booking.property.images.length - 1 ? 0 : prev + 1
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

  // Auto-scroll effect
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.property.images.length, isCarouselHovered]);

  // Pause auto-scroll when component unmounts
  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

  // Reviews auto-scroll effect
  useEffect(() => {
    startReviewsAutoScroll();
    return () => stopReviewsAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length, isReviewsHovered]);

  // Pause reviews auto-scroll when component unmounts
  useEffect(() => {
    return () => stopReviewsAutoScroll();
  }, []);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === reviews.length - 1 ? 0 : prev + 1
    );
    resetReviewsAutoScroll();
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === 0 ? reviews.length - 1 : prev - 1
    );
    resetReviewsAutoScroll();
  };

  const goToReview = (index: number) => {
    setCurrentReviewIndex(index);
    resetReviewsAutoScroll();
  };

  const startReviewsAutoScroll = () => {
    if (reviews.length <= 1) return;
    
    // Reset progress
    setReviewsAutoScrollProgress(0);
    
    // Progress tracking
    reviewsProgressIntervalRef.current = setInterval(() => {
      if (!isReviewsHovered) {
        setReviewsAutoScrollProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1.67; // 6 seconds / 100 = 60 steps, 100/60 = 1.67
        });
      }
    }, 100);
    
    // Main auto-scroll
    reviewsIntervalRef.current = setInterval(() => {
      if (!isReviewsHovered) {
        setCurrentReviewIndex((prev) => 
          prev === reviews.length - 1 ? 0 : prev + 1
        );
        setReviewsAutoScrollProgress(0); // Reset progress after transition
      }
    }, 6000); // Auto-scroll every 6 seconds (longer for reading)
  };

  const stopReviewsAutoScroll = () => {
    if (reviewsIntervalRef.current) {
      clearInterval(reviewsIntervalRef.current);
      reviewsIntervalRef.current = null;
    }
    if (reviewsProgressIntervalRef.current) {
      clearInterval(reviewsProgressIntervalRef.current);
      reviewsProgressIntervalRef.current = null;
    }
  };

  const resetReviewsAutoScroll = () => {
    stopReviewsAutoScroll();
    setReviewsAutoScrollProgress(0);
    startReviewsAutoScroll();
  };

  const renderStars = (rating: number, onStarClick?: (rating: number) => void, size = 'w-5 h-5') => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onStarClick?.(star)}
            className={`${size} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${onStarClick ? 'hover:text-yellow-400 cursor-pointer' : ''} transition-colors`}
          >
            <Star className={size} />
          </button>
        ))}
      </div>
    );
  };

  const submitReview = () => {
    if (reviewData.rating === 0 || !reviewData.comment.trim()) {
      return;
    }

    // Prepare data for API submission
    const reviewPayload = {
      bookingId: booking.id,
      propertyId: 1, // Fallback to 1 since booking.property.id does not exist
      userId: userData.email, // Or user ID from auth
      userName: userData.name,
      rating: reviewData.rating,
      title: reviewData.title.trim() || null,
      comment: reviewData.comment.trim(),
      timestamp: new Date().toISOString(),
      verified: true // This would be set by your backend based on booking verification
    };

    // Console log the data that would be sent to API
    console.log('=== REVIEW SUBMISSION DATA ===');
    console.log('Payload to send to API:', reviewPayload);
    console.log('API Endpoint would be: POST /api/reviews');
    console.log('===============================');

    // TODO: Replace this with actual API call
    // Example API call:
    // try {
    //   const response = await fetch('/api/reviews', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${userToken}`
    //     },
    //     body: JSON.stringify(reviewPayload)
    //   });
    //   
    //   if (response.ok) {
    //     const savedReview = await response.json();
    //     // Handle success
    //   }
    // } catch (error) {
    //   console.error('Error submitting review:', error);
    // }

    // Create new review for local display (this would come from API response)
    const newReview = {
      id: reviews.length + 1,
      userName: userData.name,
      userAvatar: userData.avatar,
      rating: reviewData.rating,
      title: reviewData.title || 'Great stay!',
      comment: reviewData.comment,
      date: 'Just now',
      verified: true
    };

    // Add review to the beginning of the list
    setReviews(prev => [newReview, ...prev]);
    
    // Reset form and close
    setReviewData({ rating: 0, title: '', comment: '' });
    setShowReviewForm(false);
    
    // Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const amenityIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'WiFi': Wifi,
    'Pool': Bath,
    'Kitchen': Utensils,
    'Parking': Car,
    'Air Conditioning': AirVent,
    'TV': Tv
  };

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/guest/bookings"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Booking Details</h1>
              <p className="text-gray-600 mt-1">Reference: {booking.bookingReference}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getStatusStyle(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="ml-2">{getStatusText(booking.status)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Information */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Image Carousel */}
              <div 
                className="relative h-80"
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
              >
                <Image
                  src={booking.property.images[currentImageIndex]}
                  alt={booking.property.name}
                  fill
                  className="object-cover transition-opacity duration-500"
                />
                
                {/* Navigation Arrows */}
                {booking.property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}
                
                {/* Image Indicators with Progress */}
                {booking.property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {booking.property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className="relative"
                      >
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/75'
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
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Overlay Content */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    {booking.property.type}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {booking.property.images.length}
                  </span>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{booking.property.name}</h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.property.address}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{booking.property.bedrooms} bedrooms</span>
                      <span>{booking.property.bathrooms} bathrooms</span>
                      <span>Up to {booking.property.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{booking.property.description}</p>
                
                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {booking.property.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity] || Wifi;
                      return (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-semibold text-gray-900">{booking.checkIn}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-semibold text-gray-900">{booking.checkOut}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-semibold text-gray-900">{booking.guests} guests</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-semibold text-gray-900">{booking.bookingDate}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{booking.nights} nights</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold text-gray-900">{booking.paymentMethod}</p>
                  </div>
                </div>
              </div>
              
              {booking.specialRequests && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                  <p className="text-gray-700">{booking.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Review Section */}
            {booking.status === 'completed' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Write Review Form */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
                    {!showReviewForm && (
                      <button
                        onClick={() => setShowReviewForm(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Write Review
                      </button>
                    )}
                  </div>
                  
                  {!showReviewForm && (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-2">Share your experience</p>
                      <p className="text-sm text-gray-400">Help other guests by writing a review</p>
                    </div>
                  )}
                  
                  {showReviewForm && (
                    <div className="space-y-6">
                      {/* Overall Rating */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          How was your stay?
                        </label>
                        {renderStars(reviewData.rating, handleStarClick, 'w-6 h-6')}
                      </div>
                      
                      {/* Review Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Review Title (Optional)
                        </label>
                        <input
                          type="text"
                          value={reviewData.title}
                          onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Summarize your stay"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      {/* Review Comment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review *
                        </label>
                        <textarea
                          value={reviewData.comment}
                          onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                          placeholder="Tell future guests about your experience..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={submitReview}
                          disabled={reviewData.rating === 0 || !reviewData.comment.trim()}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reviews Carousel */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Guest Reviews</h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(4.8, undefined, 'w-4 h-4')}
                      <span className="text-sm text-gray-600 ml-1">({reviews.length})</span>
                    </div>
                  </div>
                  
                  {reviews.length > 0 && (
                    <div 
                      className="relative"
                      onMouseEnter={() => setIsReviewsHovered(true)}
                      onMouseLeave={() => setIsReviewsHovered(false)}
                    >
                      {/* Current Review */}
                      <div className="min-h-[250px]">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-gray-600">
                              {reviews[currentReviewIndex].userName.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">{reviews[currentReviewIndex].userName}</h4>
                              {reviews[currentReviewIndex].verified && (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              {renderStars(reviews[currentReviewIndex].rating, undefined, 'w-3 h-3')}
                              <span className="text-xs text-gray-500">{reviews[currentReviewIndex].date}</span>
                            </div>
                          </div>
                        </div>
                        
                        {reviews[currentReviewIndex].title && (
                          <p className="text-sm font-medium text-gray-900 mb-2">{reviews[currentReviewIndex].title}</p>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">{reviews[currentReviewIndex].comment}</p>
                      </div>
                      
                      {/* Navigation Controls */}
                      {reviews.length > 1 && (
                        <>
                          <div className="flex items-center justify-between mt-4">
                            <button
                              onClick={prevReview}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4 text-gray-600" />
                            </button>
                            
                            <div className="flex space-x-1">
                              {reviews.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => goToReview(index)}
                                  className="relative"
                                >
                                  <div className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentReviewIndex 
                                      ? 'bg-blue-500' 
                                      : 'bg-gray-300 hover:bg-gray-400'
                                  }`} />
                                  {/* Progress ring for current review */}
                                  {index === currentReviewIndex && !isReviewsHovered && (
                                    <div className="absolute inset-0 -m-1">
                                      <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
                                        <circle
                                          cx="8"
                                          cy="8"
                                          r="6"
                                          fill="none"
                                          stroke="rgba(59, 130, 246, 0.3)"
                                          strokeWidth="1"
                                        />
                                        <circle
                                          cx="8"
                                          cy="8"
                                          r="6"
                                          fill="none"
                                          stroke="rgb(59, 130, 246)"
                                          strokeWidth="1"
                                          strokeDasharray={`${2 * Math.PI * 6}`}
                                          strokeDashoffset={`${2 * Math.PI * 6 * (1 - reviewsAutoScrollProgress / 100)}`}
                                          className="transition-all duration-100 ease-linear"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                            
                            <button
                              onClick={nextReview}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          
                          <div className="text-center mt-2">
                            <span className="text-xs text-gray-500">
                              {currentReviewIndex + 1} of {reviews.length}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Host</h3>
              
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {booking.host.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{booking.host.name}</h4>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    {renderStars(booking.host.rating, undefined, 'w-3 h-3')}
                    <span>({booking.host.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-500">Joined {booking.host.joinedDate}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Host</span>
                </button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{booking.host.phone}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{booking.host.email}</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">${booking.breakdown.basePrice} × {booking.breakdown.nights} nights</span>
                  <span className="text-gray-900">${booking.breakdown.subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-900">${booking.breakdown.serviceFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-900">${booking.breakdown.taxes}</span>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">${booking.breakdown.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation Policy</h3>
              <p className="text-sm text-gray-600">{booking.cancellationPolicy}</p>
            </div>

          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Review submitted successfully!</span>
              <button
                onClick={() => setShowToast(false)}
                className="ml-2 hover:bg-green-700 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingDetails;

