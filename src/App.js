import React, { Suspense, lazy } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { RequireAuth } from './components/RequireAuth';
import theme from './styles/theme';
import Error from './pages/Error';
import TwirloSpinner from './components/TwirloSpinner';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Bookmark = lazy(() => import('./pages/Bookmark'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const RootLayout = lazy(() => import('./components/RootLayout'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/',
    errorElement: <Error />,
    element: (
      <RequireAuth>
        <Suspense fallback={<TwirloSpinner />}>
          <RootLayout />
        </Suspense>
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<TwirloSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/explore',
        element: (
          <Suspense fallback={<TwirloSpinner />}>
            <Explore />{' '}
          </Suspense>
        ),
      },
      {
        path: '/bookmark',
        element: (
          <Suspense fallback={<TwirloSpinner />}>
            <Bookmark />{' '}
          </Suspense>
        ),
      },
      {
        path: '/profile/:userId',
        element: (
          <Suspense fallback={<TwirloSpinner />}>
            <UserProfile />{' '}
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
