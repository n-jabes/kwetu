'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    token?: string;
  }>({});

  // Extract token from URL and clear it for security
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      // Clear token from URL for security
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
      
      // Validate token
      validateToken(urlToken);
    } else {
      setErrors({ token: 'Invalid or missing reset token' });
      setIsValidatingToken(false);
    }
  }, [searchParams]);

  const validateToken = async (tokenToValidate: string) => {
    try {
      // You could add a token validation endpoint here
      // For now, we'll assume the token is valid if it exists
      // In enterprise implementation, you'd validate with the backend
      setTokenValid(true);
    } catch (error) {
      console.error('Token validation error:', error);
      setErrors({ token: 'Invalid or expired reset token' });
      setTokenValid(false);
    } finally {
      setIsValidatingToken(false);
    }
  };

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    const validation = validatePassword(password);
    const strength = Math.max(0, Math.min(100, (password.length * 10) + (validation.errors.length === 0 ? 50 : 0)));
    
    if (strength < 30) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength < 60) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength < 80) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors({ password: passwordValidation.errors[0] });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (!token) {
      setErrors({ token: 'Invalid reset token' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://kwetu-backend-ytdc.onrender.com/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: token,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Password reset successfully! You can now log in with your new password.');
        router.push('/auth');
      } else {
        if (response.status === 400) {
          setErrors({ password: data.message || 'Invalid password or token' });
          toast.error(data.message || 'Failed to reset password');
        } else if (response.status === 401) {
          setErrors({ token: 'Reset token has expired. Please request a new one.' });
          toast.error('Reset token has expired');
        } else {
          setErrors({ password: data.message || 'Something went wrong. Please try again.' });
          toast.error(data.message || 'Failed to reset password');
        }
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Network error. Please check your connection and try again.');
      setErrors({ password: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidatingToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Validating reset token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-lg shadow-xl p-8 text-center border border-gray-200/50">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            {errors.token || 'This password reset link is invalid or has expired.'}
          </p>
          <button
            onClick={() => router.push('/auth')}
            disabled={isLoading}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Lock className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Reset Your Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Password Strength</span>
                    <span className={`font-medium ${
                      passwordStrength.label === 'Weak' ? 'text-red-600' :
                      passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                      passwordStrength.label === 'Good' ? 'text-emerald-600' : 'text-emerald-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.label === 'Weak' ? 'bg-red-500' :
                        passwordStrength.label === 'Fair' ? 'bg-yellow-500' :
                        passwordStrength.label === 'Good' ? 'bg-emerald-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-1 flex items-center text-sm">
                  {password === confirmPassword ? (
                    <span className="text-emerald-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Passwords match
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Passwords do not match
                    </span>
                  )}
                </div>
              )}
              
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/auth')}
              disabled={isLoading}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Lock className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}