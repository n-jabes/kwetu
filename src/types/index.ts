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

export interface FilterState {
    priceRange: [number, number];
    propertyType: string[];
    amenities: string[];
    userRatings: number[];
  }