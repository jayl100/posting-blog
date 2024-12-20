import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    body {
        min-height: 100vh;
        font-size: 1rem;
        line-height: 1.2;
        font-weight: 400;
        background-color: #fff;
        color: #000;
        -ms-overflow-style: none;
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        display: none;
    }

    button {
        cursor: pointer;
        border: none;
    }

    a {
        color: inherit;
    }
    
    input {
        border: none;
        font-size: 1rem;
        line-height: 1.2;
        font-weight: 400;        
        color: inherit;
        &:focus {
            outline: none;
        }
    }
    
    textarea {
        border: none;
        font-size: 1rem;
        line-height: 1.2;
        font-weight: 400;
        color: inherit;
        resize: none;
        &:focus {
            outline: none;
        }
        
    }

`;

export default GlobalStyle;