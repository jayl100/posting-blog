import styled from 'styled-components';
import { buttontypes } from '../../theme/styled';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttontype: buttontypes;
}

function Button({ children, buttontype, ...rest }: Props) {
  return (
    <ButtonStyled buttontype={ buttontype } { ...rest } >
      { children }
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<Omit<Props, 'children'>>`
    width: ${ ({ theme, buttontype }) => theme.buttons[buttontype].width };
    height: ${ ({ theme, buttontype }) => theme.buttons[buttontype].height };
    font-size: ${ ({ theme, buttontype }) => theme.buttons[buttontype].fontSize };
    font-weight: ${ ({ theme, buttontype }) => theme.buttons[buttontype].fontWeight };
    background-color: ${ ({ theme, buttontype }) => theme.buttons[buttontype].backgroundColor };
    border: ${ ({ theme, buttontype }) => theme.buttons[buttontype].border };
    color: ${ ({ theme, buttontype }) => theme.buttons[buttontype].color };
    border-radius: 999px;
    
    &:hover {
        background-color: ${({ theme, buttontype }) => theme.buttons[buttontype].hover.backgroundColor};
        color: ${({ theme, buttontype }) => theme.buttons[buttontype].hover.color};
        border: ${ ({ theme, buttontype }) => theme.buttons[buttontype].hover.border };
    }

`;

export default Button;
