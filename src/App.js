import React from 'react';
import {
  ChakraProvider,

  theme,
} from '@chakra-ui/react';

import {  RouterProvider,  createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './components/RootLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Bookmark from './pages/Bookmark';
import UserProfile from './pages/UserProfile';
import PostDetails from './pages/PostDetails';




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
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/post', element: <PostDetails /> },
      { path: '/explore', element: <Explore /> },
      { path: '/bookmark', element: <Bookmark /> },
      { path: '/profile', element: <UserProfile /> },
    ],
  },
]);


function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}


export default App;
