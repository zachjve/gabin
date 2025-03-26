// components/common/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'solid';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  className = '' 
}) => {
  return (
    <span 
      className={`
        inline-block px-3 py-1 rounded-full text-sm 
        ${variant === 'default' ? 'bg-white/20' : ''} 
        ${className}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;