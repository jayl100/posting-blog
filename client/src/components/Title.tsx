import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  marginBottom?: string;

}

function Title({ children, marginBottom }: Props) {
  return (
    <TitleStyled marginBottom={marginBottom}>
      { children }
    </TitleStyled>
  );
}

const TitleStyled = styled.h1<Omit<Props, 'children'>>`
    font-size: ${({ theme }) => theme.fontSize.h1};
    color: #000;
    margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : 0};
    text-align: center;
`;

export default Title;