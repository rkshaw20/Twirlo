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
  useToast,
} from '@chakra-ui/react';

import { BiImageAdd } from 'react-icons/bi';
import { CloseIcon } from '@chakra-ui/icons';

import { useAuthContext } from '../contexts/AuthContextProvider';
import { useState } from 'react';
import { useDataContext } from '../contexts/DataContextProvider';
import { createNewPost, editPost, getAllPost, getAllPostOfUser } from '../services/DataServices';
import { getSingleUserDetail } from '../services/AuthServices';
import { uploadMedia } from '../utils/utils';
import EmojiPopover from './EmojiPopover';
import { useParams } from 'react-router-dom';


const TweetModal = ({ isOpen, onClose, post, isEdit }) => {
  const { user, setUser, token } = useAuthContext();
  const { setLoader, dispatch } = useDataContext();
  const initialInputValue = { content: '', imageUrl: '' };
  // const [inputValue, setInputValue] = useState(isEdit ? {content:post.content, imageUrl:post.imageUrl} : initialInputValue);
  const [inputValue, setInputValue] = useState(isEdit ? post : initialInputValue);
  const [uploadLoader, setUploadLoader] = useState(false);
  const toast=useToast();
  const { userId: userIdFromParam } = useParams();


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
        }),toast
    });
    setUploadLoader(false);
  };

  const onEmojiClick = e => {
    setInputValue(prev => ({ ...prev, content: prev.content + e.emoji }));
  };
  const emptyInput = () => {
    onClose();
    setInputValue(isEdit ? post: initialInputValue);
  };

  const hanldeImageRemove = () => {
    setInputValue(prev => ({ ...prev, imageUrl: '' }));
  };
  const btnDisable =
    inputValue?.content?.trim().length === 0 ||
    inputValue.content.trim().length > 280;

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
      if(userIdFromParam===user._id){
        await getAllPostOfUser(token, user._id, dispatch);
      }
      setInputValue(initialInputValue);
      setLoader(false);
    } catch (error) {
      console.log('Error in posting tweet');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={emptyInput}>
      <ModalOverlay />
      <ModalContent m="1rem">
        <ModalHeader>{isEdit ? 'Edit Tweet' : 'Tweet'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={e => handleFormSubmit(e)}>
          <ModalBody>
            <Flex gap={2}>
              <Box>
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
              <Box h="5rem" w="8rem" position="relative">
                <Image src={inputValue.imageUrl} maxH='80px' w='full' objectFit="contain" />
                <Box>
                  <IconButton
                    icon={<CloseIcon />}
                    rounded="full"
                    size="xs"
                    onClick={hanldeImageRemove}
                    position='absolute'
                    top={0}
                    right={0}
                    zIndex= '999'

                  />
                </Box>
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
                    accept="image/png, image/jpeg, image/jpg, video/*"
                    onChange={handleImageInput}
                  />
                </FormControl>
                <EmojiPopover onEmojiClick={onEmojiClick} />
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
