import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect } from 'react';

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Grid
      bg={useColorModeValue('gray.50', 'gray.800')}
      minH="100dvh"
      templateColumns={{ base: 'auto 1fr', lg: '1fr 3fr 1fr' }} 
      templateRows={{
        base: 'auto calc(100dvh - 56.8px - 82.4px) auto', 
        lg: '56.8px calc(100dvh - 56.8px)',
      }}
      templateAreas={{
        base: `"header header header" 
                "main main main"
                "nav nav nav"`,
        lg: `"header header header"
                    "nav main aside"`,
      }}
    >
      <GridItem as={'header'} area="header" top="0">
        <Header />
      </GridItem>
      <GridItem as={'nav'} area="nav">
        <NavBar />
      </GridItem>
      <GridItem
        scrollBehavior="smooth"
        as={'main'}
        area={'main'}
        overflowY="scroll"
        
      >
        <Outlet />
      </GridItem>
      <GridItem
        as={'aside'}
        area={'aside'}
        display={{ base: 'none', lg: 'block' }}
      >
        <SideBar />
      </GridItem>
    </Grid>
  );
};

export default RootLayout;
