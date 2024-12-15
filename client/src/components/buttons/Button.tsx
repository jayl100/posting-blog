import styled from 'styled-components';
import { ButtonStyle } from '../../theme/styled';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  button: ButtonStyle;
}

function Button({ children, button, ...rest }: Props) {
  return (
    <ButtonStyled button={ button } { ...rest } >
      { children }
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<Omit<Props, 'children'>>`
    width: ${ ({ theme, button }) => theme.buttons[button].width };
    height: ${ ({ theme, button }) => theme.buttons[button].height };
    font-size: ${ ({ theme, button }) => theme.buttons[button].fontSize };
    font-weight: ${ ({ theme, button }) => theme.buttons[button].fontWeight };
    background-color: ${ ({ theme, button }) => theme.buttons[button].backgroundColor };
    border: ${ ({ theme, button }) => theme.buttons[button].border };
    color: ${ ({ theme, button }) => theme.buttons[button].color };
    border-radius: 999px;
    
    &:hover {
        background-color: ${({ theme, button }) => theme.buttons[button].hover.backgroundColor};
        color: ${({ theme, button }) => theme.buttons[button].hover.color};
        border: ${ ({ theme, button }) => theme.buttons[button].hover.border };
    }

`;

export default Button;
