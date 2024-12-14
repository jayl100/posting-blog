import GlobalStyle from './theme/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import theme from './theme/theme.ts';
import router from './routes/route.tsx';

function App() {

  return (
    <>
      <ThemeProvider theme={ theme }>
        <RouterProvider router={ router } />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
