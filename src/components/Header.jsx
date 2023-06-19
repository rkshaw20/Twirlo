import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FaTwitter } from 'react-icons/fa';

export const Header = () => {
  return (
    // <div className="header">
      <Box>
        <Flex p={'.4rem'} justifyContent={'space-between'}>
          <IconButton fontSize={'xl'} color={'blue.400'} icon={<FaTwitter />} />
          <Heading color={'blue.400'}>Twirlo</Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>

        <hr />
      </Box>
    // </div>
  );
};
