import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { SignUpService, loginService } from '../services/AuthServices';
import { setLocalStorage } from '../utils/utils';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';

const SignUp = () => {
  const {  setToken } = useAuthContext();
  const {loader,setLoader}=useDataContext();
  const toast=useToast()

  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleUserInput = e =>{
    
    setUserInput({ ...userInput, [e.target.name]: e.target.value });

  }

  const handleFormSubmit = async (e, input) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password, confirmPassword } =
      input;
    if (password !== confirmPassword) {
      return;
    }
    try {
        setLoader(true);
       await SignUpService({
        firstName,
        lastName,
        username,
        email,
        password,
      });
      const { token } = await loginService({ email, password });
      setLocalStorage('token', token);
      setToken(token);
      setLoader(false);
      toast({
        title: 'Account created!',
        description: 'Welcome to Twirlo!',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div className="signup-card">
      <Flex
        minH="100dvh"
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color="blue.400" fontSize={'3xl'} textAlign={'center'}>
              Create your account
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={e => handleFormSubmit(e, userInput)}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        name="firstName"
                        value={userInput.firstName}
                        onChange={handleUserInput}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        name="lastName"
                        value={userInput.lastName}
                        onChange={handleUserInput}
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={userInput.username}
                    onChange={handleUserInput}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={userInput.email}
                    onChange={handleUserInput}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={userInput.password}
                      onChange={handleUserInput}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirm-password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={userInput.confirmPassword}
                      onChange={handleUserInput}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    isLoading ={loader ? true : false}
                    loadingText="signing up"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Link color={'blue.400'} as={ReachLink} to="/login">
                      Login
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default SignUp;
