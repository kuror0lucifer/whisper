import { FC, useEffect } from 'react';
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
import { AppDispatch } from '../redux/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectCurrentPage, selectQuery } from '../redux/games/selectors';

export const Search: FC = () => {
  const methods = useForm();
  const { getValues, setValue } = methods;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useSelector(selectQuery);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    const page = Number(searchParams.get('page')) || 1;

    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
      setValue('search', urlQuery);
    }

    if (page !== currentPage + 1) {
      dispatch(setCurrentPage(page - 1));
    }

    dispatch(fetchGames({ page: page - 1, itemsPerPage: 20 }));
  }, [currentPage, dispatch, setValue, query, searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = getValues('search');

    setSearchParams({ search: searchQuery, page: '1' });

    dispatch(setStatus('loading'));
    dispatch(setQuery(searchQuery));
    dispatch(setCurrentPage(0));

    try {
      const page = 0;
      const itemsPerPage = 20;
      const searchQueryToUrl = searchQuery.split(' ').join('+');
      navigate(`/all-discounts?search=${searchQueryToUrl}&page=${page + 1}`);
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
    setSearchParams({ page: '1' });
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
