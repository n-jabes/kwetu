'use client'
import { Footer } from '@/components/ui/footer/page';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import { MapPin, Home, Mountain, Castle } from 'lucide-react';

const HomePage = () => {
const popularCities = [
{ name: 'Kigali', country: 'Rwanda' },
{ name: 'Huye', country: 'Rwanda' },
{ name: 'Musanze', country: 'Rwanda' },
{ name: 'Gisenyi', country: 'Rwanda' },
];

const propertyTypes = [
{ name: 'Apartments', icon: <Home className="h-6 w-6" /> },
{ name: 'Villas', icon: <Castle className="h-6 w-6" /> },
{ name: 'Traditional Homes', icon: <Home className="h-6 w-6" /> },
{ name: 'City Homes', icon: <Home className="h-6 w-6" /> },
{ name: 'Mountain Houses', icon: <Mountain className="h-6 w-6" /> },
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

return (
<div className="min-h-screen bg-white">
<SearchResultsNavbar />

  {/* Hero Section */}
  <section className="relative bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Discover Your Perfect Stay in East Africa
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore a curated selection of homes for long-term rentals in the heart of East Africa
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Where to?"
            className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <MapPin className="h-6 w-6 text-gray-400" />
          </div>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* Featured Listings */}
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Listings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Modern House in Kigali', location: 'Kigali, Rwanda' },
          { title: 'Apartment in Huye', location: 'Huye, Rwanda' },
          { title: 'Luxury Villa in Musanze', location: 'Musanze, Rwanda' },
          { title: 'Traditional Home in Olsen', location: 'Olsenyi, Rwanda' },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{item.location}</span>
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
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {popularCities.map((city, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
            <p className="text-gray-600 text-sm">{city.country}</p>
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
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3 text-green-500">
              {type.icon}
            </div>
            <h3 className="font-semibold">{type.name}</h3>
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
