import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import usePagination from '../../hooks/usePagination.ts';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const visiblePages = usePagination(currentPage, totalPages, 5);

  return (
    <>
      <PaginationStyled>
        <button
          onClick={ () => onPageChange(1) }
          disabled={ currentPage === 1 }
        >
          <RiArrowLeftDoubleFill className="icon" />
        </button>
        <button
          onClick={ () => onPageChange(currentPage - 1) }
          disabled={ currentPage === 1 }
        >
          <FaArrowLeft />
        </button>
        { visiblePages.map((page) => (
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
        <button
          onClick={ () => onPageChange(totalPages) }
          disabled={ currentPage === totalPages }
        >
          <RiArrowRightDoubleFill className="icon" />
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
            // color: ${({ theme }) => theme.color.lightGrey};
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled {
            color: ${({ theme }) => theme.color.d9};;
        }

        .icon {
            width: 20px;
            height: 20px;
        }
    }

    .active {
        background-color: #f4f7ff;
        color: ${({ theme }) => theme.color.primary};
        font-weight: 700;
        border: 1px solid ${({ theme }) => theme.color.primary};
        border-radius: 4px;
    }

    .unactive {
        color: ${({ theme }) => theme.color.lightGrey};

    }


`;

export default Pagination;
