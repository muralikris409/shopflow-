import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="px-2 py-1 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded border ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black'
          } hover:bg-blue-100`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      <button
        className="px-2 py-1 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
