import { FC, useEffect } from 'react';
import { Header } from '../../../components/Header';
import { GameList } from '../../../modules/games/components/GameList';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGames,
  setCurrentPage,
  setStatus,
} from '../../../redux/games/slice';
import { Skeleton } from '../../../modules/games/components/Skeleton';
import { AppDispatch, RootState } from '../../../redux/store';
import { Pagination } from '../../../components/Pagination';
import { useAuth } from '../../../hooks/useAuth';
import { useSearchParams } from 'react-router-dom';
import { selectQuery } from '../../../redux/games/selectors';

export const MainPage: FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { totalPages, status, currentPage } = useSelector(
    (state: RootState) => state.games
  );
  const currentSearch = useSelector(selectQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 20;

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;

    if (page !== currentPage + 1) {
      dispatch(setCurrentPage(page - 1));
    }
  }, [searchParams, dispatch, currentPage, setSearchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(
          fetchGames({ page: currentPage, itemsPerPage })
        ).unwrap();
      } catch {
        dispatch(setStatus('failed'));
      }
    };

    loadData();
  }, [dispatch, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    dispatch(setCurrentPage(selected));

    if (newPage === 1) {
      setSearchParams(
        currentSearch ? { search: currentSearch, page: String(newPage) } : {}
      );
    } else {
      setSearchParams({ search: currentSearch, page: String(newPage) });
    }
  };

  return (
    <div className='w-full min-h-screen pb-5 bg-linear-to-b from-gray-100 to-blue-200'>
      <Header isAuth={isAuth} />
      {status === 'loading' ? (
        <div className='w-full flex flex-wrap justify-center items-center gap-10 my-8 px-10'>
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <GameList />
          <Pagination
            pageCount={totalPages}
            onPageClick={handlePageChange}
            forcePage={currentPage}
          />
        </>
      )}
    </div>
  );
};
