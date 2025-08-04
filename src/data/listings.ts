import { Listing } from "@/types";

// Dummy data
export const dummyListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Apartment in Westlands',
    location: 'Westlands, Nairobi',
    sublocation: 'Westlands',
    price: 850,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
  ],
    propertyType: 'apartment',
    amenities: ['wifi', 'parking', 'kitchen', 'hot-water'] // Using IDs from amenities.ts
  },
  {
    id: '2',
    title: 'Luxury Villa in Karen',
    location: 'Karen, Nairobi',
    sublocation: 'Karen',
    price: 250,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'
  ],
    propertyType: 'villa',
    amenities: ['wifi', 'pool', 'parking', 'gym', 'air-conditioning', 'tv', 'coffee-maker']
  },
  {
    id: '3',
    title: 'Modern House in Lavington',
    location: 'Lavington, Nairobi',
    sublocation: 'Lavington',
    price: 180,
    rating: 4.7,
    images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'
  ],
    propertyType: 'house',
    amenities: ['wifi', 'parking', 'gym', 'kitchen', 'refrigerator']
  },
  {
    id: '4',
    title: 'Spacious Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    sublocation: 'Kilimani',
    price: 120,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
  ],
    propertyType: 'apartment',
    amenities: ['wifi', 'parking', 'microwave', 'washer']
  },
  {
    id: '5',
    title: 'Elegant Villa in Muthaiga',
    location: 'Muthaiga, Nairobi',
    sublocation: 'Muthaiga',
    price: 300,
    rating: 5.0,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'
  ],
    propertyType: 'villa',
    amenities: ['wifi', 'pool', 'parking', 'gym', 'tv', 'air-conditioning', 'coffee-maker', 'washer', 'dryer']
  }
];