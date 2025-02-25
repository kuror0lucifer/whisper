import { FC, useEffect } from 'react';
import { GameCard } from '../../../components/GameCard';
import { baseImgURL } from '../../../constants/baseImgURL';
import { useSelector, useDispatch } from 'react-redux';
import { selectGames, selectQuery } from '../../../redux/games/selectors';
import {
  fetchGames,
  setCurrentPage,
  setStatus,
} from '../../../redux/games/slice';
import { AppDispatch, RootState } from '../../../redux/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cleanTitle, cleanTitleForUrl } from '../utils/cleanTitle';
import { Skeleton } from '../../../modules/games/components/Skeleton';
import { Pagination } from '../../../components/Pagination';
import { NoSearchResult } from '../../../components/NoSearchResult';

export const GameList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector(selectGames);
  const { totalPages, status, currentPage } = useSelector(
    (state: RootState) => state.games
  );
  const currentSearch = useSelector(selectQuery);
  const navigate = useNavigate();
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
    <>
      <div className='w-full flex flex-wrap justify-center items-center gap-10 my-8 px-10'>
        {status === 'loading' ? (
          Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} />)
        ) : (
          <>
            {games?.map(game => (
              <GameCard
                onClick={() =>
                  navigate(
                    `/game/${game.nsuid}/${cleanTitleForUrl(game.title)}`
                  )
                }
                key={game.objectID}
                img={baseImgURL + game.productImage}
                salePrice={game.price?.salePrice}
                regPrice={game.price?.regPrice}
                title={cleanTitle(game.title)}
              />
            ))}
            {games.length === 0 && <NoSearchResult />}
          </>
        )}
      </div>
      <Pagination
        pageCount={totalPages}
        onPageClick={handlePageChange}
        forcePage={currentPage}
      />
    </>
  );
};
