import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './components/RootLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Bookmark from './pages/Bookmark';
import UserProfile from './pages/UserProfile';
import { RequireAuth } from './components/RequireAuth';
import theme from './styles/theme';
import Error from './pages/Error';

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
    errorElement:<Error/>,
    element: (
      <RequireAuth>
        <RootLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/bookmark', element: <Bookmark /> },
      { path: '/profile/:userId', element: <UserProfile /> },
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
