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
  paymentMethod?: 'mtn' | 'airtel' | null;
}

const countries: Country[] = [
  // East Africa - Primary focus
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
    code: 'BI',
    name: 'Burundi',
    dialCode: '+257',
    flag: '🇧🇮',
    format: '8 digits'
  },
  {
    code: 'SS',
    name: 'South Sudan',
    dialCode: '+211',
    flag: '🇸🇸',
    format: '9 digits'
  },
  {
    code: 'SO',
    name: 'Somalia',
    dialCode: '+252',
    flag: '🇸🇴',
    format: '8-9 digits'
  },
  {
    code: 'DJ',
    name: 'Djibouti',
    dialCode: '+253',
    flag: '🇩🇯',
    format: '8 digits'
  },
  {
    code: 'ER',
    name: 'Eritrea',
    dialCode: '+291',
    flag: '🇪🇷',
    format: '7 digits'
  },
  // Major tourist countries to Rwanda
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
    code: 'DE',
    name: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    format: '10-12 digits'
  },
  {
    code: 'FR',
    name: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    format: '9-10 digits'
  },
  {
    code: 'NL',
    name: 'Netherlands',
    dialCode: '+31',
    flag: '🇳🇱',
    format: '9 digits'
  },
  {
    code: 'BE',
    name: 'Belgium',
    dialCode: '+32',
    flag: '🇧🇪',
    format: '9 digits'
  },
  {
    code: 'CH',
    name: 'Switzerland',
    dialCode: '+41',
    flag: '🇨🇭',
    format: '9 digits'
  },
  {
    code: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    format: '9-10 digits'
  },
  {
    code: 'ES',
    name: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    format: '9 digits'
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    format: '10 digits'
  },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    format: '9 digits'
  },
  {
    code: 'ZA',
    name: 'South Africa',
    dialCode: '+27',
    flag: '🇿🇦',
    format: '9 digits'
  },
  {
    code: 'NG',
    name: 'Nigeria',
    dialCode: '+234',
    flag: '🇳🇬',
    format: '10-11 digits'
  },
  {
    code: 'EG',
    name: 'Egypt',
    dialCode: '+20',
    flag: '🇪🇬',
    format: '10 digits'
  },
  {
    code: 'MA',
    name: 'Morocco',
    dialCode: '+212',
    flag: '🇲🇦',
    format: '9 digits'
  },
  {
    code: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    format: '10 digits'
  },
  {
    code: 'CN',
    name: 'China',
    dialCode: '+86',
    flag: '🇨🇳',
    format: '11 digits'
  },
  {
    code: 'JP',
    name: 'Japan',
    dialCode: '+81',
    flag: '🇯🇵',
    format: '10-11 digits'
  },
  {
    code: 'KR',
    name: 'South Korea',
    dialCode: '+82',
    flag: '🇰🇷',
    format: '10-11 digits'
  },
  {
    code: 'BR',
    name: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    format: '10-11 digits'
  },
  {
    code: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
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
  required = false,
  paymentMethod = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

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
    setSearchQuery('');
    setFilteredCountries(countries);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCountries(countries);
      return;
    }
    
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountryCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Allow typing country code directly
    if (input.startsWith('+')) {
      const country = countries.find(c => c.dialCode === input);
      if (country) {
        setSelectedCountry(country);
        const newValue = country.dialCode + phoneNumber;
        onChange(newValue);
        return;
      }
    }
    
    // If not a valid country code, treat as search
    handleSearch(input);
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
        
        // Additional validation for MTN and Airtel
        if (paymentMethod === 'mtn') {
          if (!['7'].includes(phoneNumber[0])) {
            return 'MTN Mobile Money is only available for Rwanda numbers starting with 7';
          }
        } else if (paymentMethod === 'airtel') {
          if (!['7', '8', '9'].includes(phoneNumber[0])) {
            return 'Airtel Money is only available for Rwanda numbers starting with 7, 8, or 9';
          }
        }
      } else {
        // For non-Rwanda countries, show error if trying to use MTN/Airtel
        if (paymentMethod === 'mtn' || paymentMethod === 'airtel') {
          return `${paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'} is only available for Rwanda phone numbers`;
        }
        
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
            <div className="absolute top-full left-0 mt-1 w-80 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {/* Search Input */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
                <input
                  type="text"
                  placeholder="Search country or type +code..."
                  value={searchQuery}
                  onChange={(e) => handleCountryCodeInput(e)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              {/* Countries List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                    >
                      <span className="mr-3 text-lg flex-shrink-0">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{country.name}</div>
                        <div className="text-sm text-gray-500 truncate">{country.dialCode} • {country.format}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No countries found
                  </div>
                )}
              </div>
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
        {paymentMethod && selectedCountry.code !== 'RW' && (
          <span className="text-red-500 ml-2">
            ⚠️ {paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'} requires Rwanda number
          </span>
        )}
      </p>
    </div>
  );
};
