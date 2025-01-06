import 'styled-components';

export type buttontypes = 'filled' | 'outlined' | 'sFilled' | 'sOutlined';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      lightGrey: string;
      mediumGrey: string;
      d9: string;
      f9: string;
      error: string;
    },
    backgroundColor: {
      primary: string;
      f9: string;
    },
    fontSize: {
      h1: string;
      h2: string;
      h3: string;
      text: string;
    }
    borderRadius: {
      default: string;
    },
    width: {
      default: string,
    },
    mediaQuery: {
      mobile: string;
      tablet: string;
      desktop: string;
    },
    buttons: {
      [key in buttontypes]: {
        width: string;
        height: string;
        fontSize: string;
        fontWeight: number;
        backgroundColor: string;
        border: number | string;
        color: string;
        hover: {
          backgroundColor: string;
          color?: string;
          border?: number | string;
        };
      }
    }
  }
}