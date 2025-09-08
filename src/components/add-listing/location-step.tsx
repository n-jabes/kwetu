'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { rwandaProvinces } from '@/utils/rwanda-administrative';

// Extend Window interface to include Google Maps
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

interface LocationStepProps {
  formData: {
    country: string;
    city: string;
    district: string;
    sector: string;
    cell: string;
    streetAddress: string;
    latitude: number | null;
    longitude: number | null;
  };
  updateFormData: (updates: Partial<{
    country: string;
    city: string;
    district: string;
    sector: string;
    cell: string;
    streetAddress: string;
    latitude: number | null;
    longitude: number | null;
  }>) => void;
  errors: { [key: string]: string };
}

const countries = [
  { id: 'Rwanda', name: 'Rwanda', flag: '🇷🇼' },
  { id: 'Kenya', name: 'Kenya', flag: '🇰🇪' },
  { id: 'Uganda', name: 'Uganda', flag: '🇺🇬' },
  { id: 'Tanzania', name: 'Tanzania', flag: '🇹🇿' },
  { id: 'Ethiopia', name: 'Ethiopia', flag: '🇪🇹' },
  { id: 'Other', name: 'Other', flag: '🌍' }
];





export const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showManualInputs, setShowManualInputs] = useState(false);
  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const mapInstanceRef = useRef<{ setCenter: (position: { lat: number; lng: number }) => void } | null>(null);
  const markerRef = useRef<{ 
    setPosition: (position: { lat: number; lng: number }) => void; 
    setMap: (map: unknown) => void;
    addListener: (event: string, callback: (event: { latLng?: { lat: () => number; lng: () => number } }) => void) => void;
  } | null>(null);
  const scriptLoadingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if script is already loaded or loading
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        // Script is already loading, wait for it
        setIsLoadingScript(true);
        scriptLoadingIntervalRef.current = setInterval(() => {
          if (window.google && window.google.maps) {
            setMapLoaded(true);
            setIsLoadingScript(false);
            if (scriptLoadingIntervalRef.current) {
              clearInterval(scriptLoadingIntervalRef.current);
              scriptLoadingIntervalRef.current = null;
            }
          }
        }, 100);
        return;
      }

      // Only load if not already loading
      if (isLoadingScript) return;

      setIsLoadingScript(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setMapLoaded(true);
        setMapError(null);
        setIsLoadingScript(false);
      };
      
      script.onerror = () => {
        setMapError('Failed to load Google Maps. Please use manual coordinate inputs below.');
        setShowManualInputs(true);
        setIsLoadingScript(false);
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    // Cleanup function
    return () => {
      if (scriptLoadingIntervalRef.current) {
        clearInterval(scriptLoadingIntervalRef.current);
        scriptLoadingIntervalRef.current = null;
      }
    };
  }, [isLoadingScript]);

  // Initialize map when script is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !window.google) return;

    try {
      // Use existing coordinates if available, otherwise default to Kigali
      const initialCenter = (formData.latitude && formData.longitude) 
        ? { lat: formData.latitude, lng: formData.longitude }
        : { lat: -1.9441, lng: 30.0619 }; // Kigali coordinates

      const initialZoom = (formData.latitude && formData.longitude) ? 15 : 12;

      const map = new window.google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add click listener to map
      map.addListener('click', (event: { latLng?: { lat: () => number; lng: () => number } }) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        
        if (lat && lng) {
          updateFormData({ latitude: lat, longitude: lng });
          
          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
          } else {
            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              draggable: true,
              title: 'Property Location'
            });
            
            // Add drag listener to marker
            if (markerRef.current) {
              markerRef.current.addListener('dragend', (dragEvent: { latLng?: { lat: () => number; lng: () => number } }) => {
                const dragLat = dragEvent.latLng?.lat();
                const dragLng = dragEvent.latLng?.lng();
                if (dragLat && dragLng) {
                  updateFormData({ latitude: dragLat, longitude: dragLng });
                }
              });
            }
          }
        }
      });

      // If coordinates exist, show marker
      if (formData.latitude && formData.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: formData.latitude, lng: formData.longitude },
          map: map,
          draggable: true,
          title: 'Property Location',
          animation: window.google.maps.Animation.DROP
        });
        markerRef.current = marker;
        
        // Add drag listener to marker
        marker.addListener('dragend', (dragEvent: { latLng?: { lat: () => number; lng: () => number } }) => {
          const dragLat = dragEvent.latLng?.lat();
          const dragLng = dragEvent.latLng?.lng();
          if (dragLat && dragLng) {
            updateFormData({ latitude: dragLat, longitude: dragLng });
          }
        });
        
        // Center map on marker (already handled in initialCenter above)
        // map.setCenter({ lat: formData.latitude, lng: formData.longitude });
      }

    } catch {
      setMapError('Failed to initialize map. Please use manual coordinate inputs below.');
      setShowManualInputs(true);
    }
  }, [mapLoaded, formData.latitude, formData.longitude, updateFormData]);


  const safeFormData = {
    country: formData.country || '',
    city: formData.city || '',
    district: formData.district || '',
    sector: formData.sector || '',
    cell: formData.cell || '',
    streetAddress: formData.streetAddress || '',
    latitude: formData.latitude || null,
    longitude: formData.longitude || null
  };

  const safeErrors = errors || {};

  const getSectors = useCallback(() => {
    const selectedProvince = rwandaProvinces.find(p => p.name === safeFormData.district);
    const selectedDistrict = selectedProvince?.districts?.find(d => d.name === safeFormData.city);
    return selectedDistrict?.sectors?.map(sector => sector.name) || [];
  }, [safeFormData.district, safeFormData.city]);

  const getCells = useCallback(() => {
    const selectedProvince = rwandaProvinces.find(p => p.name === safeFormData.district);
    const selectedDistrict = selectedProvince?.districts?.find(d => d.name === safeFormData.city);
    const selectedSector = selectedDistrict?.sectors?.find(s => s.name === safeFormData.sector);
    return selectedSector?.cells || [];
  }, [safeFormData.district, safeFormData.city, safeFormData.sector]);

  // Validation effect to ensure selected values are still valid
  useEffect(() => {
    if (safeFormData.country === 'Rwanda') {
      // Check if selected district exists in selected province
      if (safeFormData.district && safeFormData.city) {
        const selectedProvince = rwandaProvinces.find(p => p.name === safeFormData.district);
        const districtExists = selectedProvince?.districts?.some(d => d.name === safeFormData.city);
        if (!districtExists && safeFormData.city) {
          updateFormData({ city: '', sector: '', cell: '' });
        }
      }

      // Check if selected sector exists in selected district
      if (safeFormData.city && safeFormData.sector) {
        const availableSectors = getSectors();
        if (!availableSectors.includes(safeFormData.sector)) {
          updateFormData({ sector: '', cell: '' });
        }
      }

      // Check if selected cell exists in selected sector
      if (safeFormData.sector && safeFormData.cell) {
        const availableCells = getCells();
        if (!availableCells.includes(safeFormData.cell)) {
          updateFormData({ cell: '' });
        }
      }
    }
  }, [safeFormData.district, safeFormData.city, safeFormData.sector, safeFormData.cell, safeFormData.country, updateFormData, getSectors, getCells]);

  const handleProvinceChange = (provinceId: string) => {
    updateFormData({ 
      district: provinceId,
      city: '',
      sector: '',
      cell: ''
    });
  };

  const handleDistrictChange = (districtId: string) => {
    updateFormData({ 
      city: districtId,
      sector: '',
      cell: ''
    });
  };

  const handleSectorChange = (sectorId: string) => {
    updateFormData({ 
      sector: sectorId,
      cell: ''
    });
  };

  if (!safeFormData.country) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-yellow-600 text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Missing location data</h3>
        <p className="text-gray-600 mb-4">Required location information is missing.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
        >
          Refresh Page
        </button>
      </div>
    );
  }



  const handleManualCoordinateChange = (field: 'latitude' | 'longitude', value: string) => {
    const numValue = parseFloat(value) || null;
    updateFormData({ [field]: numValue });
    
    // Update marker position if both coordinates are available
    if (field === 'latitude' && safeFormData.longitude && numValue) {
      updateMarkerPosition(numValue, safeFormData.longitude);
    } else if (field === 'longitude' && safeFormData.latitude && numValue) {
      updateMarkerPosition(safeFormData.latitude, numValue);
    }
  };

  const updateMarkerPosition = (lat: number, lng: number) => {
    if (markerRef.current && mapInstanceRef.current) {
      const newPosition = { lat, lng };
      markerRef.current.setPosition(newPosition);
      mapInstanceRef.current.setCenter(newPosition);
    }
  };

  const clearLocation = () => {
    updateFormData({ latitude: null, longitude: null });
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Where is your property located?
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Help guests find your property easily by providing accurate location details.
        </p>
      </div>

      {/* Country Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Country <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => updateFormData({ 
                country: country.id,
                district: '',
                city: '',
                sector: '',
                cell: '',
                streetAddress: ''
              })}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                safeFormData.country === country.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{country.flag}</div>
              <div className="font-medium text-gray-900">{country.name}</div>
            </button>
          ))}
        </div>
        {safeErrors.country && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {safeErrors.country}
          </p>
        )}
      </div>

      {/* Rwanda-specific fields */}
      {safeFormData.country === 'Rwanda' && (
        <div className="space-y-4">
          {/* Province Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Province <span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rwandaProvinces.map((province) => (
                <button
                  key={province.name}
                  onClick={() => handleProvinceChange(province.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                    safeFormData.district === province.name
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium text-gray-900">{province.name}</div>
                </button>
              ))}
            </div>
            {safeErrors.district && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {safeErrors.district}
              </p>
            )}
          </div>

          {/* District Selection */}
          {safeFormData.district && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                District <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(() => {
                  const selectedProvince = rwandaProvinces.find(p => p.name === safeFormData.district);
                  return selectedProvince?.districts?.map((district) => (
                    <button
                      key={district.name}
                      onClick={() => handleDistrictChange(district.name)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                        safeFormData.city === district.name
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{district.name}</div>
                    </button>
                  )) || [];
                })()}
              </div>
              {safeErrors.city && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {safeErrors.city}
                </p>
              )}
            </div>
          )}

          {/* Sector Selection */}
          {safeFormData.city && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Sector <span className="text-red-500">*</span>
              </h3>
              <select
                value={safeFormData.sector}
                onChange={(e) => handleSectorChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="">Select a sector</option>
                {getSectors().map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
              {safeErrors.sector && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {safeErrors.sector}
                </p>
              )}
            </div>
          )}

          {/* Cell Selection */}
          {safeFormData.sector && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Cell <span className="text-red-500">*</span>
              </h3>
              <select
                value={safeFormData.cell}
                onChange={(e) => updateFormData({ cell: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="">Select a cell</option>
                {getCells().map((cell) => (
                  <option key={cell} value={cell}>{cell}</option>
                ))}
              </select>
              {safeErrors.cell && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {safeErrors.cell}
                </p>
              )}
            </div>
          )}


        </div>
      )}

      {/* Street Address - Required for non-Rwanda countries */}
      {safeFormData.country !== 'Rwanda' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Street Address <span className="text-red-500">*</span>
          </h3>
          <input
            type="text"
            value={safeFormData.streetAddress}
            onChange={(e) => updateFormData({ streetAddress: e.target.value })}
            placeholder="Enter your street address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          />
          {safeErrors.streetAddress && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {safeErrors.streetAddress}
            </p>
          )}
        </div>
      )}

      {/* Map Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Set Property Location <span className="text-red-500">*</span>
        </h3>
        <p className="text-gray-600 mb-4">
          Use the interactive map below or enter coordinates manually. Click on the map to set your property location.
        </p>
        
        {mapError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{mapError}</span>
            </div>
          </div>
        )}

        {!mapLoaded && !mapError && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isLoadingScript ? 'Loading Google Maps...' : 'Loading map...'}
            </p>
            <button
              onClick={() => setShowManualInputs(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 underline cursor-pointer"
            >
              Or enter coordinates manually
            </button>
          </div>
        )}

        <div 
          ref={mapRef} 
          className="w-full h-64 sm:h-72 md:h-80 rounded-lg border border-gray-300 overflow-hidden cursor-crosshair"
        />

          {/* Manual Coordinate Inputs */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-md font-medium text-gray-900">Coordinates</h4>
              {safeFormData.latitude && safeFormData.longitude && (
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Location set: {safeFormData.latitude.toFixed(6)}, {safeFormData.longitude.toFixed(6)}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowManualInputs(!showManualInputs)}
              className="text-blue-600 hover:text-blue-700 text-sm underline cursor-pointer"
            >
              {showManualInputs ? 'Hide' : 'Show'} manual inputs
            </button>
          </div>
          
          {showManualInputs && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.000001"
                  min="-90"
                  max="90"
                  value={safeFormData.latitude || ''}
                  onChange={(e) => handleManualCoordinateChange('latitude', e.target.value)}
                  placeholder="e.g., -1.9441"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter latitude between -90 and 90 (e.g., -1.9441 for Kigali)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.000001"
                  min="-180"
                  max="180"
                  value={safeFormData.longitude || ''}
                  onChange={(e) => handleManualCoordinateChange('longitude', e.target.value)}
                  placeholder="e.g., 30.0619"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter longitude between -180 and 180 (e.g., 30.0619 for Kigali)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Coordinates Error */}
        {safeErrors.coordinates && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {safeErrors.coordinates}
          </p>
        )}

        {/* Coordinates Display */}
        {safeFormData.latitude && safeFormData.longitude && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Latitude:</span>
                  <span className="ml-2 font-mono text-green-700">{safeFormData.latitude.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Longitude:</span>
                  <span className="ml-2 font-mono text-green-700">{safeFormData.longitude.toFixed(6)}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={clearLocation}
                  className="flex items-center justify-center px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Clear Location
                </button>
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          updateFormData({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                          });
                        },
                        (error) => {
                          console.error('Error getting location:', error);
                        }
                      );
                    }
                  }}
                  className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Location Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• For Rwanda properties, fill in all administrative divisions for better discoverability</li>
              <li>• Set precise coordinates on the map or enter them manually</li>
              <li>• You can use your current location or manually set the coordinates</li>
              <li>• Common coordinates: Kigali (-1.9441, 30.0619), Nairobi (-1.2921, 36.8219)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
