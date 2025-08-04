// TypeScript interfaces
export interface Listing {
  id: string;
  title: string;
  location: string;
  sublocation: string;
  price: number;
  rating: number;
  imageUrl: string;
  propertyType: 'apartment' | 'villa' | 'house';
  amenities: string[];
}

export interface FilterState {
    priceRange: [number, number];
    propertyType: string[];
    amenities: string[];
    userRatings: number[];
  }