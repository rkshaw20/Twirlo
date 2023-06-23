import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { BiImageAdd } from 'react-icons/bi';

const TweetModal = ({ isOpen, onClose }) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tweet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box>
              <Avatar src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg" />
            </Box>
            <Box flexGrow={1}>
              <Textarea h="full" ml={2} p={2} border='none' outline='none' resize='none'  focusBorderColor='transparent' placeholder='What is happening?!' />
            </Box>
          </Flex>
        </ModalBody>
        <Divider borderColor="gray.500" />
        <ModalFooter p={2}>
          <Flex w="full">
            <Flex alignItems="center" ml={2} gap={2}>
              <FormControl display="flex" alignItems="center" width="1rem">
                <FormLabel m={0} cursor="pointer">
                  <Icon as={BiImageAdd} />
                </FormLabel>
                <Input
                  type="file"
                  display="none"
                  accept="image/*"
                  //   onChange={onUploadClick}
                />
              </FormControl>{' '}
            </Flex>
            <Spacer />
            <Button colorScheme="twitter" borderRadius="full">
              Tweet
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TweetModal;
