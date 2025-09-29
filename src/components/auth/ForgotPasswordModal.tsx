'use client'
import React, { useState } from 'react';
import { X, Mail, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://kwetu-backend-ytdc.onrender.com/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        toast.success('Password reset link sent! Check your email.');
      } else {
        // Handle different error cases
        if (response.status === 404) {
          setErrors({ email: 'Email not found. Please check your email address.' });
          toast.error('Email not found');
        } else if (response.status === 429) {
          toast.error('Too many requests. Please try again later.');
        } else {
          setErrors({ email: data.message || 'Something went wrong. Please try again.' });
          toast.error(data.message || 'Failed to send reset link');
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Network error. Please check your connection and try again.');
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setErrors({});
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full p-6 relative border border-gray-200/50">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          // Success state
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Check Your Email
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Try Another Email
              </button>
            </div>
          </div>
        ) : (
          // Form state
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Forgot Password?
              </h3>
              <p className="text-gray-600">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};