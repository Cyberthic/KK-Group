'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Phone,
  Mail,
  Lock,
  AtSign,
} from 'lucide-react';
import { api } from '@/services';

interface CreatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'WORKER' | 'OFFICE_STAFF' | 'CUSTOMER';
  token: string;
  onSuccess: () => void;
}

export function CreatePersonModal({
  isOpen,
  onClose,
  role,
  token,
  onSuccess,
}: CreatePersonModalProps) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Real-time username check state
  const [usernameStatus, setUsernameStatus] = useState<
    'idle' | 'checking' | 'available' | 'taken' | 'error'
  >('idle');
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const usernameDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time email check state (for CUSTOMER)
  const [emailStatus, setEmailStatus] = useState<
    'idle' | 'checking' | 'available' | 'taken' | 'error'
  >('idle');
  const emailDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const isCustomer = role === 'CUSTOMER';
  const roleLabel =
    role === 'WORKER'
      ? 'Worker'
      : role === 'OFFICE_STAFF'
      ? 'Office Staff'
      : 'Customer';

  // Debounced username check
  useEffect(() => {
    if (usernameDebounceRef.current) {
      clearTimeout(usernameDebounceRef.current);
    }

    const clean = username.trim().toLowerCase();
    if (!clean) {
      setUsernameStatus('idle');
      setUsernameSuggestions([]);
      return;
    }

    if (clean.length < 3) {
      setUsernameStatus('idle');
      setUsernameSuggestions([]);
      return;
    }

    setUsernameStatus('checking');

    usernameDebounceRef.current = setTimeout(async () => {
      try {
        const res = await api.checkUsername(clean, token);
        if (res.isAvailable) {
          setUsernameStatus('available');
          setUsernameSuggestions([]);
        } else {
          setUsernameStatus('taken');
          setUsernameSuggestions(res.suggestions || []);
        }
      } catch (err) {
        setUsernameStatus('error');
        setUsernameSuggestions([]);
      }
    }, 400);

    return () => {
      if (usernameDebounceRef.current) {
        clearTimeout(usernameDebounceRef.current);
      }
    };
  }, [username, token]);

  // Debounced email check (for Customer)
  useEffect(() => {
    if (!isCustomer) return;

    if (emailDebounceRef.current) {
      clearTimeout(emailDebounceRef.current);
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setEmailStatus('idle');
      return;
    }

    setEmailStatus('checking');

    emailDebounceRef.current = setTimeout(async () => {
      try {
        const res = await api.checkEmail(cleanEmail, token);
        if (res.isAvailable) {
          setEmailStatus('available');
        } else {
          setEmailStatus('taken');
        }
      } catch (err) {
        setEmailStatus('error');
      }
    }, 400);

    return () => {
      if (emailDebounceRef.current) {
        clearTimeout(emailDebounceRef.current);
      }
    };
  }, [email, isCustomer, token]);

  if (!isOpen) return null;

  const handleSelectSuggestion = (suggested: string) => {
    setUsername(suggested);
    setUsernameStatus('available');
    setUsernameSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const finalName = name.trim();
    const finalMobile = mobileNumber.trim();
    const finalUsername = username.trim().toLowerCase();
    const finalEmail = email.trim().toLowerCase();

    if (!finalName) {
      setError('Please enter a full name.');
      return;
    }

    if (!finalMobile) {
      setError('Please enter a mobile number.');
      return;
    }

    if (isCustomer && !finalEmail) {
      setError('Email address is required for customer accounts.');
      return;
    }

    if (isCustomer && emailStatus === 'taken') {
      setError('The provided email is already registered.');
      return;
    }

    if (!finalUsername || finalUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (usernameStatus === 'taken') {
      setError('The chosen username is already taken. Please choose another or select a suggestion.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await api.createPerson(
        {
          name: finalName,
          mobileNumber: finalMobile,
          username: finalUsername,
          password,
          role,
          email: isCustomer ? finalEmail : undefined,
        },
        token,
      );

      // Reset form
      setName('');
      setMobileNumber('');
      setEmail('');
      setUsername('');
      setPassword('');
      setUsernameStatus('idle');
      setEmailStatus('idle');
      setUsernameSuggestions([]);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create person');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#14151A] border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/60 bg-[#16181F]">
          <div>
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <span>Add New {roleLabel}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isCustomer
                ? 'Create customer profile with name, email, mobile & credentials'
                : `Add ${roleLabel.toLowerCase()} with name, mobile & credentials`}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-gray-400 hover:text-gray-200 transition-colors bg-[#1A1C23] hover:bg-[#232630] rounded-xl border border-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-[#7B4DFF]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1A1C23] border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#7B4DFF] transition-colors"
                placeholder={isCustomer ? 'e.g. Jane Doe' : 'e.g. John Doe'}
                required
              />
            </div>
          </div>

          {/* 2. Email (Required for Customer, Hidden for Worker/Office Staff) */}
          {isCustomer && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email Address <span className="text-[#7B4DFF]">*</span>
                </label>
                {emailStatus === 'checking' && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin text-[#7B4DFF]" />
                    Checking...
                  </span>
                )}
                {emailStatus === 'available' && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </span>
                )}
                {emailStatus === 'taken' && (
                  <span className="text-xs text-red-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    Already registered
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#1A1C23] border rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${
                    emailStatus === 'taken'
                      ? 'border-red-500/50 focus:border-red-500'
                      : emailStatus === 'available'
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : 'border-gray-800 focus:border-[#7B4DFF]'
                  }`}
                  placeholder="customer@example.com"
                  required
                />
              </div>
            </div>
          )}

          {/* 3. Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Mobile Number <span className="text-[#7B4DFF]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1A1C23] border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#7B4DFF] transition-colors"
                placeholder="e.g. +94 77 123 4567"
                required
              />
            </div>
          </div>

          {/* 4. Username with real-time check & suggestions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Username <span className="text-[#7B4DFF]">*</span>
              </label>
              {usernameStatus === 'checking' && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin text-[#7B4DFF]" />
                  Checking availability...
                </span>
              )}
              {usernameStatus === 'available' && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Username available
                </span>
              )}
              {usernameStatus === 'taken' && (
                <span className="text-xs text-red-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  Already taken
                </span>
              )}
            </div>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-[#1A1C23] border rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${
                  usernameStatus === 'taken'
                    ? 'border-red-500/50 focus:border-red-500'
                    : usernameStatus === 'available'
                    ? 'border-emerald-500/50 focus:border-emerald-500'
                    : 'border-gray-800 focus:border-[#7B4DFF]'
                }`}
                placeholder="e.g. johndoe"
                required
              />
            </div>

            {/* 3 Suggestions if taken */}
            {usernameStatus === 'taken' && usernameSuggestions.length > 0 && (
              <div className="mt-2.5 p-3 bg-[#1A1C23]/90 border border-gray-800 rounded-xl">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7B4DFF]" />
                  <span>Suggested alternatives (click to use):</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {usernameSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-2.5 py-1 bg-[#14151A] hover:bg-[#7B4DFF]/20 border border-gray-700 hover:border-[#7B4DFF] text-xs font-mono text-gray-300 hover:text-white rounded-lg transition-all flex items-center gap-1 group"
                    >
                      <span>@{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Temporary Password <span className="text-[#7B4DFF]">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1A1C23] border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#7B4DFF] transition-colors"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Minimum 8 characters with letters, numbers, and symbols.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={
                isLoading ||
                usernameStatus === 'taken' ||
                usernameStatus === 'checking' ||
                (isCustomer && emailStatus === 'taken') ||
                (isCustomer && emailStatus === 'checking')
              }
              className="w-full py-3 bg-[#7B4DFF] hover:bg-[#6A3DEE] text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(123,77,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create {roleLabel} Account</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
