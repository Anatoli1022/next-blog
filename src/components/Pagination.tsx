import React from "react";

const Pagination = ({ handlePreviousPage, thisPage, totalPages, handleNextPage }: any) => {
  return (
    <div className=' flex justify-between gap-x-2'>
      <button
        onClick={handlePreviousPage}
        disabled={thisPage === 1}
        className={`text-foreground rounded-md border px-4 py-1 text-lg font-normal${
          thisPage === 1
            ? "cursor-not-allowed bg-gray-300"
            : "border-xl border bg-indigo-400 text-white transition hover:bg-inherit hover:text-black"
        }`}
      >
        Previous
      </button>
      <span className='self-center'>
        Page {thisPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={thisPage === totalPages}
        className={`text-foreground rounded-md border px-4 py-1 text-lg font-normal ${
          thisPage === totalPages
            ? "cursor-not-allowed bg-gray-300"
            : "border-xl bg-indigo-400 text-white transition hover:bg-inherit hover:text-black"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
