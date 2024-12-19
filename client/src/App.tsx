import GlobalStyle from './theme/globalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import theme from './theme/theme.ts';
import router from './routes/Route.tsx';
import AuthProvider from './contexts/AuthProvider.tsx';
import { PostProvider } from './contexts/postContext.tsx';

function App() {

  return (
    <>
      <PostProvider>
        <AuthProvider>
          <ThemeProvider theme={ theme }>
            <RouterProvider router={ router } />
            <GlobalStyle />
          </ThemeProvider>
        </AuthProvider>
      </PostProvider>
    </>
  );
}

export default App;
