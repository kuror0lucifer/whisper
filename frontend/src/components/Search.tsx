import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { SearchIcon } from './icons/SearchIcon';
import { fetchGamesFromSearch } from '../api/fetchSearchGames';
import { useDispatch } from 'react-redux';
import { setGames, setStatus } from '../redux/games/slice';

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const methods = useForm();
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue?.trim()) return;

    dispatch(setStatus('loading'));

    try {
      const results = await fetchGamesFromSearch(searchValue);
      dispatch(setGames(results));
      dispatch(setStatus('idle'));
    } catch {
      dispatch(setStatus('failed'));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSearch}>
        <div className='w-full h-15 flex justify-around items-center rounded-4xl px-4 border-2 bg-gray-100 border-pink-50 hover:bg-white transition-colors duration-300'>
          <Input
            placeholder='Which game are you looking for?'
            name='search'
            required={false}
            value={searchValue}
            type='text'
            onChange={e => setSearchValue(e.target.value)}
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
