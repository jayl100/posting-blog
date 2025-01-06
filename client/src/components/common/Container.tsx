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
      <div>
      <ContainerSetting width={ width }>
        <ContainerStyled>
          { children }
        </ContainerStyled>
      </ContainerSetting>
      </div>
      <Footer />
    </>
  );
}

const ContainerSetting = styled.div<Props>`
    max-width: ${ (props) => props.width }px;
    width: 100%;

    margin: 0 auto;
    padding: 0 20px;
`;

const ContainerStyled = styled.div`
    width: 100%;
    margin: 100px 0;
`;


export default Container;