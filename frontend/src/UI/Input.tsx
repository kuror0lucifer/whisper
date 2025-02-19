import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  required?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  className,
  required = false,
  error,
}) => {
  const { register } = useFormContext();

  return (
    <div className='mb-4 w-full'>
      <input
        {...register(name, { required: required })}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border-1 border-gray-400 rounded-md focus:outline-none ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && <div className='text-sm text-red-500 mt-1'>{error}</div>}
    </div>
  );
};
