import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    primary: '#F42A67',
    secondary: '#222',
    lightGrey: '#999',
    mediumGrey: '#444',
    d9: '#d9d9d9',
    f9: '#f9f9f9',
  },
  backgroundColor: {
    primary: '#fff',
    f9: '#f9f9f9',
  },
  fontSize: {
    h1: '3rem',
    h2: '2rem',
    h3: '1.3rem',
    text: '1.1rem',
  },
  borderRadius: {
    default: '12px',
  },
  width: {
    default: '1200px',
  },
  mediaQuery: {
    mobile: '(max-width: 768px)', // 768px 이하 에서 동작
    tablet: '(max-width: 1024px)', // 1024 px 이하에서 동작
    desktop: '(min-width: 1025px)', // 1025px 이상에서 동작
  },
  buttons: {
    filled: {
      width: '160px',
      height: '50px',
      fontSize: '16px',
      fontWeight: 700,
      backgroundColor: '#222',
      border: 0,
      color: '#fff',
      hover: {
        backgroundColor: '#F42A67',
      }
    },
    outlined: {
      width: '160px',
      height: '50px',
      fontSize: '16px',
      fontWeight: 700,
      backgroundColor: '#fff',
      border: '2px solid #222',
      color: '#222',
      hover: {
        backgroundColor: '#fff',
        color: '#F42A67',
        border: '2px solid #F42A67',
      }
    },
    sFilled: {
      width: '100px',
      height: '40px',
      fontSize: '14px',
      fontWeight: 600,
      backgroundColor: '#222',
      border: 0,
      color: '#fff',
      hover: {
        backgroundColor: '#F42A67',
      }
    },
    sOutlined: {
      width: '100px',
      height: '40px',
      fontSize: '14px',
      fontWeight: 600,
      backgroundColor: '#fff',
      border: '2px solid #222',
      color: '#222',
      hover: {
        backgroundColor: '#fff',
        color: '#F42A67',
        border: '2px solid #F42A67',
      }
    },
  },
};


export default theme;
