'use client'

import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VerifyEmailModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({ open, email, onClose, onSuccess }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Function to mask email for privacy
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return `${localPart[0]}*****@${domain}`;
    }
    return `${localPart.substring(0, 3)}*****@${domain}`;
  };

  useEffect(() => {
    if (open) {
      setDigits(['', '', '', '', '', '']);
      setError(null);
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [open]);

  const handleDigitChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 1) return;
    
    const newDigits = [...digits];
    newDigits[index] = numericValue;
    setDigits(newDigits);
    setError(null);

    // Auto-focus next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...digits];
    
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    
    setDigits(newDigits);
    
    // Focus the last filled input or first empty
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      toast.error('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Verification failed');
      }
      toast.success('Email verified successfully!');
      onSuccess();
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Verification failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Failed to resend code');
      }
      toast.success('New verification code sent to your email!');
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to resend code. Please try again.';
      toast.error(errorMsg);
    } finally {
      setResending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Verify your email</h3>
          <p className="text-sm text-slate-600">
            We sent a 6-digit verification code to
          </p>
          <p className="font-medium text-slate-900 font-mono">{maskEmail(email)}</p>
        </div>

        <div className="space-y-4">
          {/* Digit inputs */}
          <div className="flex justify-center gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el!; }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                style={{ caretColor: 'transparent' }}
              />
            ))}
          </div>

          {error && (
            <div className="text-center">
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading || digits.some(d => !d)}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-600 mb-2">Didn&apos;t receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              {resending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Resending...
                </>
              ) : (
                'Resend Code'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
