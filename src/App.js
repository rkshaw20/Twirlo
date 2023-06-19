import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Header } from './components/Header';
import { LoginCard } from './components/LoginCard';
import Home from './pages/Home';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Box > */}
      <Grid minH="100vh" templateRows="auto 1fr">
        <GridItem>
          <Header />
        </GridItem>
        <GridItem><Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginCard />} />
          <Route path="/home" element={<Home />} />
        </Routes></GridItem>
      </Grid>
      {/* </Box> */}
    </ChakraProvider>
  );
}

export default App;
