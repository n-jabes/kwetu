// Validation utility functions

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  // Check if name contains only letters, spaces, and common punctuation
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods' };
  }
  
  return { isValid: true };
};

// Date validation
export const validateDates = (checkIn: string, checkOut: string): ValidationResult => {
  if (!checkIn) {
    return { isValid: false, error: 'Check-in date is required' };
  }
  
  if (!checkOut) {
    return { isValid: false, error: 'Check-out date is required' };
  }
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  
  // Reset time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);
  
  if (checkInDate < today) {
    return { isValid: false, error: 'Check-in date cannot be in the past' };
  }
  
  if (checkOutDate <= checkInDate) {
    return { isValid: false, error: 'Check-out date must be after check-in date' };
  }
  
  const maxStayDays = 30; // Maximum 30 days stay
  const stayDuration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (stayDuration > maxStayDays) {
    return { isValid: false, error: `Maximum stay duration is ${maxStayDays} days` };
  }
  
  if (stayDuration < 1) {
    return { isValid: false, error: 'Minimum stay duration is 1 day' };
  }
  
  return { isValid: true };
};

// Guests validation
export const validateGuests = (guests: number): ValidationResult => {
  if (!guests || guests < 1) {
    return { isValid: false, error: 'Number of guests must be at least 1' };
  }
  
  if (guests > 20) {
    return { isValid: false, error: 'Maximum number of guests is 20' };
  }
  
  if (!Number.isInteger(guests)) {
    return { isValid: false, error: 'Number of guests must be a whole number' };
  }
  
  return { isValid: true };
};

// Special requests validation
export const validateSpecialRequests = (requests: string): ValidationResult => {
  if (requests && requests.length > 500) {
    return { isValid: false, error: 'Special requests must be less than 500 characters' };
  }
  
  return { isValid: true };
};

// Phone validation (basic - detailed validation is in PhoneInput component)
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Basic format check
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number with country code' };
  }
  
  return { isValid: true };
};

// Card number validation
export const validateCardNumber = (cardNumber: string): ValidationResult => {
  if (!cardNumber) {
    return { isValid: false, error: 'Card number is required' };
  }
  
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, error: 'Card number must be between 13 and 19 digits' };
  }
  
  if (!/^\d+$/.test(cleanNumber)) {
    return { isValid: false, error: 'Card number must contain only digits' };
  }
  
  return { isValid: true };
};

// Expiry date validation
export const validateExpiryDate = (expiry: string): ValidationResult => {
  if (!expiry) {
    return { isValid: false, error: 'Expiry date is required' };
  }
  
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) {
    return { isValid: false, error: 'Please enter expiry date in MM/YY format' };
  }
  
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }
  
  return { isValid: true };
};

// CVV validation
export const validateCVV = (cvv: string): ValidationResult => {
  if (!cvv) {
    return { isValid: false, error: 'CVV is required' };
  }
  
  if (!/^\d{3,4}$/.test(cvv)) {
    return { isValid: false, error: 'CVV must be 3 or 4 digits' };
  }
  
  return { isValid: true };
};

// Form step validation
export const validateFormStep = (step: number, formData: any): ValidationResult => {
  switch (step) {
    case 1: // Dates & Guests
      const datesValidation = validateDates(formData.checkIn, formData.checkOut);
      if (!datesValidation.isValid) return datesValidation;
      
      const guestsValidation = validateGuests(formData.guests);
      if (!guestsValidation.isValid) return guestsValidation;
      
      return { isValid: true };
      
    case 2: // Contact Information
      const nameValidation = validateName(formData.contactName);
      if (!nameValidation.isValid) return nameValidation;
      
      const emailValidation = validateEmail(formData.contactEmail);
      if (!emailValidation.isValid) return emailValidation;
      
      const phoneValidation = validatePhone(formData.contactPhone);
      if (!phoneValidation.isValid) return phoneValidation;
      
      return { isValid: true };
      
    case 3: // Review (no validation needed)
      return { isValid: true };
      
    case 4: // Payment (validation depends on payment method)
      return { isValid: true };
      
    default:
      return { isValid: false, error: 'Invalid step' };
  }
};
