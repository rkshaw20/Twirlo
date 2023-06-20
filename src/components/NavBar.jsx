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
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Spacer } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

export const NavBar = () => {
  const flexDirection = useBreakpointValue({ base: 'row', lg: 'column' });

  return (
    <>
      <Flex
        flexDir={flexDirection}
        justify="space-between"
        p={{ base: '.2rem', lg: '1rem' }}
      >
        <Stack spacing={3} p="1rem" flexDir={flexDirection}>
          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/"
              display="inline-flex"
              justifyContent=""
              alignItems="center"
              _hover={{ backgroundColor: 'blue.400' }}
              rounded="3xl"
              w={{base:'50px', lg:'150px'}}
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
              _hover={{ backgroundColor: 'blue.400' }}
              rounded="3xl"
              w={{base:'50px', lg:'150px'}}
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

          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/bookmark"
              display="inline-flex"
              // justifyContent='center'
              alignItems="center"
              _hover={{ backgroundColor: 'blue.400' }}
              rounded="3xl"
              w={{base:'50px', lg:'150px'}}
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

          <Flex alignItems="center">
            <Link
              as={ReachLink}
              to="/profile"
              display="inline-flex"
              // justifyContent='center'
              alignItems="center"
              _hover={{ backgroundColor: 'blue.400' }}
              rounded="3xl"
              w={{base:'50px', lg:'150px'}}
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

        <Stack pt={5} p="1rem">
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
        <Stack pt={5} p="1rem">
          <Flex>
            <Avatar src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg" />
            <Box ml="3">
              <Text fontWeight="bold">Raj</Text>
              <Text fontSize="sm">@RajKishorShaw17</Text>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
