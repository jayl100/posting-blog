import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colours: {
    primary: '#F42A67',
    secondary: '#222',
    lightGrey: '#999',
    mediumGrey: '#444',
    d9: '#d9d9d9',
    f9: '#f9f9f9',
  },
  backgroundColour: {
    primary: '#fff',
    lightGrey: '#f9f9f9',
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
};


export default theme;