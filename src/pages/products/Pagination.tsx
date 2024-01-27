import React, { useEffect } from 'react';
import * as St from '../../styles/products/ProductsListStyle';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectCategory: string[];
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  selectCategory
}: Props) => {
  //const pageList = [];
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // useEffect(() => {
  //   setCurrentPage(1); // 카테고리가 바뀔 때마다 첫 페이지로 리셋
  // }, [selectCategory]);

  // if (totalPosts === undefined) {
  //   // postNum이 undefined일 경우 예외 처리 또는 기본값 설정
  //   console.error("totalPosts is undefined");
  //   return null;
  // }
  //const totalPages = Math.ceil(totalPosts / postsPerPage);

  // for (let i = 1; i <= totalPages; i++) {
  //   pageList.push(i)
  // }

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
