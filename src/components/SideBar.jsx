import {
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import React   from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import SideBarUser from './SideBarUser';





const SideBar = () => {
  const {token,user}=useAuthContext();
  const {allUser,dispatch,setLoader}=useDataContext();

  if(!user) return;
  const followingUserId = user.following.map(({ _id }) => _id);
  const userAndFollwingUserId = [...followingUserId, user._id];

const userToFollow= allUser.filter((user)=>!userAndFollwingUserId.includes(user._id));
  return (
    <Flex height="full" p={3} direction="column">
      <Heading size="md">Who to Follow</Heading>
      <Stack mt={4}>
        <Flex direction='column'  >
          {userToFollow.map((userInfo) => (
            <SideBarUser key={userInfo._id} userInfo={userInfo} />
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SideBar;
