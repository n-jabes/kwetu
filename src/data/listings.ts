import { Listing } from "@/types";

// Dummy data
export const dummyListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Apartment in Westlands',
    location: 'Westlands, Nairobi',
    sublocation: 'Westlands',
    price: 85,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    propertyType: 'apartment',
    amenities: ['Wi-Fi', 'Parking']
  },
  {
    id: '2',
    title: 'Luxury Villa in Karen',
    location: 'Karen, Nairobi',
    sublocation: 'Karen',
    price: 250,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    propertyType: 'villa',
    amenities: ['Wi-Fi', 'Swimming Pool', 'Parking', 'Gym']
  },
  {
    id: '3',
    title: 'Modern House in Lavington',
    location: 'Lavington, Nairobi',
    sublocation: 'Lavington',
    price: 180,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    propertyType: 'house',
    amenities: ['Wi-Fi', 'Parking', 'Gym']
  },
  {
    id: '4',
    title: 'Spacious Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    sublocation: 'Kilimani',
    price: 120,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'apartment',
    amenities: ['Wi-Fi', 'Parking']
  },
  {
    id: '5',
    title: 'Elegant Villa in Muthaiga',
    location: 'Muthaiga, Nairobi',
    sublocation: 'Muthaiga',
    price: 300,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    propertyType: 'villa',
    amenities: ['Wi-Fi', 'Swimming Pool', 'Parking', 'Gym']
  }
];