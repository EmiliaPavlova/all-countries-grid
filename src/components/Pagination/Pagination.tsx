import { usePagination, DOTS } from '../../hooks/usePagination';
import './Pagination.css';

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalCount, currentPage, pageSize, onPageChange }: PaginationProps) {
  const paginationRange = usePagination({ currentPage, totalCount, pageSize });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <div className='pagination_wrapper'>
      <div className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
        &laquo;
      </div>
      {paginationRange && paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <div key={index} className='dots'>&#8230;</div>;
        }

        return (
          <div
            key={index}
            className={`${pageNumber === currentPage ? 'selected' : ''}`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </div>
        );
      })}
      <div className={`${currentPage === lastPage ? 'disabled' : ''}`} onClick={onNext}>
        &raquo;
      </div>
    </div>
  );
};