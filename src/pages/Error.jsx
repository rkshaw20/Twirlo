import { Button, Flex, Heading } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link as ReachLink } from 'react-router-dom';

const Error = () => {
  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap={3}
    >
      <Heading fontSize="3xl">404 | Page Not Found</Heading>
      <Button
        as={ReachLink}
        to="/"
        leftIcon={<AiFillHome />}
        colorScheme="teal"
        variant="solid"
      >
        Back to home
      </Button>{' '}
    </Flex>
  );
};

export default Error;
