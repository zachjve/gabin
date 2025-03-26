// components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-[var(--primary)] ${sizeMap[size]} ${className}`}></div>
    </div>
  );
};

export default LoadingSpinner;