import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colours: {
      primary: string;
      secondary: string;
      lightGrey: string;
      mediumGrey: string;
      d9: string;
      f9: string;
    },
    backgroundColour: {
      primary: string;
      lightGrey: string;
    },
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
    }
  }
}