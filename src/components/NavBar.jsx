import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  color,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Spacer } from '@chakra-ui/react';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

export const NavBar = () => {
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  const flexDirection = useBreakpointValue({ base: 'row', lg: 'column' });

  return (
    <>
      <Flex
        height="full"
        flexDir={flexDirection}
        justify={{ base: 'center', lg: 'space-between' }}
        p={{ base: '', lg: '1rem' }}
      >
        <Stack
          spacing={3}
          p={{ base: '.2rem', lg: '1rem' }}
          flexDir={flexDirection}
        >
          <Flex alignItems="center">
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
              // justifyContent='center'
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

          <Flex display={{ base: 'block', lg: 'none' }} alignItems="center">
            <IconButton
              rounded="3xl"
              // colorScheme="teal"
              size="lg"
              bg="blue.400"
              // color="blue.400"
              icon={<AiFillPlusCircle fontSize="2rem" />}
            />
          </Flex>

          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/bookmark"
              display="inline-flex"
              // justifyContent='center'
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
              // justifyContent='center'
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
        </Stack>

        <Stack pt={5} p="1rem" display={{ base: 'none', lg: 'block' }}>
          <Button
            rounded="3xl"
            size="lg"
            width="200px"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Tweet
          </Button>
        </Stack>
        {/* <Spacer /> */}
        <Stack
          pt={5}
          p={{ base: '.5rem', lg: '1rem' }}
          width={{ base: '', lg: '250px' }}
          cursor="pointer"
        >
          <Flex
            rounded="3xl"
            _hover={{ bg: bgColor }}
            p={{ base: '', lg: '.5rem' }}
            
          >
            <Avatar
              size={{ base: 'md', lg: 'md' }}
              src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg"
            />
            <Box ml="3" display={{ base: 'none', lg: 'block' }}>
              <Text fontWeight="bold">Raj</Text>
              <Text fontSize="sm">@RajKishorShaw17</Text>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
