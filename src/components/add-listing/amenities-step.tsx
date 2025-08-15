'use client'
import React from 'react';
import { Shield, Wifi, Car, Utensils, Snowflake, Dumbbell, Coffee, Info } from 'lucide-react';

interface AmenitiesStepProps {
  formData: {
    amenities: string[];
  };
  updateFormData: (updates: { amenities: string[] }) => void;
  errors: { [key: string]: string };
}

const amenityCategories = [
  { id: 'basic', name: 'Basic', icon: Shield, color: 'from-blue-500 to-blue-600' },
  { id: 'internet', name: 'Internet & Tech', icon: Wifi, color: 'from-purple-500 to-purple-600' },
  { id: 'parking', name: 'Parking & Transport', icon: Car, color: 'from-green-500 to-green-600' },
  { id: 'kitchen', name: 'Kitchen & Dining', icon: Utensils, color: 'from-orange-500 to-orange-600' },
  { id: 'comfort', name: 'Comfort & Climate', icon: Snowflake, color: 'from-cyan-500 to-cyan-600' },
  { id: 'fitness', name: 'Fitness & Recreation', icon: Dumbbell, color: 'from-red-500 to-red-600' },
  { id: 'business', name: 'Business & Work', icon: Coffee, color: 'from-indigo-500 to-indigo-600' }
];

const allAmenities = [
  // Basic
  { id: 'essentials', name: 'Essentials', category: 'basic', description: 'Towels, bed sheets, soap, and toilet paper' },
  { id: 'heating', name: 'Heating', category: 'basic', description: 'Central heating or a heater in the listing' },
  { id: 'air_conditioning', name: 'Air conditioning', category: 'basic', description: 'Central air conditioning or AC unit' },
  { id: 'washer', name: 'Washer', category: 'basic', description: 'In-unit washer or shared laundry room' },
  { id: 'dryer', name: 'Dryer', category: 'basic', description: 'In-unit dryer or shared dryer' },
  { id: 'dedicated_workspace', name: 'Dedicated workspace', category: 'basic', description: 'A table or desk with a chair and space for a laptop' },
  
  // Internet & Tech
  { id: 'wifi', name: 'Wifi', category: 'internet', description: 'Fast wifi – 100+ Mbps download and dedicated workspace' },
  { id: 'tv', name: 'TV', category: 'internet', description: 'TV with standard cable' },
  { id: 'netflix', name: 'Netflix', category: 'internet', description: 'Netflix subscription' },
  { id: 'amazon_prime', name: 'Amazon Prime Video', category: 'internet', description: 'Amazon Prime Video subscription' },
  { id: 'disney_plus', name: 'Disney+', category: 'internet', description: 'Disney+ subscription' },
  { id: 'hbo_max', name: 'HBO Max', category: 'internet', description: 'HBO Max subscription' },
  
  // Parking & Transport
  { id: 'free_parking', name: 'Free parking on premises', category: 'parking', description: 'Free parking for guests' },
  { id: 'paid_parking', name: 'Paid parking on premises', category: 'parking', description: 'Paid parking available' },
  { id: 'street_parking', name: 'Free street parking', category: 'parking', description: 'Free parking on the street' },
  { id: 'bike_parking', name: 'Bike parking', category: 'parking', description: 'Secure bike storage' },
  { id: 'ev_charger', name: 'EV charger', category: 'parking', description: 'Electric vehicle charging station' },
  
  // Kitchen & Dining
  { id: 'kitchen', name: 'Kitchen', category: 'kitchen', description: 'Space where guests can cook their own meals' },
  { id: 'refrigerator', name: 'Refrigerator', category: 'kitchen', description: 'Refrigerator available for guest use' },
  { id: 'microwave', name: 'Microwave', category: 'kitchen', description: 'Microwave oven' },
  { id: 'stove', name: 'Stove', category: 'kitchen', description: 'Gas or electric stove' },
  { id: 'oven', name: 'Oven', category: 'kitchen', description: 'Full-size oven for cooking' },
  { id: 'dishwasher', name: 'Dishwasher', category: 'kitchen', description: 'Dishwasher for easy cleanup' },
  { id: 'coffee_maker', name: 'Coffee maker', category: 'kitchen', description: 'Coffee machine or coffee maker' },
  { id: 'wine_glasses', name: 'Wine glasses', category: 'kitchen', description: 'Wine glasses for guests' },
  
  // Comfort & Climate
  { id: 'ceiling_fan', name: 'Ceiling fan', category: 'comfort', description: 'Ceiling fan for air circulation' },
  { id: 'fireplace', name: 'Fireplace', category: 'comfort', description: 'Indoor fireplace' },
  { id: 'balcony', name: 'Balcony', category: 'comfort', description: 'Private balcony or terrace' },
  { id: 'garden', name: 'Garden view', category: 'comfort', description: 'View of a garden or green space' },
  { id: 'mountain_view', name: 'Mountain view', category: 'comfort', description: 'View of mountains or hills' },
  { id: 'city_view', name: 'City view', category: 'comfort', description: 'View of the city skyline' },
  
  // Fitness & Recreation
  { id: 'gym', name: 'Gym', category: 'fitness', description: 'Access to a gym or fitness center' },
  { id: 'pool', name: 'Pool', category: 'fitness', description: 'Swimming pool available' },
  { id: 'hot_tub', name: 'Hot tub', category: 'fitness', description: 'Private hot tub or jacuzzi' },
  { id: 'sauna', name: 'Sauna', category: 'fitness', description: 'Private sauna' },
  { id: 'tennis_court', name: 'Tennis court', category: 'fitness', description: 'Tennis court access' },
  { id: 'basketball_court', name: 'Basketball court', category: 'fitness', description: 'Basketball court access' },
  
  // Business & Work
  { id: 'printer', name: 'Printer', category: 'business', description: 'Printer available for guest use' },
  { id: 'fax_machine', name: 'Fax machine', category: 'business', description: 'Fax machine available' },
  { id: 'projector', name: 'Projector', category: 'business', description: 'Projector for presentations' },
  { id: 'whiteboard', name: 'Whiteboard', category: 'business', description: 'Whiteboard for meetings' },
  { id: 'conference_room', name: 'Conference room', category: 'business', description: 'Private conference room' }
];

