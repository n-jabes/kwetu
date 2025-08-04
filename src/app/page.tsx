'use client'
import { Footer } from '@/components/ui/footer/page';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { MapPin, Home, Mountain, Castle, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Same dummy listings structure as in search results
  const featuredListings = [
    {
      id: '1',
      title: 'Modern House in Kigali',
      location: 'Kigali, Rwanda',
      sublocation: 'Kigali',
      price: 120,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      propertyType: 'house',
      amenities: ['Wi-Fi', 'Parking', 'Pool']
    },
    {
      id: '2',
      title: 'Luxury Apartment in Huye',
      location: 'Huye, Rwanda',
      sublocation: 'Huye',
      price: 85,
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      propertyType: 'apartment',
      amenities: ['Wi-Fi', 'Parking']
    },
    {
      id: '3',
      title: 'Villa in Musanze',
      location: 'Musanze, Rwanda',
      sublocation: 'Musanze',
      price: 200,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      propertyType: 'villa',
      amenities: ['Wi-Fi', 'Parking', 'Pool', 'Gym']
    },
    {
      id: '4',
      title: 'Traditional Home in Gisenyi',
      location: 'Gisenyi, Rwanda',
      sublocation: 'Gisenyi',
      price: 95,
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      propertyType: 'traditional',
      amenities: ['Wi-Fi', 'Garden']
    }
  ];

  const popularCities = [
    { 
      name: 'Kigali', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'Huye', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'Musanze', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'Gisenyi', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
  ];

  const propertyTypes = [
    { 
      name: 'Apartments', 
      icon: <Home className="h-6 w-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'Villas', 
      icon: <Castle className="h-6 w-6" />,
      imageUrl: '/public/images/villa.jpg'
    },
    { 
      name: 'Traditional Homes', 
      icon: <Home className="h-6 w-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'City Homes', 
      icon: <Home className="h-6 w-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    { 
      name: 'Mountain Houses', 
      icon: <Mountain className="h-6 w-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
  ];

  const features = [
    {
      title: 'Trusted Homes',
      description: 'Verified listings and reliable hosts ensure a safe and comfortable stay.'
    },
    {
      title: 'Local Focus',
      description: 'Discover authentic East African experiences with homes in prime locations.'
    },
    {
      title: 'Flexible Payment Options',
      description: 'Choose from a variety of payment methods to suit your needs.'
    },
    {
      title: 'Secure Transactions',
      description: 'Your financial information is protected with our secure payment gateway.'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      router.push(`/search-results?query=${encodeURIComponent(searchQuery)}`);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <SearchResultsNavbar />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-32 bg-gray-800">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
          alt="East Africa landscape"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Discover Your Perfect Stay in East Africa
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Explore a curated selection of homes for long-term rentals in the heart of East Africa
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Where to?"
                className="w-full text-gray-600 pl-12 pr-6 py-4 bg-gray-200 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : 'Search'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Listings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                    <div className="text-lg font-bold">
                      ${listing.price}<span className="text-sm font-normal text-gray-500">/night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Cities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
                  <p className="text-gray-600 text-sm">{city.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KWETU */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose KWETU?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Comfort, Our Priority
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Experience the best of East African hospitality with KWETU&apos;s commitment to quality and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore By Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore By Style</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {propertyTypes.map((type, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={type.imageUrl}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="flex justify-center mb-3 text-green-500">
                    {type.icon}
                  </div>
                  <h3 className="font-semibold">{type.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Host */}
      <section className="py-16 bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Become a Host</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Earn income by listing your property on KWETU and connecting with long-term renters.
          </p>
          <button className="bg-white text-green-500 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
            List Your Property
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;