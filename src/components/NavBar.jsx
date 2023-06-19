import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  IconButton,
  Stack,
  Text,
  color,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

export const NavBar = () => {
    const flexDirection = useBreakpointValue({ base: 'row', md:'column' });

  return (
    <>
      <Flex direction={flexDirection} justify='space-between' p="1rem">
        <Stack spacing={3}>
          <Box
            rounded="3xl"
            w="150px"
            cursor="pointer"
            _hover={{ backgroundColor: 'blue.400' }}
          >
            <Flex alignItems="center">
              <IconButton rounded="3xl" icon={<AiFillHome />} />{' '}
              <Text p={1}  >Home</Text>
            </Flex>
          </Box>
          <Box
            rounded="3xl"
            w="150px"
            cursor="pointer"
            _hover={{ backgroundColor: 'blue.400' }}
          >
            <Flex alignItems="center">
              <IconButton rounded="3xl" icon={<MdExplore />} />{' '}
              <Text p={1}>Explore</Text>
            </Flex>
          </Box>
          <Box
            rounded="3xl"
            w="150px"
            cursor="pointer"
            _hover={{ backgroundColor: 'blue.400' }}
          >
            <Flex alignItems="center">
              <IconButton rounded="3xl" icon={<AiFillHome />} />{' '}
              <Text p={1}>Bookmark</Text>
            </Flex>
          </Box>
          {/* <Box
            rounded="3xl"
            w="150px"
            cursor="pointer"
            _hover={{ backgroundColor: 'blue.400' }}
          >
            <Flex alignItems="center">
              <IconButton rounded="3xl" icon={<AiFillHome />} />{' '}
              <Text p={1}>Profile</Text>
            </Flex>
          </Box> */}
          {/* <Button
            leftIcon={<CgProfile />}
            rounded="3xl"
            w="150px"
            _hover={{ backgroundColor: 'blue.400' }}
          >
            Profile
          </Button> */}
        </Stack>
        <Stack pt={5}>
          <Button
            rounded="3xl"
            size="lg"
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
        <Stack pt={5}>
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
