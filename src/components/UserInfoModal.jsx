import { Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useAuthContext } from "../contexts/AuthContextProvider";
import { useDataContext } from "../contexts/DataContextProvider";
import { getSingleUserDetail, updateUserInfo } from "../services/AuthServices";
import { useState } from "react";


const UserInfoModal=({isOpen,onClose})=>{
    const { user, setUser, token } = useAuthContext();
    const { setLoader } = useDataContext();
    const [userInfo, setUserInfo] = useState(user);


    const handleInput = e => {
        setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const emptyInput=()=>{
        onClose();
        setUserInfo(user);
      }
    const handleFormSubmit= async(e)=>{
        e.preventDefault();
      try{
        setLoader(true)
        await updateUserInfo(token,userInfo);
        const userData = await getSingleUserDetail(token, user._id);
        setUser(userData.user);
        onClose();
        // emptyInput();
        setLoader(false)
      }catch(error){
        alert("Something went wrong");
      }
      }
    //   if(!userInfo) return;
    return (
        <Modal isOpen={isOpen} onClose={emptyInput}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={e => handleFormSubmit(e)} >
            <ModalBody pb={6}>
              <FormControl>
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
                  placeholder="username"
                  name="username"
                  value={userInfo.username}
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
              <FormControl mt={4}>
                <Input
                  placeholder="pic"
                  name="pic"
                  value={userInfo.pic}
                  onChange={handleInput}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type='submit' >
                Update
              </Button>
              {/* <Button onClick={onClose}>Cancel</Button> */}
            </ModalFooter>
            </form>
          </ModalContent>
          
        </Modal>
    )
}

export default UserInfoModal;