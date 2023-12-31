import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getSingleUserDetail, updateUserInfo } from '../services/AuthServices';
import { useState } from 'react';
import { uploadMedia } from '../utils/utils';
import { UserUpdateMenu } from './UserUpdateMenu';

const UserInfoModal = ({ isOpen, onClose }) => {
  const { user, setUser, token } = useAuthContext();
  const { setLoader } = useDataContext();
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    pic: user.pic,
    link: user.link,
    bio: user.bio,
  });
  const [uploadLoader, setUploadLoader] = useState(false);

  const handleInput = e => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarSelect = e => {
    setUserInfo(prev => ({ ...prev, pic: e.target.src }));
  };
  const emptyInput = () => {
    onClose();
    setUserInfo(user);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      setLoader(true);
      await updateUserInfo(token, userInfo);
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      onClose();
      setLoader(false);
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  const handleImageInput = async e => {
    setUploadLoader(true);
    await uploadMedia({
      media: e.target.files[0],
      updatePic: ({ cloudinaryURL }) =>
        setUserInfo({
          ...userInfo,
          pic: cloudinaryURL,
        }),
    });
    setUploadLoader(false);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={emptyInput}>
      <ModalOverlay />
      <ModalContent w={{ base: '90vw' }}>
        <ModalHeader p={2}>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={e => handleFormSubmit(e)}>
          <ModalBody pb={6}>
            <Flex>
              <Box position="relative">
                <Avatar size="xl" src={userInfo.pic} />
                <Box position="absolute" bottom="0" right="-.5rem">
                  <UserUpdateMenu
                    handleAvatarSelect={handleAvatarSelect}
                    handleImageInput={handleImageInput}
                  />
                </Box>
              </Box>
            </Flex>
            <FormControl mt={4}>
              <Input
                placeholder="First name"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Last name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="link"
                name="link"
                value={userInfo.link}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder="bio"
                name="bio"
                value={userInfo.bio}
                onChange={handleInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter p="0 1rem 1rem 1rem">
            <Button colorScheme="blue" mr={3} type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
