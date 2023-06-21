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
import { AiOutlineTwitter } from 'react-icons/ai';

export const Header = () => {
  return (
    // <div className="header">
      <Box>
        <Flex p={{ base:'.2rem'  ,lg:'.4rem'}} justifyContent={{base:'space-between' ,lg:'space-between'}}>
          <IconButton  fontSize={'xl'} color={'blue.400'} icon={<AiOutlineTwitter />} />
          <Heading color={'blue.400'}>Twirlo</Heading>
          <ColorModeSwitcher  />
        </Flex>

        <hr />
      </Box>
    // </div>
  );
};
