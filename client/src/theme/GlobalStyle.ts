import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }
    body{
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

        font-size: 1rem;
        line-height: 1.2;
        font-weight: 400;
        background-color: #fff;
        color: #000;
    }
    button{
        cursor: pointer;
        border: none;
    }
    a{
        color: inherit;
    }
`

export default GlobalStyle;