import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchGames } from '../redux/games/slice';

interface PaginationProps {
  pageCount: number;
  onPageClick: (selected: { selected: number }) => void;
  forcePage: number;
}

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  onPageClick,
  forcePage,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageClick({ selected });
    dispatch(
      fetchGames({
        page: selected,
        itemsPerPage: 20,
      })
    );
  };

  if (pageCount < 2) return;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={handlePageChange}
      containerClassName='flex items-center justify-center space-x-2 mb-4'
      activeClassName='bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 hover:text-gray-700'
      previousLabel='←'
      nextLabel='→'
      forcePage={forcePage}
      breakLabel='...'
      previousClassName='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
      nextClassName='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer'
      pageClassName='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer'
      disabledClassName='opacity-50'
      activeLinkClassName='text-white'
    />
  );
};
