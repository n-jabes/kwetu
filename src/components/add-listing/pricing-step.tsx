'use client'
import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingUp, Info } from 'lucide-react';

interface PricingStepProps {
  formData: {
    pricePerNight: number;
    pricePerWeek: number;
    pricePerMonth: number;
    cleaningFee: number;
    serviceFee: number;
    securityDeposit: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
  };
  updateFormData: (updates: Partial<{
    pricePerNight: number;
    pricePerWeek: number;
    pricePerMonth: number;
    cleaningFee: number;
    serviceFee: number;
    securityDeposit: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX';
  }>) => void;
  errors: { [key: string]: string };
}

const currencies = [
  { code: 'RWF', symbol: '₣', name: 'Rwandan Franc' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' }
];

const getCurrencySymbol = (currencyCode: string) => {
  const currency = currencies.find(c => c.code === currencyCode);
  return currency ? currency.symbol : currencyCode;
};

export const PricingStep: React.FC<PricingStepProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Set your pricing strategy
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Competitive pricing helps attract guests while ensuring you earn what your property is worth.
        </p>
      </div>

      {/* Currency Selection */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Currency</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => updateFormData({ currency: currency.code as 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'UGX' })}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                formData.currency === currency.code
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{currency.symbol}</div>
              <div className="font-medium text-gray-900">{currency.code}</div>
              <div className="text-sm text-gray-600">{currency.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Nightly Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price per Night <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.pricePerNight || ''}
            onChange={(e) => updateFormData({ pricePerNight: parseInt(e.target.value) || 0 })}
            placeholder="Enter price per night"
            min="1"
            className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 font-medium">RWF</span>
          </div>
        </div>
        {errors.pricePerNight && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {errors.pricePerNight}
          </p>
        )}
      </div>

      {/* Weekly and Monthly Prices */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Extended Stay Discounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Week
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.pricePerWeek || ''}
                onChange={(e) => updateFormData({ pricePerWeek: parseInt(e.target.value) || 0 })}
                placeholder="Enter weekly price"
                min="0"
                className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 font-medium">RWF</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Month
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.pricePerMonth || ''}
                onChange={(e) => updateFormData({ pricePerMonth: parseInt(e.target.value) || 0 })}
                placeholder="Enter monthly price"
                min="0"
                className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 font-medium">RWF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Fees */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Additional Fees</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cleaning Fee
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.cleaningFee || ''}
                onChange={(e) => updateFormData({ cleaningFee: parseInt(e.target.value) || 0 })}
                placeholder="Cleaning fee"
                min="0"
                className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 font-medium">RWF</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Fee
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.serviceFee || ''}
                onChange={(e) => updateFormData({ serviceFee: parseInt(e.target.value) || 0 })}
                placeholder="Service fee"
                min="0"
                className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 font-medium">RWF</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Deposit
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.securityDeposit || ''}
              onChange={(e) => updateFormData({ securityDeposit: parseInt(e.target.value) || 0 })}
              placeholder="Enter security deposit"
              min="0"
              className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 font-medium">RWF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Pricing Calculator</h3>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center text-green-600 hover:text-green-700 cursor-pointer"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {showCalculator ? 'Hide' : 'Show'} calculator
          </button>
        </div>
        
        {showCalculator && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Revenue Calculator</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 night:</span>
                    <span className="font-medium">{getCurrencySymbol(formData.currency)}{formData.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 week:</span>
                    <span className="font-medium">{getCurrencySymbol(formData.currency)}{formData.pricePerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 month:</span>
                    <span className="font-medium">{getCurrencySymbol(formData.currency)}{formData.pricePerMonth}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Cleaning fee:</span>
                      <span>{getCurrencySymbol(formData.currency)}{formData.cleaningFee}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Market Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>Competitive pricing</span>
                  </div>
                  <div className="text-gray-600">
                    <p>• Weekly stays: 10% discount</p>
                    <p>• Monthly stays: 20% discount</p>
                    <p>• Additional fees clearly listed</p>
                  </div>
                </div>
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
            <h4 className="font-semibold text-blue-900 mb-2">Pricing Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Research similar properties in your area to set competitive prices</li>
              <li>• Consider seasonal pricing for peak and off-peak periods</li>
              <li>• Extended stay discounts encourage longer bookings</li>
              <li>• Be transparent about all fees to avoid guest surprises</li>
              <li>• Start with competitive pricing and adjust based on demand</li>
              <li>• Factor in your costs (mortgage, utilities, maintenance) when setting prices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
