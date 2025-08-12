export const calculateBookingTotal = (pricePerNight: number, checkIn: string, checkOut: string, serviceFeePercentage: number = 0.12) => {
  if (!checkIn || !checkOut) return { totalNights: 0, totalPrice: 0, serviceFee: 0, finalTotal: 0 };
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const totalPrice = totalNights * pricePerNight;
  const serviceFee = totalPrice * serviceFeePercentage;
  const finalTotal = totalPrice + serviceFee;
  
  return {
    totalNights,
    totalPrice,
    serviceFee,
    finalTotal
  };
};

export const generateBookingId = (): string => {
  return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};

export const validateBookingDates = (checkIn: string, checkOut: string): { isValid: boolean; error?: string } => {
  if (!checkIn || !checkOut) {
    return { isValid: false, error: 'Please select both check-in and check-out dates' };
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
  
  return { isValid: true };
};
