import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasMore
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;