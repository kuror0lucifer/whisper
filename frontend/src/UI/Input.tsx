import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Badge } from './Badge';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  required: boolean;
  error?: string;
}

export const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  className,
  required,
  error,
}) => {
  const { control } = useFormContext();

  return (
    <div className='mb-4'>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`mt-1 block w-full px-3 py-2 border-1 border-gray-400 rounded-md focus:outline-none   ${
              error ? 'border-red-500' : ''
            } ${className} `}
          />
        )}
      />
      {error && (
        <Badge
          label={error}
          type='error'
          className='text-sm text-red-500 mt-1'
        />
      )}
    </div>
  );
};
