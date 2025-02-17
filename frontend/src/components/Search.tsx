import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { SearchIcon } from './icons/SearchIcon';

export const Search: FC = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <div className='w-full h-15 flex justify-around items-center rounded-4xl px-4 border-2 bg-gray-100 border-pink-50 hover:bg-white transition-colors duration-300'>
          <Input
            placeholder='Which game are you looking for?'
            name='search'
            required={false}
            type='text'
            className='placeholder:text-black mt-4 border-none shadow-none'
          />
          <Button
            type='submit'
            onClick={() => ''}
            className='w-12 h-12 rounded-2xl bg-pink-300 hover:bg-pink-600 flex items-center justify-center transition-colors duration-300'
          >
            <SearchIcon />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
