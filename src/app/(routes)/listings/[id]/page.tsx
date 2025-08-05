'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Heart, Share2, ArrowLeft, Home, Castle, HouseIcon } from 'lucide-react';
import ImageGallery from '@/components/shared/image-gallery';
import { dummyListings } from '@/data/listings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { SearchResultsNavbar } from '@/components/ui/search-results-navbar/page';
import Slider from 'react-slick';
import { getAmenitiesByCategory } from '@/data/amenities';


const ListingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = React.use(params); // Unwrap the params promise
  const listing = dummyListings.find(item => item.id === id);

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center">Listing not found</div>;
  }

  // Sample reviews data
  const reviews = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        joinYear: 2020
      },
      rating: 5,
      comment: 'Amazing place! The location was perfect and the host was very accommodating.',
      date: '2023-05-15',
      likes: 12,
      dislikes: 0
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        joinYear: 2019
      },
      rating: 4,
      comment: 'Great apartment, clean and comfortable. Would stay here again!',
      date: '2023-04-22',
      likes: 8,
      dislikes: 1
    }
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Slider settings for reviews
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Property type icon
  const propertyTypeIcon = () => {
    switch(listing.propertyType) {
      case 'house': return <Home className="h-5 w-5 mr-2" />;
      case 'villa': return <Castle className="h-5 w-5 mr-2" />;
      case 'apartment': return <HouseIcon className="h-5 w-5 mr-2" />;
      default: return <Home className="h-5 w-5 mr-2" />;
    }
  };

  // Get categorized amenities with availability status
  const categorizedAmenities = getAmenitiesByCategory(listing.amenities);

  return (
    <div className="min-h-screen bg-white">
      <SearchResultsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex cursor-pointer items-center text-green-600 hover:text-green-700 mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to results
        </button>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="lg:w-2/3">
            {/* Title and basic info */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                {propertyTypeIcon()}
                <span className="text-sm text-gray-600 capitalize">{listing.propertyType}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span>{averageRating.toFixed(1)} · {reviews.length} reviews</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <ImageGallery images={listing.images} />
            </div>

            {/* About section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 mb-6">
                Welcome to our beautiful property located in the heart of {listing.sublocation}. 
                This {listing.propertyType} offers a perfect blend of comfort and convenience, 
                with modern amenities and easy access to local attractions.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              {Object.entries(categorizedAmenities).map(([category, amenities]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-medium text-lg mb-3 capitalize">{category} Amenities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <amenity.icon className={`h-5 w-5 mr-2 ${amenity.available ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={amenity.available ? "text-gray-700" : "text-gray-400"}>
                          {amenity.name}
                          {!amenity.available && <span className="text-xs text-gray-400 ml-1">(Not available)</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-1" />
                  <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">{reviews.length} reviews</span>
              </div>
              
              <Slider {...sliderSettings} className="mb-8">
                {reviews.map(review => (
                  <div key={review.id} className="px-2">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <Image
                          src={review.user.image}
                          alt={review.user.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <p className="text-gray-500 text-sm">
                            Joined in {review.user.joinYear} · {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      
                      <div className="flex items-center text-gray-500 space-x-4">
                        <button className="flex items-center hover:text-gray-700">
                          <span className="mr-1">👍</span>
                          <span>{review.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-gray-700">
                          <span className="mr-1">👎</span>
                          <span>{review.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right column - Booking card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 border rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-2xl font-bold">${listing.price}<span className="text-base font-normal text-gray-500"> / night</span></p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{averageRating.toFixed(1)} · {reviews.length} reviews</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors mb-6">
                Book Now
              </button>
              
              <p className="text-center text-gray-500 text-sm mb-6">
                You won&apos;t be charged yet
              </p>
              
                {listing.accommodates && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-4 text-lg">Accommodates</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          {listing.accommodates.tables !== undefined && (
                            <tr className="border-b">
                              <td className="py-3 px-4 text-gray-700">Tables</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.accommodates.tables}</td>
                            </tr>
                          )}
                          {listing.accommodates.inLounge !== undefined && (
                            <tr className="border-b">
                              <td className="py-3 px-4 text-gray-700">In Lounge</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.accommodates.inLounge}</td>
                            </tr>
                          )}
                          {listing.accommodates.maximumTotal !== undefined && (
                            <tr className="border-b">
                              <td className="py-3 px-4 text-gray-700">Maximum Total</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.accommodates.maximumTotal}</td>
                            </tr>
                          )}
                          {listing.accommodates.squareFeet !== undefined && (
                            <tr>
                              <td className="py-3 px-4 text-gray-700">Sq. Ft</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.accommodates.squareFeet}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Opening Hours - Only show if data exists */}
                {listing.openingHours && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-4 text-lg">Opening Hours</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          {listing.openingHours.weekdays && (
                            <tr className="border-b">
                              <td className="py-3 px-4 text-gray-700">Mon - Fri</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.openingHours.weekdays}</td>
                            </tr>
                          )}
                          {listing.openingHours.saturday && (
                            <tr className="border-b">
                              <td className="py-3 px-4 text-gray-700">Sat</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.openingHours.saturday}</td>
                            </tr>
                          )}
                          {listing.openingHours.sunday && (
                            <tr>
                              <td className="py-3 px-4 text-gray-700">Sun</td>
                              <td className="py-3 px-4 text-right font-medium">{listing.openingHours.sunday}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              
              {/* Quick amenities overview */}
              <div>
                <h4 className="font-medium mb-2 text-lg">Key Amenities</h4>
                <div className="space-y-2">
                  {Object.values(categorizedAmenities)
                    .flat()
                    .filter(amenity => amenity.available)
                    .slice(0, 5)
                    .map(amenity => (
                      <div key={amenity.id} className="flex items-center">
                        <amenity.icon className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;