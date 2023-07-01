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
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useState } from 'react';
import { useDataContext } from '../contexts/DataContextProvider';
import { createNewPost, getAllPost } from '../services/DataServices';
import { getSingleUserDetail } from '../services/AuthServices';


const initialInputValue={ content: '', imageUrl: '' };

const TweetModal = ({ isOpen, onClose }) => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
  const { user,setUser, token } = useAuthContext();
  const { loader, setLoader, dispatch } = useDataContext();
  const [inputValue, setInputValue] = useState(initialInputValue);

  const handlepostInput = e => {
    setInputValue((prevValue)=>({ ...prevValue, [e.target.name]: (e.target.value) }));
  };
  const btnDisable=inputValue?.content?.trim().length === 0 || inputValue.content.trim().length > 240;

  const emptyInput=()=>setInputValue(initialInputValue);
  const handleFormSubmit = async e => {
    e.preventDefault();

    console.log(inputValue);
    try {
      setLoader(true);
      await createNewPost(token, inputValue);
      // await getAllPost(token, dispatch);
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      emptyInput();
      setLoader(false);
    } catch (error) {
      console.log('Error in posting tweet');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tweet</ModalHeader>
        <ModalCloseButton onClick={emptyInput} />
        <form onSubmit={e => handleFormSubmit(e)}>
          <ModalBody>
            <Flex>
              <Box>
                <Avatar src={user?.pic} />
              </Box>
              <Box flexGrow={1}>
                <Textarea
                  h="full"
                  ml={2}
                  p={2}
                  border="none"
                  outline="none"
                  resize="none"
                  focusBorderColor="transparent"
                  placeholder="What is happening?!"
                  name="content"
                  onChange={handlepostInput}
                  value={inputValue.content}
                />
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
              <Button
                colorScheme="twitter"
                borderRadius="full"
                type="submit"
                onClick={onClose}
                isDisabled={btnDisable}
              >
                Tweet
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default TweetModal;
