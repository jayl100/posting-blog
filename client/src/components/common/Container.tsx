import styled from 'styled-components';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

interface Props {
  children: React.ReactNode;
  width: number;
}

function Container({ children, width }: Props) {
  return (
    <>
      <Header />
      <ContainerStyled width={ width }>
        { children }
      </ContainerStyled>
      <Footer />
    </>
  )
}

const ContainerStyled = styled.div<Props>`
    max-width: ${ (props) => props.width }px;
    margin: 0 auto;
    height: 100px;
`;

export default Container;