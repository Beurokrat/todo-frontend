import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className='flex justify-center mt-4'>
      <nav className='inline-flex'>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={isFirstPage}
          className={`px-4 py-2 border rounded-l ${
            isFirstPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border ${
              page === index + 1
                ? 'bg-blue-500 text-white'
                : 'hover:bg-blue-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={isLastPage}
          className={`px-4 py-2 border rounded-r ${
            isLastPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
