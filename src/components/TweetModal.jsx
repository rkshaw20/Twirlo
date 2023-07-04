import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { BiImageAdd } from 'react-icons/bi';
import {CloseIcon} from '@chakra-ui/icons';

import { useAuthContext } from '../contexts/AuthContextProvider';
import { useState } from 'react';
import { useDataContext } from '../contexts/DataContextProvider';
import { createNewPost, editPost, getAllPost } from '../services/DataServices';
import { getSingleUserDetail } from '../services/AuthServices';
import { uploadMedia } from '../utils/utils';

const initialInputValue = { content: '', imageUrl: '' };

const TweetModal = ({ isOpen, onClose, post, isEdit }) => {
  const { user, setUser, token } = useAuthContext();
  const { setLoader, dispatch } = useDataContext();
  const [inputValue, setInputValue] = useState(post || initialInputValue);
  const [uploadLoader, setUploadLoader] = useState(false);

  const handlepostInput = e => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageInput = async e => {
    setUploadLoader(true);
    await uploadMedia({
      media: e.target.files[0],
      updatePic: ({ cloudinaryURL }) =>
        setInputValue({
          ...inputValue,
          imageUrl: cloudinaryURL,
        }),
    });
    setUploadLoader(false);
  };

  const btnDisable =
    inputValue?.content?.trim().length === 0  ||
    inputValue.content.trim().length > 280;

  const emptyInput = () => {
    onClose();
    setInputValue(post || initialInputValue);
  };

  const hanldeImageRemove = () => {
    setInputValue(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      setLoader(true);

      if (isEdit) {
        await editPost(token, inputValue, dispatch);
      } else {
        await createNewPost(token, inputValue);
        const userData = await getSingleUserDetail(token, user._id);
        setUser(userData.user);
      }
      emptyInput();
      setLoader(false);
    } catch (error) {
      console.log('Error in posting tweet');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={emptyInput} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit Tweet' : 'Tweet'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={e => handleFormSubmit(e)}>
          <ModalBody>
            <Flex gap={2} >
              <Box >
                <Avatar src={user?.pic} name={user?.firstName} />
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
            {uploadLoader && <Spinner />}
            {inputValue.imageUrl && (
              <Box h="6rem" w="10rem">
                <Image src={inputValue.imageUrl} objectFit="contain" />
                <IconButton  icon={<CloseIcon />}  w='full' size='xs' onClick={hanldeImageRemove}/>
              </Box>
            )}
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
                    accept="image/*, video/*"
                    onChange={handleImageInput}
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
