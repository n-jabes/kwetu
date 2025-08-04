'use client'
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Add interfaces for form data and error objects
interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isClient: boolean;
}

interface SignInErrors {
  email?: string;
  password?: string;
}

interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordValidation {
  hasMinLength: boolean;
  hasCapital: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [signInData, setSignInData] = useState<SignInData>({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState<SignUpData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isClient: false
  });
  
  // Error states
  const [signInErrors, setSignInErrors] = useState<SignInErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    hasMinLength: false,
    hasCapital: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Animation states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  // Scroll state for floating button
  const [showScrollDown, setShowScrollDown] = useState(false);
  const formRef = React.useRef<HTMLDivElement>(null);

  // Show floating button if form is scrollable and not at bottom
  useEffect(() => {
    const handleScroll = () => {
      const el = formRef.current;
      if (!el) return;
      setShowScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    };
    const el = formRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Initial check
      setShowScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [formLoaded, activeTab]);

  const scrollFormDown = () => {
    const el = formRef.current;
    if (el) {
      el.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setImageLoaded(true), 100);
    setTimeout(() => setFormLoaded(true), 300);
  }, []);

  // Password validation function
  const validatePasswordStrength = (password: string): PasswordValidation => {
    return {
      hasMinLength: password.length >= 8,
      hasCapital: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const validation = validatePasswordStrength(password);
    return validation.hasMinLength && validation.hasCapital && validation.hasNumber && validation.hasSpecial;
  };

  const validateSignIn = () => {
    const errors: SignInErrors = {};
    
    if (!signInData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(signInData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!signInData.password) {
      errors.password = 'Password is required';
    }
    
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = () => {
    const errors: SignUpErrors = {};
    
    if (!signUpData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (signUpData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!signUpData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(signUpData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!signUpData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(signUpData.password)) {
      errors.password = 'Password does not meet requirements';
    }
    
    if (!signUpData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submissions
  const handleSignIn = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateSignIn()) {
      console.log('Sign In Data:', signInData);
      // alert('Sign in successful! Check console for data.');
      router.push('/search-results');
    }
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateSignUp()) {
      console.log('Sign Up Data:', signUpData);
      // alert('Sign up successful! Check console for data.');
      router.push('/search-results');
    }
  };

  // Handle input changes
  const handleSignInChange = (field: keyof SignInData, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (signInErrors[field]) {
      setSignInErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignUpChange = (field: keyof SignUpData, value: string | boolean) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
    
    // Update password validation when password changes
    if (field === 'password') {
      setPasswordValidation(validatePasswordStrength(value as string));
    }
    
    // Clear error when user starts typing
    if (signUpErrors[field as keyof SignUpErrors]) {
      setSignUpErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLFormElement>,
    submitHandler: (e: any) => void
  ) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };

  // Password validation component
  const PasswordRequirements = ({ show }: { show: boolean }) => {
    if (!show) return null;
    return (
      <div className="mt-2 space-y-1">
        <p className="text-xs text-gray-600 font-medium">Password requirements:</p>
        <div className="space-y-1">
          <div className={`flex items-center text-xs`} style={{ color: passwordValidation.hasMinLength ? 'var(--main-green)' : 'var(--main-red)' }}>
            {passwordValidation.hasMinLength ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
            At least 8 characters
          </div>
          <div className={`flex items-center text-xs`} style={{ color: passwordValidation.hasCapital ? 'var(--main-green)' : 'var(--main-red)' }}>
            {passwordValidation.hasCapital ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
            At least one capital letter
          </div>
          <div className={`flex items-center text-xs`} style={{ color: passwordValidation.hasNumber ? 'var(--main-green)' : 'var(--main-red)' }}>
            {passwordValidation.hasNumber ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
            At least one number
          </div>
          <div className={`flex items-center text-xs`} style={{ color: passwordValidation.hasSpecial ? 'var(--main-green)' : 'var(--main-red)' }}>
            {passwordValidation.hasSpecial ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
            At least one special character
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side - House image */}
      <div className={`hidden lg:flex max-h-screen lg:w-1/2 relative transform transition-transform duration-1000 ease-out ${
        imageLoaded ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-orange-200"
        /> */}
        {/* House illustration overlay */}
        <Image 
          src="/images/house.png" 
          alt="House" 
          width={500} 
          height={500} 
          className='w-full h-full object-cover'
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Right side - Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-gray-50 transform transition-transform duration-1000 ease-out ${
        formLoaded ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div
          ref={formRef}
          className="w-full max-w-md space-y-6 max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-lg p-6 hide-signup-scrollbar relative"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'signin' ? 'Welcome Back' : 'Welcome To KWETU'}
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              {activeTab === 'signin' 
                ? 'Welcome Back, Please enter your details' 
                : 'Welcome Back, Please enter your details'
              }
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <div className="space-y-4" onKeyPress={(e) => handleKeyPress(e, handleSignIn)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => handleSignInChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signInErrors.email 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-green-300 focus:ring-green-200'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {signInErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{signInErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => handleSignInChange('password', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signInErrors.password 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-green-300 focus:ring-green-200'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signInErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                )}
              </div>

              <button
                onClick={handleSignIn}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer"
              >
                Sign In
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  className="text-sm text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="space-y-4" onKeyPress={(e) => handleKeyPress(e, handleSignUp)}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="fullName"
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) => handleSignUpChange('fullName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpErrors.fullName 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-[var(--main-green)]'
                    }`}
                    placeholder="Full Names: John Doe"
                    required
                  />
                </div>
                {signUpErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => handleSignUpChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpErrors.email 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-[var(--main-green)]'
                    }`}
                    placeholder="Username: john@gmail.com"
                    required
                  />
                </div>
                {signUpErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) => handleSignUpChange('password', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpErrors.password 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-[var(--main-green)]'
                    }`}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signUpErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.password}</p>
                )}
                <PasswordRequirements show={!!signUpData.password} />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpData.confirmPassword}
                    onChange={(e) => handleSignUpChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpErrors.confirmPassword 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-[var(--main-green)]'
                    }`}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signUpErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isClient"
                  checked={signUpData.isClient}
                  onChange={(e) => handleSignUpChange('isClient', e.target.checked)}
                  className="w-4 h-4 text-[var(--main-green)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--main-green)] focus:ring-2"
                  required
                />
                <label htmlFor="isClient" className="ml-2 text-sm text-gray-600">
                  Registering as a client ?
                </label>
              </div>

              <button
                onClick={handleSignUp}
                className="w-full bg-[var(--main-green)] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--main-green)] cursor-pointer"
              >
                Sign Up
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signin')}
                    className="text-green-500 hover:text-green-600 font-medium cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Floating scroll down button for signup form */}
        {activeTab === 'signup' && showScrollDown && (
          <button
            type="button"
            onClick={scrollFormDown}
            className="fixed lg:absolute right-8 bottom-8 z-20 bg-[var(--main-green)] border border-gray-200 shadow-lg rounded-full p-4 flex items-center justify-center animate-bounce cursor-pointer"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            aria-label="Scroll down to see more"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;