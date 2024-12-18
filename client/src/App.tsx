import GlobalStyle from './theme/globalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import theme from './theme/theme.ts';
import router from './routes/Route.tsx';
import AuthProvider from './contexts/AuthProvider.tsx';

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={ theme }>
          <RouterProvider router={ router } />
          <GlobalStyle />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
