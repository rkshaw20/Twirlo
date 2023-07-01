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
import { createNewPost, editPost, getAllPost } from '../services/DataServices';
import { getSingleUserDetail } from '../services/AuthServices';

const initialInputValue = { content: '', imageUrl: '' };

const TweetModal = ({ isOpen, onClose, post, isEdit }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, token } = useAuthContext();
  const { loader, setLoader, dispatch } = useDataContext();
  const [inputValue, setInputValue] = useState(post || initialInputValue);

  // if(isEdit){
  //   console.log(inputValue?._id);

  // }
  const handlepostInput = e => {
    setInputValue(prevValue => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(inputValue)

  const btnDisable =
    inputValue?.content?.trim().length === 0 ||
    inputValue.content.trim().length > 240;

  const handleFormSubmit = async e => {
    e.preventDefault();

    console.log(inputValue);
    try {
      setLoader(true);

      if (isEdit) {
        await editPost(token, inputValue, dispatch);
      } else {
        await createNewPost(token, inputValue);
        const userData = await getSingleUserDetail(token, user._id);
        setUser(userData.user);
      }
      // const userData = await getSingleUserDetail(token, user._id);
      // setUser(userData.user);
      emptyInput();
      setLoader(false);
    } catch (error) {
      console.log('Error in posting tweet');
    }
  };

  const emptyInput = () => {
    onClose();
    setInputValue(post || initialInputValue);
  };

  return (
    <Modal isOpen={isOpen} onClose={emptyInput}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit Tweet' : 'Tweet'}</ModalHeader>
        <ModalCloseButton />
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
                {isEdit ? 'Edit Tweet' : 'Tweet'}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default TweetModal;
