'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, CheckCircle, CreditCard, Shield, Info, Smartphone, Building2, Lightbulb } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { dummyListings } from '@/data/listings';
import { BookingFormData } from '@/types/booking';
import { calculateBookingTotal } from '@/utils/booking';
import { validateFormStep, validateDates, validateName, validateEmail, validatePhone, validateGuests, validateSpecialRequests, validateCardNumber, validateExpiryDate, validateCVV } from '@/utils/validation';
import { PhoneInput } from '@/components/ui/phone-input';
import toast from 'react-hot-toast';
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
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Field validation states
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Payment form data
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mtnPhone: '',
    airtelPhone: ''
  });
  
  // Payment validation errors
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

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
    
    // Clear errors when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear date error when dates change
    if (name === 'checkIn' || name === 'checkOut') {
      setDateError('');
    }
  };

  const handleFieldBlur = (fieldName: string, value: any) => {
    // Only validate if the field has been touched or has a value
    if (!touchedFields[fieldName] && !value) {
      return;
    }
    
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    
    let error = '';
    
    switch (fieldName) {
      case 'checkIn':
      case 'checkOut':
        if (formData.checkIn && formData.checkOut) {
          const validation = validateDates(formData.checkIn, formData.checkOut);
          if (!validation.isValid) {
            error = validation.error || '';
          }
        }
        break;
      case 'guests':
        const guestsValidation = validateGuests(value);
        if (!guestsValidation.isValid) {
          error = guestsValidation.error || '';
        }
        break;
      case 'contactName':
        const nameValidation = validateName(value);
        if (!nameValidation.isValid) {
          error = nameValidation.error || '';
        }
        break;
      case 'contactEmail':
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          error = emailValidation.error || '';
        }
        break;
      case 'contactPhone':
        const phoneValidation = validatePhone(value);
        if (!phoneValidation.isValid) {
          error = phoneValidation.error || '';
        }
        break;
      case 'specialRequests':
        const requestsValidation = validateSpecialRequests(value);
        if (!requestsValidation.isValid) {
          error = requestsValidation.error || '';
        }
        break;
    }
    
    if (error) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
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
    // Validate payment data before processing
    let hasErrors = false;
    const newErrors: Record<string, string> = {};
    
    if (selectedPaymentMethod === 'card') {
      const cardValidation = validateCardNumber(paymentData.cardNumber);
      if (!cardValidation.isValid) {
        newErrors.cardNumber = cardValidation.error || '';
        hasErrors = true;
      }
      
      const expiryValidation = validateExpiryDate(paymentData.expiryDate);
      if (!expiryValidation.isValid) {
        newErrors.expiryDate = expiryValidation.error || '';
        hasErrors = true;
      }
      
      const cvvValidation = validateCVV(paymentData.cvv);
      if (!cvvValidation.isValid) {
        newErrors.cvv = cvvValidation.error || '';
        hasErrors = true;
      }
    } else if (selectedPaymentMethod === 'mtn') {
      if (!paymentData.mtnPhone) {
        newErrors.mtnPhone = 'MTN phone number is required';
        hasErrors = true;
      } else if (!paymentData.mtnPhone.startsWith('+250')) {
        newErrors.mtnPhone = 'MTN Mobile Money is only available for Rwanda phone numbers';
        hasErrors = true;
      }
    } else if (selectedPaymentMethod === 'airtel') {
      if (!paymentData.airtelPhone) {
        newErrors.airtelPhone = 'Airtel phone number is required';
        hasErrors = true;
      } else if (!paymentData.airtelPhone.startsWith('+250')) {
        newErrors.airtelPhone = 'Airtel Money is only available for Rwanda phone numbers';
        hasErrors = true;
      }
    }
    
    if (hasErrors) {
      setPaymentErrors(newErrors);
      toast.error('Please fix payment errors before proceeding');
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessingPayment(false);
    
    // Show success message
    toast.success('Payment processed successfully!');
    
    // Redirect to confirmation page after successful payment
    router.push(`/listings/${id}/booking/confirmation`);
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user types
    if (paymentErrors[field]) {
      setPaymentErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const validation = validateFormStep(currentStep, formData);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please complete all required fields');
      return;
    }
    
    // Mark current step as complete
    setCompletedSteps(prev => [...prev, currentStep]);
    
    // Move to next step
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    // Allow going back to previous steps without losing information
    setCurrentStep(prev => Math.max(prev - 1, 1));
    
    // Update step description when going back
    setTimeout(() => {
      updateStepDescription();
    }, 100);
  };

  const updateStepDescription = () => {
    const stepDescriptions = {
      1: "Select your check-in and check-out dates, number of guests, and any special requests.",
      2: "Provide your contact information including name, email, and phone number.",
      3: "Review your booking details before proceeding to payment.",
      4: "Complete your payment using your preferred method. MTN Mobile Money and Airtel Money are only available for Rwanda phone numbers."
    };
    
    // You can add logic here to update any UI elements that show step descriptions
    // For now, this function is ready for future enhancements
  };

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
                  completedSteps.includes(step)
                    ? 'bg-green-600 text-white' 
                    : step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedSteps.includes(step) ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
                    completedSteps.includes(step) ? 'bg-green-600' : step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center mt-2 text-sm text-gray-600 text-center">
            <span className={completedSteps.includes(1) ? 'text-green-600 font-medium' : currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Dates & Guests</span>
            <span className="hidden sm:inline mx-4">•</span>
            <span className={completedSteps.includes(2) ? 'text-green-600 font-medium' : currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Contact Info</span>
            <span className="hidden sm:inline mx-4">•</span>
            <span className={completedSteps.includes(3) ? 'text-green-600 font-medium' : currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Review</span>
            <span className="hidden sm:inline mx-4">•</span>
            <span className={completedSteps.includes(4) ? 'text-green-600 font-medium' : currentStep >= 4 ? 'text-blue-600 font-medium' : ''}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left column - Booking form */}
          <div className="xl:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
              
              {/* Step Description */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">
                      Step {currentStep} of 4
                    </h3>
                    <p className="text-sm text-blue-800">
                      {currentStep === 1 && "Select your check-in and check-out dates, number of guests, and any special requests."}
                      {currentStep === 2 && "Provide your contact information including name, email, and phone number."}
                      {currentStep === 3 && "Review your booking details before proceeding to payment."}
                      {currentStep === 4 && "Complete your payment using your preferred method. MTN Mobile Money and Airtel Money are only available for Rwanda phone numbers."}
                    </p>
                  </div>
                </div>
              </div>
              
                             <div>
                {/* Step 1: Dates & Guests */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Check-in Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('checkIn', formData.checkIn)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            fieldErrors.checkIn && touchedFields.checkIn ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {fieldErrors.checkIn && touchedFields.checkIn && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.checkIn}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Check-out Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('checkOut', formData.checkOut)}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            fieldErrors.checkOut && touchedFields.checkOut ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {fieldErrors.checkOut && touchedFields.checkOut && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.checkOut}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="h-4 w-4 inline mr-2" />
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur('guests', formData.guests)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          fieldErrors.guests && touchedFields.guests ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                      {fieldErrors.guests && touchedFields.guests && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.guests}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur('specialRequests', formData.specialRequests)}
                        rows={3}
                        placeholder="Any special requirements or requests..."
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          fieldErrors.specialRequests && touchedFields.specialRequests ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldErrors.specialRequests && touchedFields.specialRequests && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.specialRequests}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('contactName', formData.contactName)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            fieldErrors.contactName && touchedFields.contactName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {fieldErrors.contactName && touchedFields.contactName && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.contactName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          onBlur={() => handleFieldBlur('contactEmail', formData.contactEmail)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            fieldErrors.contactEmail && touchedFields.contactEmail ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {fieldErrors.contactEmail && touchedFields.contactEmail && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.contactEmail}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <PhoneInput
                        value={formData.contactPhone}
                        onChange={(value) => {
                          setFormData(prev => ({ ...prev, contactPhone: value }));
                          if (fieldErrors.contactPhone) {
                            setFieldErrors(prev => ({ ...prev, contactPhone: '' }));
                          }
                        }}
                        onBlur={() => handleFieldBlur('contactPhone', formData.contactPhone)}
                        error={fieldErrors.contactPhone}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                              <p className="text-xs text-orange-600 mt-1">🇷🇼 Rwanda only</p>
                            </div>
                          </div>
                        </button>

                        {/* Airtel Money */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentMethod('airtel')}
                          className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                            selectedPaymentMethod === 'airtel'
                              ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
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
                              <p className="text-xs text-orange-600 mt-1">🇷🇼 Rwanda only</p>
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
                              Card Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                  paymentErrors.cardNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                              />
                              <div className="absolute right-3 top-3">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                            {paymentErrors.cardNumber && (
                              <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber}</p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={paymentData.expiryDate}
                                onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                  paymentErrors.expiryDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {paymentErrors.expiryDate && (
                                <p className="mt-1 text-sm text-red-600">{paymentErrors.expiryDate}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={paymentData.cvv}
                                onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                                placeholder="123"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                  paymentErrors.cvv ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {paymentErrors.cvv && (
                                <p className="mt-1 text-sm text-red-600">{paymentErrors.cvv}</p>
                              )}
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
                              MTN Phone Number <span className="text-red-500">*</span>
                            </label>
                            <PhoneInput
                              value={paymentData.mtnPhone}
                              onChange={(value) => handlePaymentInputChange('mtnPhone', value)}
                              placeholder="MTN phone number"
                              paymentMethod="mtn"
                              required
                            />
                            {paymentErrors.mtnPhone && (
                              <p className="mt-1 text-sm text-red-600">{paymentErrors.mtnPhone}</p>
                            )}
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
                              Airtel Phone Number <span className="text-red-500">*</span>
                            </label>
                            <PhoneInput
                              value={paymentData.airtelPhone}
                              onChange={(value) => handlePaymentInputChange('airtelPhone', value)}
                              placeholder="Airtel phone number"
                              paymentMethod="airtel"
                              required
                            />
                            {paymentErrors.airtelPhone && (
                              <p className="mt-1 text-sm text-red-600">{paymentErrors.airtelPhone}</p>
                            )}
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center">
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
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer order-2 sm:order-1"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.checkIn || !formData.checkOut}
                      className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer order-1 sm:order-2"
                    >
                      Continue
                    </button>
                  ) : currentStep === 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!completedSteps.includes(1) || !completedSteps.includes(2)}
                      className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer order-1 sm:order-2"
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer order-1 sm:order-2"
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
          <div className="xl:w-1/3">
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
