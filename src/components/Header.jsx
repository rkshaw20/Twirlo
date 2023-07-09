import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <Box>
      <Flex
        p={{ base: '.2rem', lg: '.4rem' }}
        justifyContent={{ base: 'space-between', lg: 'space-between' }}
      >
        <Link to="/">
          <Icon as={FaTwitter} fontSize="2xl" m={2} color={'blue.400'} />
        </Link>
        <Link to="/">
          <Heading color={'blue.400'}>Twirlo</Heading>
        </Link>
        <ColorModeSwitcher />
      </Flex>

      <hr />
    </Box>
  );
};
