import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { SearchIcon } from './icons/SearchIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGames,
  setCurrentPage,
  setQuery,
  setStatus,
} from '../redux/games/slice';
import { ClearInputIcon } from './icons/ClearInputIcon';
import { AppDispatch, RootState } from '../redux/store';

export const Search: FC = () => {
  const methods = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const [localQuery, setLocalQuery] = useState('');

  const query = useSelector((state: RootState) => state.games.query);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStatus('loading'));
    dispatch(setQuery(localQuery));
    try {
      const page = 0;
      const itemsPerPage = 20;
      dispatch(fetchGames({ page, itemsPerPage }));
      dispatch(setStatus('idle'));
    } catch {
      dispatch(setStatus('failed'));
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
    dispatch(setCurrentPage(0));
    dispatch(fetchGames({ page: 0, itemsPerPage: 20 }));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSearch}>
        <div className='h-15 flex justify-between items-center rounded-4xl px-4 border-2 bg-gray-100 border-pink-50 hover:bg-white transition-colors duration-300'>
          <Input
            placeholder='Which game are you looking for?'
            name='search'
            required={false}
            value={localQuery}
            type='text'
            onChange={e => setLocalQuery(e.target.value)}
            className='placeholder:text-black mt-4 border-none shadow-none'
          />
          <div className='flex justify-center items-center'>
            {query && (
              <Button
                type='button'
                onClick={() => handleClear()}
                className='bg-transparent w-10 h-10 flex justify-center items-center'
              >
                <ClearInputIcon />
              </Button>
            )}
            <Button
              type='submit'
              onClick={() => ''}
              className='w-12 h-12 rounded-2xl bg-pink-300 hover:bg-pink-600 flex items-center justify-center transition-colors duration-300'
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
