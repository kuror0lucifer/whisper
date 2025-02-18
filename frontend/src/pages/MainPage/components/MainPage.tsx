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

export const MainPage: FC = () => {
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
    <>
      <Header isAuth={false} />
      {status === 'loading' ? (
        <div className='w-full max-w-screen-3xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 mt-8 px-10 pb-10'>
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
    </>
  );
};
