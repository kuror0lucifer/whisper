import { FC } from 'react';

interface BadgeProps {
  label: string;
  className?: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
}

export const Badge: FC<BadgeProps> = ({
  label,
  className,
  type = 'default',
}) => {
  const badgeStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-flex items-center ps-3 py-1 text-sm font-medium rounded-full ${badgeStyles[type]} ${className}`}
    >
      {label}
    </span>
  );
};
