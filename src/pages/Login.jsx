import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  useToast,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';

import { loginService } from '../services/AuthServices';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useState } from 'react';
import { setLocalStorage } from '../utils/utils';
import jwtDecode from 'jwt-decode';
import { useDataContext } from '../contexts/DataContextProvider';

const Login = () => {
  const { setToken } = useAuthContext();
  const { loader, setLoader } = useDataContext();

  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const toast = useToast();

  const guestUser = {
    email: 'rajshaw@continental.com',
    password: 'password',
  };

  const handleUserInput = e => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const hanldeGuestLogin = e => {
    setUserInput(guestUser);
    handleFormSubmit(e, guestUser);
  };

  const handleFormSubmit = async (e, input) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { token } = await loginService(input);
      setLocalStorage('token', token);
      setToken(token);
      setLoader(false);
      toast({
        title: 'Logged In!',
        description: 'Welcome to Twirlo!',
        status: 'success',
        duration: 9000,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH="100dvh"
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} color={'blue.400'}>
            Welcome to Twirlo
          </Heading>
        </Stack>
        <Box
          w={{ base: 'xs', lg: 'lg' }}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack  >
            <form onSubmit={e => handleFormSubmit(e, userInput)}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={userInput.email}
                  onChange={handleUserInput}
                  required
                  mb={2}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={userInput.password}
                  onChange={handleUserInput}
                  required
                />
              </FormControl>
              <Stack spacing={3}>
                <Button
                  type="submit"
                  isLoading={loader ? true : false}
                  loadingText="signing in"
                  mt={3}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
                <Button
                  isLoading={loader ? true : false}
                  loadingText="signing in"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={hanldeGuestLogin}
                >
                  Sign in as a Guest
                </Button>
              </Stack>
              <Stack mt={2} >
                <Text align={'center'}>
                  New User?{' '}
                  <Link color={'blue.400'} as={ReachLink} to="/signup">
                    Signup
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
