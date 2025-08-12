'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, Flag } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  format: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const countries: Country[] = [
  {
    code: 'RW',
    name: 'Rwanda',
    dialCode: '+250',
    flag: '🇷🇼',
    format: '9 digits'
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flag: '🇰🇪',
    format: '9 digits'
  },
  {
    code: 'UG',
    name: 'Uganda',
    dialCode: '+256',
    flag: '🇺🇬',
    format: '9 digits'
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    dialCode: '+255',
    flag: '🇹🇿',
    format: '9 digits'
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    dialCode: '+251',
    flag: '🇪🇹',
    format: '9 digits'
  },
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    format: '10 digits'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    format: '10-11 digits'
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    format: '10 digits'
  }
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Phone number",
  className = "",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Initialize with current value if it exists
    if (value) {
      const country = countries.find(c => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.replace(country.dialCode, ''));
      }
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    const newValue = country.dialCode + phoneNumber;
    onChange(newValue);
    setIsOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove any non-digit characters except the first + if it's the country code
    input = input.replace(/[^\d]/g, '');
    
    // For Rwanda, ensure exactly 9 digits
    if (selectedCountry.code === 'RW') {
      input = input.slice(0, 9);
    }
    
    setPhoneNumber(input);
    const newValue = selectedCountry.dialCode + input;
    onChange(newValue);
  };

  const validatePhoneNumber = (): string | undefined => {
    if (required && !phoneNumber) {
      return 'Phone number is required';
    }
    
    if (phoneNumber) {
      if (selectedCountry.code === 'RW') {
        if (phoneNumber.length !== 9) {
          return 'Rwanda phone number must be exactly 9 digits';
        }
        if (!/^[0-9]+$/.test(phoneNumber)) {
          return 'Phone number must contain only digits';
        }
        // Check if it starts with valid Rwanda prefixes
        const validPrefixes = ['7', '8', '9'];
        if (!validPrefixes.includes(phoneNumber[0])) {
          return 'Rwanda phone number must start with 7, 8, or 9';
        }
      } else {
        if (phoneNumber.length < 8) {
          return 'Phone number is too short';
        }
        if (phoneNumber.length > 15) {
          return 'Phone number is too long';
        }
      }
    }
    
    return undefined;
  };

  const currentError = error || validatePhoneNumber();

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <span className="mr-2 text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
            <ChevronDown className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Country Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                >
                  <span className="mr-3 text-lg">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{country.name}</div>
                    <div className="text-sm text-gray-500">{country.dialCode} • {country.format}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Phone Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
            currentError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
          }`}
        />
      </div>
      
      {/* Error Message */}
      {currentError && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <Flag className="h-4 w-4 mr-1" />
          {currentError}
        </p>
      )}
      
      {/* Format Hint */}
      <p className="mt-1 text-xs text-gray-500">
        Format: {selectedCountry.dialCode} {selectedCountry.format}
      </p>
    </div>
  );
};
