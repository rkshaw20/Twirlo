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
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Spacer } from '@chakra-ui/react';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import TweetModal from './TweetModal';
import { removeLocalStorage } from '../utils/utils';
import { useAuthContext } from '../contexts/AuthContextProvider';

export const NavBar = () => {
  const { setUser, setToken } = useAuthContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  const flexDirection = useBreakpointValue({ base: 'row', lg: 'column' });

  const handleLogout = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    setUser(null);
    setToken(null);
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
              justifyContent=""
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
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
            >
              <Icon fontSize="1.5rem" as={MdExplore} />
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
              to="/profile"
              display="inline-flex"
              alignItems="center"
              _hover={{ backgroundColor: bgColor }}
              rounded="3xl"
              w={{ base: '50px', lg: '150px' }}
              pl="1rem"
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
                  <Avatar
                    size={{ base: 'md', lg: 'md' }}
                    src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent height="70px" w="100px" mr={2}>
                <PopoverBody>
                  <Box> <Link as={ReachLink} to='/profile' >Profile</Link> </Box>
                  <Divider />
                  <Box onClick={handleLogout} >Logout</Box>
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
                <Avatar
                  size={{ base: 'md', lg: 'md' }}
                  src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg"
                />
                <Box ml="3">
                  <Text fontWeight="bold">Raj</Text>
                  <Text fontSize="sm">@RajKishorShaw17</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList placement="top-start">
              {/* MenuItems are not rendered unless Menu is open */}
              {/* <MenuItem>Profile</MenuItem> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </>
  );
};
