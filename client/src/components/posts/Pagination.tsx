import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


  return (
    <>
      <PaginationStyled>
        <button
          onClick={ () => onPageChange(currentPage - 1) }
          disabled={ currentPage === 1 }
        >
          <FaArrowLeft />
        </button>
        { pages.map((page) => (
          <button
            key={ page }
            onClick={ () => onPageChange(page) }
            className={ page === currentPage ? 'active' : 'unactive' }
          >
            { page }
          </button>
        )) }
        <button
          onClick={ () => onPageChange(currentPage + 1) }
          disabled={ currentPage === totalPages }
        >
          <FaArrowRight />
        </button>
      </PaginationStyled>
    </>
  );
}

const PaginationStyled = styled.div`
    width: 100%;
    margin-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        height: 30px;
        width: 30px;
        background-color: white;
            // color: ${ ({ theme }) => theme.color.lightGrey };
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled {
            color: ${ ({ theme }) => theme.color.d9 };;
        }
    }

    .active {
        background-color: #fff4f8;
        color: ${ ({ theme }) => theme.color.primary };
        font-weight: 700;
        border: 1px solid ${ ({ theme }) => theme.color.primary };
        border-radius: 4px;
    }

    .unactive {
        color: ${ ({ theme }) => theme.color.lightGrey };

    }
`;

export default Pagination;
