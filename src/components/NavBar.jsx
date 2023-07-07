import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  color,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Spacer } from '@chakra-ui/react';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import TweetModal from './TweetModal';
import { removeLocalStorage } from '../utils/utils';
import { useAuthContext } from '../contexts/AuthContextProvider';

export const NavBar = () => {
  const { user, setUser, setToken } = useAuthContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  const flexDirection = useBreakpointValue({ base: 'row', lg: 'column' });
  const toast=useToast();

  const handleLogout = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    setUser(null);
    setToken(null);
    toast({
      title: 'Logged Out!',
      status: 'error',
      duration: 9000,
    });
  };

  return (
    <>
      <Flex
        height="full"
        flexDir={flexDirection}
        justify="space-between"
        p={{ base: '', lg: '1rem' }}
      >
        <Flex
          height="full"
          w="full"
          spacing={3}
          p={{ base: '.2rem', lg: '1rem' }}
          flexDir={flexDirection}
          justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link
              as={ReachLink}
              to="/"
              display="inline-flex"
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
              _activeLink={{
                transition: 'none',
                fontWeight: 'bold',
                color: 'blue.400',
              }}
            >
              <Icon fontSize="1.5rem" as={AiFillHome} />
              <Text
                p={2}
                fontSize="1.3rem"
                display={{ base: 'none', lg: 'block' }}
              >
                Home
              </Text>
            </Link>
          </Flex>

          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/explore"
              display="inline-flex"
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
              _activeLink={{
                transition: 'none',
                fontWeight: 'bold',
                color: 'blue.400',
              }}
            >
              <Icon fontSize="1.5rem" as={FaSearch} />
              <Text
                p={2}
                fontSize="1.3rem"
                display={{ base: 'none', lg: 'block' }}
              >
                Explore
              </Text>
            </Link>
          </Flex>

          <Flex order={{ base: '', lg: '5' }} p=".6rem 0">
            <IconButton
              display={{ base: 'block', lg: 'none' }}
              rounded="3xl"
              size="lg"
              color="blue.400"
              variant="ghost"
              mb="-10"
              icon={<AiFillPlusCircle fontSize="3rem" />}
              onClick={onOpen}
            />
            <Button
              display={{ base: 'none', lg: 'block' }}
              rounded="3xl"
              size="lg"
              width="200px"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={onOpen}
            >
              <Text>Tweet</Text>
            </Button>
            <TweetModal isOpen={isOpen} onClose={onClose} />
          </Flex>

          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/bookmark"
              display="inline-flex"
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
              _activeLink={{
                transition: 'none',
                fontWeight: 'bold',
                color: 'blue.400',
              }}
            >
              <Icon fontSize="1.5rem" as={BsFillBookmarkFill} />
              <Text
                p={2}
                fontSize="1.3rem"
                display={{ base: 'none', lg: 'block' }}
              >
                Bookmark
              </Text>
            </Link>
          </Flex>

          <Flex alignItems="center" display={{ base: 'none', lg: 'block' }}>
            <Link
              as={ReachLink}
              to={`/profile/${user?._id}`}
              display="inline-flex"
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
              _activeLink={{
                transition: 'none',
                fontWeight: 'bold',
                color: 'blue.400',
              }}
            >
              <Icon fontSize="1.5rem" as={CgProfile} />
              <Text
                p={2}
                fontSize="1.3rem"
                display={{ base: 'none', lg: 'block' }}
              >
                Profile
              </Text>
            </Link>
          </Flex>

          <Flex
            display={{ base: 'block', lg: 'none' }}
            rounded="2rem"
            p={{ base: '', lg: '.5rem' }}
            pt={2}
            width={{ base: '', lg: '250px' }}
            cursor="pointer"
            order="6"
          >
            <Popover>
              <PopoverTrigger>
                <Button h="60px" w="60px" rounded="full">
                  <Avatar size={{ base: 'md', lg: 'md' }} src={user?.pic} />
                </Button>
              </PopoverTrigger>
              <PopoverContent height="70px" w="100px" mr={2}>
                <PopoverArrow />
                <PopoverBody>
                  <Box>
                    <Link as={ReachLink} to={`/profile/${user?._id}`}>
                      Profile
                    </Link>
                  </Box>
                  <Divider />
                  <Box onClick={handleLogout}>Logout</Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>

        <Stack
          display={{ base: 'none', lg: 'block' }}
          pt={5}
          p={{ base: '.5rem', lg: '1rem' }}
          width={{ base: '', lg: '250px' }}
          cursor="pointer"
        >
          <Menu isLazy>
            <MenuButton>
              <Flex
                rounded="2rem"
                _hover={{ bg: bgColor }}
                p={{ base: '', lg: '.5rem' }}
                border="1px solid gray"
              >
                <Avatar size={{ base: 'md', lg: 'md' }} src={user?.pic} />
                <Box ml="3" minW="100px">
                  <Text fontWeight="bold">{user?.firstName}</Text>
                  <Text fontSize="sm">@{user?.username}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList placement="top-start">
              
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </>
  );
};
