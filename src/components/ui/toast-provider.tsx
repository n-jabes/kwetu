'use client'
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#22c55e',
            color: '#fff',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
        info: {
          style: {
            background: '#3b82f6',
            color: '#fff',
          },
        },
        warning: {
          style: {
            background: '#f59e0b',
            color: '#fff',
          },
        },
      }}
    />
  );
};
