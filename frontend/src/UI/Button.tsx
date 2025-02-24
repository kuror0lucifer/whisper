import { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-full cursor-pointer ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
