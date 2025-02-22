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

export const MainPage: FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { totalPages, status, currentPage } = useSelector(
    (state: RootState) => state.games
  );
  const itemsPerPage = 20;

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

  return (
    <div className='w-full h-fit pb-5 bg-linear-to-b from-gray-100 to-blue-200'>
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
            onPageClick={({ selected }) => dispatch(setCurrentPage(selected))}
            forcePage={currentPage}
          />
        </>
      )}
    </div>
  );
};
