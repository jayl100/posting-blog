import styled from 'styled-components';

function Loading() {
  return (
    <LoadingStyled>
      <div>hello</div>
    </LoadingStyled>
  );
}

const LoadingStyled = styled.div`
  height: 100vh;
    background-color: #121212;

`;

export default Loading;