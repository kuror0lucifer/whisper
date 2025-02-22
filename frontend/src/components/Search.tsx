import { FC } from 'react';
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
  const { getValues, setValue } = methods;
  const dispatch = useDispatch<AppDispatch>();

  const query = useSelector((state: RootState) => state.games.query);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = getValues('search');
    dispatch(setStatus('loading'));
    dispatch(setQuery(searchQuery));
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
    setValue('search', '');
  };

  const goToFirstPage = () => {
    dispatch(setCurrentPage(0));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSearch}>
        <div className='h-15 flex justify-between items-center rounded-4xl px-4 border-2 bg-gray-100 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-colors duration-300'>
          <Input
            placeholder='Which game are you looking for?'
            name='search'
            type='text'
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
              onClick={goToFirstPage}
              className='w-12 h-12 rounded-2xl bg-pink-400 hover:bg-pink-500 flex items-center justify-center transition-colors duration-300'
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
