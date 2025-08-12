'use client'
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Star, CheckCircle, Check, Download, Share2, Home, Users, Building, Mail, Phone } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { dummyListings } from '@/data/listings';
import { formatDate } from '@/utils/booking';
import Image from 'next/image';

const BookingConfirmationPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const listing = dummyListings.find(item => item.id === id);

  // Mock booking details - in a real app, this would come from the booking flow
  const bookingDetails = {
    bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 2,
    totalPrice: listing ? listing.price * 3 : 0,
    serviceFee: listing ? (listing.price * 3 * 0.12) : 0,
    finalTotal: listing ? (listing.price * 3 * 1.12) : 0,
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    contactPhone: '+256 7XX XXX XXX',
    status: 'confirmed' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center">Listing not found</div>;
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download started...');
  };

  const handleShareBooking = () => {
    // In a real app, this would open sharing options
    if (navigator.share) {
      navigator.share({
        title: 'My KWETU Booking',
        text: `I've booked ${listing.title} for ${bookingDetails.guests} guests!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchResultsNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking & Payment Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-4">
            Your booking has been successfully confirmed and payment processed. We've sent you a confirmation email with all the details.
          </p>
          
          {/* Success Status */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Check className="h-4 w-4 mr-2" />
            Fully Confirmed - Your stay is secured
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              
              <div className="flex items-start space-x-4 mb-6">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {listing.rating} · Excellent
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{formatDate(bookingDetails.checkIn)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{formatDate(bookingDetails.checkOut)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'guest' : 'guests'}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium capitalize">{listing.propertyType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium">{bookingDetails.contactName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{bookingDetails.contactEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-medium">{bookingDetails.contactPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                  <p className="font-medium font-mono text-sm">{bookingDetails.bookingId}</p>
                </div>
              </div>
            </div>

            {/* Payment Confirmation */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Payment Confirmed</h2>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Payment Successful</p>
                  <p className="text-green-700 text-sm">Your payment has been processed and confirmed</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm font-medium">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">${bookingDetails.finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Check your email</p>
                    <p className="text-blue-800 text-sm">We've sent you a detailed confirmation email with all the information you need.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Host will contact you</p>
                    <p className="text-blue-800 text-sm">Your host will reach out within 2 hours to confirm arrival details and provide check-in instructions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Enjoy your stay</p>
                    <p className="text-blue-800 text-sm">Have a wonderful time at your chosen property!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>${listing.price} × 3 nights</span>
                    <span>${bookingDetails.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>${bookingDetails.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total Paid</span>
                    <span>${bookingDetails.finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </button>
                
                <button
                  onClick={handleShareBooking}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Booking
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              </div>

              {/* Support Info */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-green-600" />
                    support@kwetu.com
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
