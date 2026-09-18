'use client';

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { api } from '@/services';

interface CreatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'WORKER' | 'OFFICE_STAFF' | 'CUSTOMER';
  token: string;
  onSuccess: () => void;
}

export function CreatePersonModal({ isOpen, onClose, role, token, onSuccess }: CreatePersonModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await api.createStaff({ username, password, role }, token);
      setUsername('');
      setPassword('');
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
      <div className="bg-[#14151A] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold text-gray-100">
            Add New {role === 'WORKER' ? 'Worker' : role === 'OFFICE_STAFF' ? 'Office Staff' : 'Customer'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-300 transition-colors bg-[#1A1C23] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#1A1C23] border border-gray-800 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#7B4DFF] transition-colors"
              placeholder="e.g. johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Temporary Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#1A1C23] border border-gray-800 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#7B4DFF] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#7B4DFF] hover:bg-[#6A3DEE] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(123,77,255,0.2)] disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
