import { LucideIcon } from "lucide-react";
import { Wifi, ParkingSquare, Tv, Waves, Dumbbell, Coffee, Utensils, Droplets, AirVent, Fan, Microwave, Refrigerator, WashingMachine, AudioWaveform  } from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  icon: LucideIcon;
  category: 'basic' | 'safety' | 'comfort' | 'kitchen' | 'outdoor';
}

export interface AmenityWithAvailability extends Amenity {
  available: boolean;
}

export const allAmenities: Amenity[] = [
  // Basic amenities
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi, category: 'basic' },
  { id: 'parking', name: 'Parking', icon: ParkingSquare, category: 'basic' },
  
  // Comfort amenities
  { id: 'tv', name: 'TV', icon: Tv, category: 'comfort' },
  { id: 'air-conditioning', name: 'Air Conditioning', icon: AirVent, category: 'comfort' },
  { id: 'fan', name: 'Fan', icon: Fan, category: 'comfort' },
  
  // Kitchen amenities
  { id: 'coffee-maker', name: 'Coffee Maker', icon: Coffee, category: 'kitchen' },
  { id: 'kitchen', name: 'Kitchen', icon: Utensils, category: 'kitchen' },
  { id: 'microwave', name: 'Microwave', icon: Microwave, category: 'kitchen' },
  { id: 'refrigerator', name: 'Refrigerator', icon: Refrigerator, category: 'kitchen' },
  
  // Laundry amenities
  { id: 'WashingMachine', name: 'WashingMachine', icon: WashingMachine, category: 'kitchen' },
  { id: 'dryer', name: 'Dryer', icon: AudioWaveform , category: 'kitchen' },
  
  // Outdoor amenities
  { id: 'pool', name: 'Swimming Pool', icon: Waves, category: 'outdoor' },
  { id: 'gym', name: 'Gym', icon: Dumbbell, category: 'outdoor' },
  
  // Bathroom amenities
  { id: 'hot-water', name: 'Hot Water', icon: Droplets, category: 'comfort' },
];

// Helper function to get amenities for a listing
export const getListingAmenities = (listingAmenities: string[]): AmenityWithAvailability[] => {
  return allAmenities.map(amenity => ({
    ...amenity,
    available: listingAmenities.includes(amenity.id)
  }));
};

// Helper function to get amenities by category
export const getAmenitiesByCategory = (listingAmenities: string[]) => {
  const amenities = getListingAmenities(listingAmenities);
  return amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, AmenityWithAvailability[]>);
};