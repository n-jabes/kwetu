'use client'
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, ChevronDown, MoveLeft, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VerifyEmailModal from '@/components/auth/VerifyEmailModal';
import { uploadImageToService } from '@/utils/imageUpload';
import toast from 'react-hot-toast';

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
  role: 'GUEST' | 'HOST';
  phone: string;
  profile_picture?: string;
}

interface SignInErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  profile_picture?: string;
  general?: string;
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
    role: 'GUEST',
    phone: '',
    profile_picture: '',
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

  // Image upload states
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Verification modal states
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');

  // Loading states
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

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

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const imageUrl = await uploadImageToService(file);
      setProfileImagePreview(imageUrl);
      setSignUpData(prev => ({ ...prev, profile_picture: imageUrl }));
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

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

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
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

    // Add phone validation
    if (!signUpData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(signUpData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Profile picture is optional - no validation needed
    
    setSignUpErrors(errors);
    
    // Show toast for validation errors
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
    }
    
    return Object.keys(errors).length === 0;
  };

  // Handle form submissions
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (signInLoading) return;
    
    if (!validateSignIn()) return;
    
    setSignInLoading(true);
    setSignInErrors({}); // Clear previous errors
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInData.email, password: signInData.password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        const msg: string = data?.message || 'Login failed';
        
        // Check for unverified email
        if (msg.includes('check if your email is verified') || msg.includes('email is verified')) {
          setVerifyEmail(signInData.email);
          setVerifyOpen(true);
          toast.success('Please verify your email to continue');
          return;
        }
        
        // Show error message
        if (msg === 'Invalid credentials') {
          setSignInErrors({ general: 'Invalid email or password' });
          toast.error('Invalid email or password');
        } else {
          setSignInErrors({ general: msg });
          toast.error(msg);
        }
        return;
      }
      
      toast.success('Login successful!');
      router.push('/');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Login error';
      setSignInErrors({ general: errorMsg });
      toast.error(errorMsg);
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (signUpLoading) return;
    
    // Validate form and show toast for validation errors
    if (!validateSignUp()) {
      return; // validateSignUp now shows toast messages
    }

    setSignUpLoading(true);
    setSignUpErrors({}); // Clear previous errors

    try {
      const payload = {
        names: signUpData.fullName,
        phone: signUpData.phone,
        email: signUpData.email,
        password: signUpData.password,
        profile_picture: signUpData.profile_picture || undefined,
      };

      // Choose endpoint based on role
      const endpoint = signUpData.role === 'GUEST' ? '/api/auth/signup/guest' : '/api/auth/signup/host';
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (!res.ok) {
        // Handle different error response formats
        let errorMessage = '';
        let errorField = 'general';
        
        // Check if message is an array (validation errors)
        if (Array.isArray(data.message)) {
          errorMessage = data.message[0]; // Get first error message
          
          // Check if it's a phone number format error
          if (errorMessage.includes('Phone number must be in international format')) {
            errorField = 'phone';
          }
        } else if (typeof data.message === 'string') {
          errorMessage = data.message;
          
          // Handle specific string error messages
          if (data.message === 'Email already exists') {
            errorField = 'email';
          } else if (data.message === 'Phone already exists') {
            errorField = 'phone';
          }
        } else {
          errorMessage = 'Signup failed';
        }
        
        // Set the error in the appropriate field
        if (errorField === 'phone') {
          setSignUpErrors({ phone: errorMessage });
        } else if (errorField === 'email') {
          setSignUpErrors({ email: errorMessage });
        } else {
          setSignUpErrors({ general: errorMessage });
        }
        
        toast.error(errorMessage);
        return;
      }
      
      toast.success(`${signUpData.role} account created successfully! Please check your email for verification.`);
      setVerifyEmail(signUpData.email);
      setVerifyOpen(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Signup error';
      setSignUpErrors({ general: errorMsg });
      toast.error(errorMsg);
    } finally {
      setSignUpLoading(false);
    }
  };

  // Handle input changes
  const handleSignInChange = (field: keyof SignInData, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (signInErrors[field] || signInErrors.general) {
      setSignInErrors(prev => ({ ...prev, [field]: '', general: '' }));
    }
  };

  const handleSignUpChange = (field: keyof SignUpData, value: string | boolean) => {
    setSignUpData(prev => ({ ...prev, [field]: value as string }));
    
    // Update password validation when password changes
    if (field === 'password') {
      setPasswordValidation(validatePasswordStrength(value as string));
    }
    
    // Clear error when user starts typing
    if (signUpErrors[field as keyof SignUpErrors] || signUpErrors.general) {
      setSignUpErrors(prev => ({ ...prev, [field]: '', general: '' }));
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLFormElement>,
    submitHandler: (e: React.KeyboardEvent<HTMLDivElement | HTMLFormElement>) => void
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
      <div className={`hidden lg:flex max-h-screen lg:w-7/15 relative transform transition-transform duration-1000 ease-out ${
        imageLoaded ? 'translate-x-0' : '-translate-x-full'
      }`}>
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
      <div className={`w-full lg:w-8/15 flex items-center justify-center p-4 lg:p-8 bg-gray-50 transform transition-transform duration-1000 ease-out ${
        formLoaded ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div
          ref={formRef}
          className="w-full max-w-md space-y-6 max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-lg p-6 hide-signup-scrollbar relative"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Back to home button */}
          <Link href='/' className='flex items-center gap-2 text-xs text-green-700 hover:text-green-600 cursor-pointer'>
            <MoveLeft />
            Back to Home  
          </Link>
          
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
              disabled={signInLoading || signUpLoading}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                signInLoading || signUpLoading 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'
              } ${
                activeTab === 'signin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              disabled={signInLoading || signUpLoading}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                signInLoading || signUpLoading 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'
              } ${
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
                    disabled={signInLoading}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signInLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
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
                    disabled={signInLoading}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signInLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
                      signInErrors.password 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-green-300 focus:ring-green-200'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={signInLoading}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors ${
                      signInLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'hover:text-gray-600 cursor-pointer'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signInErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                )}
              </div>

              {/* General error message */}
              {signInErrors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">{signInErrors.general}</p>
                </div>
              )}

              <button
                onClick={handleSignIn}
                disabled={signInLoading}
                className={`w-full py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 flex items-center justify-center gap-2 ${
                  signInLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-200 cursor-pointer'
                }`}
              >
                {signInLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  disabled={signInLoading}
                  className={`text-sm transition-colors ${
                    signInLoading 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-green-500 cursor-pointer'
                  }`}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="space-y-4" onKeyPress={(e) => handleKeyPress(e, handleSignUp)}>
              {/* Role selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I am signing up as</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSignUpChange('role', 'GUEST')}
                    disabled={signUpLoading}
                    className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                      signUpLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'cursor-pointer'
                    } ${
                      signUpData.role === 'GUEST' 
                        ? 'border-green-500 text-green-700 bg-green-50' 
                        : 'border-slate-200 text-slate-700 hover:border-green-300'
                    }`}
                  >
                    Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignUpChange('role', 'HOST')}
                    disabled={signUpLoading}
                    className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                      signUpLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'cursor-pointer'
                    } ${
                      signUpData.role === 'HOST' 
                        ? 'border-green-500 text-green-700 bg-green-50' 
                        : 'border-slate-200 text-slate-700 hover:border-green-300'
                    }`}
                  >
                    Host
                  </button>
                </div>
              </div>
              
              {/* Full name */}
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
                    disabled={signUpLoading}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
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
                    disabled={signUpLoading}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
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

              {/* Phone number - required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) => handleSignUpChange('phone', e.target.value)}
                    disabled={signUpLoading}
                    className={`w-full pl-4 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
                      signUpErrors.phone 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-[var(--main-green)]'
                    }`}
                    placeholder="e.g. +250784593206"
                    required
                  />
                </div>
                {signUpErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.phone}</p>
                )}
              </div>

              {/* Profile Picture Upload - optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture <span className="text-gray-400">(optional)</span>
                </label>
                <div className="space-y-3">
                  {/* Image Preview */}
                  {profileImagePreview && (
                    <div className="relative w-24 h-24 mx-auto">
                      <Image
                        src={profileImagePreview}
                        alt="Profile preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImagePreview('');
                          setSignUpData(prev => ({ ...prev, profile_picture: '' }));
                        }}
                        disabled={signUpLoading}
                        className={`absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs transition-colors ${
                          signUpLoading 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'hover:bg-red-600 cursor-pointer'
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      disabled={signUpLoading}
                      className="hidden"
                      id="profileImage"
                    />
                    <label
                      htmlFor="profileImage"
                      className={`flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed rounded-lg transition-colors ${
                        signUpLoading 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'cursor-pointer'
                      } ${
                        signUpErrors.profile_picture 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                      } ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      ) : (
                        <Upload className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-600">
                        {profileImagePreview ? 'Change Image' : 'Upload Profile Picture'}
                      </span>
                    </label>
                  </div>
                </div>
                {signUpErrors.profile_picture && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.profile_picture}</p>
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
                    disabled={signUpLoading}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
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
                    disabled={signUpLoading}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors ${
                      signUpLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'hover:text-gray-600 cursor-pointer'
                    }`}
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
                    disabled={signUpLoading}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      signUpLoading 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    } ${
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
                    disabled={signUpLoading}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors ${
                      signUpLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'hover:text-gray-600 cursor-pointer'
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signUpErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{signUpErrors.confirmPassword}</p>
                )}
              </div>

              {/* General error message */}
              {signUpErrors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">{signUpErrors.general}</p>
                </div>
              )}

              <button
                onClick={handleSignUp}
                disabled={signUpLoading}
                className={`w-full py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 flex items-center justify-center gap-2 ${
                  signUpLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[var(--main-green)] hover:bg-green-600 text-white focus:ring-[var(--main-green)] cursor-pointer'
                }`}
              >
                {signUpLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signin')}
                    disabled={signUpLoading}
                    className={`font-medium transition-colors ${
                      signUpLoading 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-green-500 hover:text-green-600 cursor-pointer'
                    }`}
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
      
      <VerifyEmailModal
        open={verifyOpen}
        email={verifyEmail}
        onClose={() => setVerifyOpen(false)}
        onSuccess={() => { setVerifyOpen(false); router.push('/'); }}
      />
    </div>
  );
};

export default LoginPage;
