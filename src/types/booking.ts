export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface BookingDetails {
  bookingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  serviceFee: number;
  finalTotal: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  listingId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}