export const AmenitiesStep: React.FC<AmenitiesStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = formData.amenities;
    if (currentAmenities.includes(amenityId)) {
      updateFormData({ amenities: currentAmenities.filter(id => id !== amenityId) });
    } else {
      updateFormData({ amenities: [...currentAmenities, amenityId] });
    }
  };

  const getAmenitiesByCategory = (categoryId: string) => {
    return allAmenities.filter(amenity => amenity.category === categoryId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What amenities do you offer?
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Select all the amenities available at your property to help guests know what to expect.
        </p>
      </div>

      {/* Amenities Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Available Amenities <span className="text-red-500">*</span>
        </h3>
        
        {amenityCategories.map((category) => {
          const categoryAmenities = getAmenitiesByCategory(category.id);
          const IconComponent = category.icon;
          
          return (
            <div key={category.id} className="mb-8">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mr-3`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryAmenities.map((amenity) => (
                  <label
                    key={amenity.id}
                    className={`flex items-start p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      formData.amenities.includes(amenity.id)
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900 mb-1">{amenity.name}</div>
                      <div className="text-sm text-gray-600">{amenity.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        
        {errors.amenities && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {errors.amenities}
          </p>
        )}
      </div>

      {/* Selected Amenities Summary */}
      {formData.amenities.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-green-900">
              Selected Amenities ({formData.amenities.length})
            </h4>
            <button
              onClick={() => updateFormData({ amenities: [] })}
              className="text-green-600 hover:text-green-700 text-sm underline cursor-pointer"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenityId) => {
              const amenity = allAmenities.find(a => a.id === amenityId);
              return amenity ? (
                <span
                  key={amenityId}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {amenity.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Amenities Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Select all amenities that are actually available at your property</li>
              <li>• Be honest about what you offer to avoid guest disappointment</li>
              <li>• Consider adding unique amenities that set your property apart</li>
              <li>• You can always update amenities later if you add new features</li>
              <li>• Essential amenities like WiFi and heating are highly valued by guests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
