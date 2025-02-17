import { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white bg-gray-800 rounded-md text-center ${className}`}
    >
      {children}
    </button>
  );
};
