import styled from 'styled-components';

function EmptyList() {
  return (
    <EmptyListStyled>
      <p>게시글이 없습니다.</p>
    </EmptyListStyled>
  );
}

const EmptyListStyled = styled.div`
    height: 120px;
    display: flex;
    border-top: 2px solid ${ ({ theme }) => theme.color.secondary };
    border-bottom: 2px solid ${ ({ theme }) => theme.color.secondary };
    text-align: center;
    justify-content: center;
    align-items: center;

    p {
        font-weight: 600;
    }
`;

export default EmptyList;