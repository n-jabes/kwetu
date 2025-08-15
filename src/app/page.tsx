'use client'
import React, { useState } from 'react';
import { MapPin, Home, Mountain, Castle, Loader2, Star, Shield, CreditCard, Lock, InstagramIcon, TwitterIcon, FacebookIcon, YoutubeIcon } from 'lucide-react';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Featured listings with better structure
  const featuredListings = [
    {
      id: '1',
      title: 'Modern House in Kigali',
      location: 'Kigali, Rwanda',
      sublocation: 'Kigali',
      price: 120,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop&crop=center',
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
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop&crop=center',
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
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=400&fit=crop&crop=center',
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
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop&crop=center',
      propertyType: 'traditional',
      amenities: ['Wi-Fi', 'Garden']
    }
  ];

  const popularCities = [
    { 
      name: 'Kigali', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Huye', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Musanze', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Gisenyi', 
      country: 'Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=400&fit=crop&crop=center'
    },
  ];

  const propertyTypes = [
    { 
      name: 'Apartments', 
      icon: <Home className="h-8 w-8" />,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Villas', 
      icon: <Castle className="h-8 w-8" />,
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Traditional Homes', 
      icon: <Home className="h-8 w-8" />,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&crop=center'
    },
    { 
      name: 'City Homes', 
      icon: <Home className="h-8 w-8" />,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop&crop=center'
    },
    { 
      name: 'Mountain Houses', 
      icon: <Mountain className="h-8 w-8" />,
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop&crop=center'
    },
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'Trusted Homes',
      description: 'Verified listings and reliable hosts ensure a safe and comfortable stay.'
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-500" />,
      title: 'Local Focus',
      description: 'Discover authentic East African experiences with homes in prime locations.'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: 'Flexible Payment Options',
      description: 'Choose from a variety of payment methods to suit your needs.'
    },
    {
      icon: <Lock className="h-8 w-8 text-green-500" />,
      title: 'Secure Transactions',
      description: 'Your financial information is protected with our secure payment gateway.'
    }
  ];

  const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Simulate navigation
      console.log(`Searching for: ${searchQuery}`);
    }, 1000);
     router.push('/search-results');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <SearchResultsNavbar />
      
      {/* Hero Section */}
     <section className="relative h-[90vh] flex items-center justify-center bg-black">
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&h=800&fit=crop&crop=center')` }}
  />
  <div className="absolute inset-0 bg-black/50" />
  
  <div className="relative z-10 text-center max-w-2xl px-4">
    <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
      Discover Stylish Homes Across East Africa
    </h1>
    <p className="text-gray-200 text-lg sm:text-xl mb-6 leading-relaxed">
      Live like a local — long-term stays, flexible payments, and beautiful spaces.
    </p>

    {/* Updated Search */}
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-4 py-2">
        <MapPin className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-5 py-2 rounded-full flex items-center transition cursor-pointer"
        >
          {isSearching ? <Loader2 className="animate-spin w-4 h-4" /> : 'Search'}
        </button>
      </div>
    </div>
  </div>
</section>


      {/* Featured Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Featured Listings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{listing.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Popular Cities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCities.map((city, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-bold text-xl text-white mb-1">{city.name}</h3>
                    <p className="text-gray-200 text-sm">{city.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KWETU */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose KWETU?</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Comfort, Our Priority</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the best of East African hospitality with KWETU&apos;s commitment to quality and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore By Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Explore By Style</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {propertyTypes.map((type, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={type.imageUrl}
                    alt={type.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white mb-2">
                      {type.icon}
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Host */}
      <section className="py-20 bg-[var(--main-green)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Become a Host</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Earn income by listing your property on KWETU and connecting with long-term renters.
          </p>
                  <Link href="/add-listing" className="bg-white text-green-500 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors hover:shadow-lg inline-block">
          List Your Property
        </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
      {[
        { title: "Company", items: ["About", "Blog", "Careers", "Press"] },
        { title: "Support", items: ["Help Center", "Cancellation Options", "Privacy Policy", "Terms"] },
        { title: "Community", items: ["KWETU Guests", "Hosts", "Affiliates"] },
        { title: "More", items: ["Become a Host", "Payment Options", "Gift Cards"] }
      ].map((section, idx) => (
        <div key={idx}>
          <h4 className="text-white font-semibold text-lg mb-4">{section.title}</h4>
          <ul className="space-y-2 text-sm">
            {section.items.map((item, i) => (
              <li key={i} className="hover:text-white cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm">
      <p className="mb-4 sm:mb-0">© 2024 KWETU. All rights reserved.</p>
      <div className="flex space-x-4">
        <div className="p-2 flex items-center justify-center bg-gray-700 rounded-full hover:bg-green-500 transition cursor-pointer">
          <InstagramIcon />
        </div>
        <div className="p-2 flex items-center justify-center bg-gray-700 rounded-full hover:bg-green-500 transition cursor-pointer">
          <TwitterIcon />
        </div>
        <div className="p-2 flex items-center justify-center bg-gray-700 rounded-full hover:bg-green-500 transition cursor-pointer">
          <FacebookIcon />
        </div>
        <div className="p-2 flex items-center justify-center bg-gray-700 rounded-full hover:bg-green-500 transition cursor-pointer">
          <YoutubeIcon />
        </div>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default HomePage;