'use client'
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, CheckCircle, CreditCard, Shield, Info, Smartphone, Building2, Lightbulb } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { dummyListings } from '@/data/listings';
import { BookingFormData } from '@/types/booking';
import { calculateBookingTotal, validateBookingDates } from '@/utils/booking';
import Image from 'next/image';

const BookingPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const listing = dummyListings.find(item => item.id === id);

  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateError, setDateError] = useState<string>('');
  
  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center">Listing not found</div>;
  }

  // Calculate total nights and price
  const { totalNights, totalPrice, serviceFee, finalTotal } = calculateBookingTotal(
    listing.price,
    formData.checkIn,
    formData.checkOut
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
    
    // Clear date error when dates change
    if (name === 'checkIn' || name === 'checkOut') {
      setDateError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to confirmation page
    router.push(`/listings/${id}/booking/confirmation`);
  };

  const handleProcessPayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessingPayment(false);
    
    // Redirect to confirmation page after successful payment
    router.push(`/listings/${id}/booking/confirmation`);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate dates before proceeding
      const validation = validateBookingDates(formData.checkIn, formData.checkOut);
      if (!validation.isValid) {
        setDateError(validation.error || 'Invalid dates');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchResultsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex cursor-pointer items-center text-green-600 hover:text-green-700 mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to listing
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-green-600 font-medium' : ''}>Dates & Guests</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 2 ? 'text-green-600 font-medium' : ''}>Contact Info</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 3 ? 'text-green-600 font-medium' : ''}>Review</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 4 ? 'text-green-600 font-medium' : ''}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Booking form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
              
                             <div>
                {/* Step 1: Dates & Guests */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                                           </div>
                   </div>
                   
                   {/* Date Error Display */}
                   {dateError && (
                     <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                       <p className="text-red-800 text-sm">{dateError}</p>
                     </div>
                   )}
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       <Users className="h-4 w-4 inline mr-2" />
                       Number of Guests
                     </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any special requirements or requests..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Check-in:</span>
                          <span className="font-medium">{new Date(formData.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-out:</span>
                          <span className="font-medium">{new Date(formData.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-medium">{formData.guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contact:</span>
                          <span className="font-medium">{formData.contactName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Important Information</p>
                          <ul className="space-y-1">
                            <li>• Free cancellation up to 24 hours before check-in</li>
                            <li>• Payment required to confirm booking</li>
                            <li>• Host will respond within 2 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    {/* Payment Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Booking Amount:</span>
                          <span className="font-medium">${totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee:</span>
                          <span className="font-medium">${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total to Pay:</span>
                          <span className="text-lg text-green-600">${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Select Payment Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Credit/Debit Cards */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentMethod('card')}
                          className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                            selectedPaymentMethod === 'card'
                              ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <CreditCard className={`h-5 w-5 mr-2 ${
                              selectedPaymentMethod === 'card' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">Credit/Debit Card</p>
                              <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                            </div>
                          </div>
                        </button>

                        {/* MTN Mobile Money */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentMethod('mtn')}
                          className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                            selectedPaymentMethod === 'mtn'
                              ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <Smartphone className={`h-5 w-5 mr-2 ${
                              selectedPaymentMethod === 'mtn' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">MTN Mobile Money</p>
                              <p className="text-sm text-gray-500">Pay with MTN MoMo</p>
                            </div>
                          </div>
                        </button>

                        {/* Airtel Money */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentMethod('airtel')}
                          className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                            selectedPaymentMethod === 'airtel'
                              ? 'border-green-500 bg-green-500 bg-green-50 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <Smartphone className={`h-5 w-5 mr-2 ${
                              selectedPaymentMethod === 'airtel' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">Airtel Money</p>
                              <p className="text-sm text-gray-500">Pay with Airtel Money</p>
                            </div>
                          </div>
                        </button>

                        {/* Bank Transfer */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentMethod('bank')}
                          className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                            selectedPaymentMethod === 'bank'
                              ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <Building2 className={`h-5 w-5 mr-2 ${
                              selectedPaymentMethod === 'bank' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">Bank Transfer</p>
                              <p className="text-sm text-gray-500">Direct bank transfer</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Payment Form based on selected method */}
                    {selectedPaymentMethod === 'card' && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Card Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                              <div className="absolute right-3 top-3">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'mtn' && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">MTN Mobile Money</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              MTN Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+256 7XX XXX XXX"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-start">
                              <Lightbulb className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-yellow-800">
                                You'll receive a prompt on your phone to confirm the payment of ${finalTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'airtel' && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Airtel Money</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Airtel Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+256 7XX XXX XXX"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-start">
                              <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-blue-800">
                                You'll receive a prompt on your phone to confirm the payment of ${finalTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'bank' && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Bank Transfer Details</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Bank Name:</span>
                            <span className="font-medium">KWETU Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Account Number:</span>
                            <span className="font-medium font-mono">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Account Name:</span>
                            <span className="font-medium">KWETU Properties Ltd</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Reference:</span>
                            <span className="font-medium font-mono">BK{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Amount:</span>
                            <span className="font-medium">${finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center text-sm text-green-800">
                        <Shield className="h-4 w-4 mr-2" />
                        Your payment is secured with bank-level encryption
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.checkIn || !formData.checkOut}
                      className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  ) : currentStep === 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Complete Payment
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Booking summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Property summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {listing.rating} · Excellent
                    </div>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Price Details</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>${listing.price} × {totalNights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security features */}
                <div className="border-t pt-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    Secure payment
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Free cancellation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    Instant confirmation
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

export default BookingPage;
