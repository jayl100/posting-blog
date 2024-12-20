import styled from 'styled-components';
import theme from '../theme/theme.ts';

interface Props {
  children: React.ReactNode;
  bottomsize?: string;

}

function Title({ children, bottomsize }: Props) {
  return (
    <TitleStyled bottomsize={bottomsize}>
      { children }
    </TitleStyled>
  );
}

const TitleStyled = styled.h1<Omit<Props, 'children'>>`
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.h1};
    color: #000;
    margin-bottom: ${({ bottomsize }) => bottomsize ? bottomsize : 0};
    text-align: center;
    //font-weight: 700;
    //span {
    //    font-weight: 400;
    //}
`;

export default Title;