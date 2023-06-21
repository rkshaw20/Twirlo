import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const users = [
  {
    id: 1,
    src: 'https://bit.ly/dan-abramov',
    name: 'Roland',
    userName: '@RolandPatro',
  },
  {
    id: 2,
    src: 'https://bit.ly/tioluwani-kolawole',
    name: 'John',
    userName: '@JohnDoe',
  },
  {
    id: 3,
    src: 'https://bit.ly/kent-c-dodds',
    name: 'Emily',
    userName: '@EmilySmith',
  },
  {
    id: 4,
    src: 'https://bit.ly/ryan-florence',
    name: 'Michael',
    userName: '@MichaelJohnson',
  },
  {
    id: 5,
    src: 'https://bit.ly/prosper-baba',
    name: 'Sarah',
    userName: '@SarahBrown',
  },
  {
    id: 6,
    src: 'https://bit.ly/code-beast',
    name: 'David',
    userName: '@DavidWilliams',
  },
  {
    id: 7,
    src: 'https://bit.ly/sage-adebayo',
    name: 'Emma',
    userName: '@EmmaJones',
  },
];

const SideBar = () => {
  return (
    <Flex height="full" p={3} direction="column">
      <Heading size="md">Who to Follow</Heading>
      <Stack mt={4}>
        <Flex direction='column'  >
          {users.map(({ id, src, name, userName }) => (
            <Flex align="center" key={id} mt={3} >
              <Avatar src={src} />
              <Box ml="2">
                <Text fontSize="md" fontWeight="bold">
                  {name}
                </Text>
                <Text fontSize="xs">{userName}</Text>
              </Box>
              <Button colorScheme="twitter" ml="auto" rounded="3xl">
                Follow
              </Button>{' '}
            </Flex>
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SideBar;
