import React from 'react';
import * as St from '../../styles/products/ProductsListStyle';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage
}: Props) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <St.PageNumberStyle>
      <St.PrevNextButton onClick={goToPrevPage} disabled={currentPage === 1}>
        <St.PrevIcon />
      </St.PrevNextButton>
      {pages.map((page) => (
        <St.PageButton
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'page' : ''}
          $currentPage={currentPage}
          pageNumber={page}
        >
          {page}
        </St.PageButton>
      ))}
      <St.PrevNextButton
        onClick={goToNextPage}
        disabled={currentPage === pages.length}
      >
        <St.NextIcon />
      </St.PrevNextButton>
    </St.PageNumberStyle>
  );
};

export default Pagination;
