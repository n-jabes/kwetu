// TypeScript interfaces
export interface Listing {
  id: string;
  title: string;
  location: string;
  sublocation: string;
  price: number;
  rating: number;
  images: string[];
  propertyType: 'apartment' | 'villa' | 'house';
  amenities: string[];
  accommodates?: {
    tables?: number;
    inLounge?: number;
    maximumTotal?: number;
    squareFeet?: number;
  };
  openingHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface ListingFormData {
  // Property Type
  propertyType: 'apartment' | 'villa' | 'house' | 'room' | 'traditional' | 'mountain' | 'city';
  propertyCategory: 'residential' | 'commercial' | 'mixed';
  // Location
  country: string;
  city: string;
  district: string;
  sector: string;
  cell: string;
  streetAddress: string;
  latitude: number | null;
  longitude: number | null;
  // Details
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareMeters: number;
  floorNumber: number;
  totalFloors: number;
  yearBuilt: number;
  parkingSpaces: number;
  // Amenities
  amenities: string[];
  // Photos
  photos: File[];
  photoUrls: string[];
  // Pricing
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  cleaningFee: number;
  serviceFee: number;
  securityDeposit: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
  // Additional
  instantBookable: boolean;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
}

export interface FilterState {
    priceRange: [number, number];
    propertyType: string[];
    amenities: string[];
    userRatings: number[];
  }