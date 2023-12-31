import {
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import React   from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import SideBarUser from './SideBarUser';
import TwirloSpinner from './TwirloSpinner';

const SideBar = () => {
  const {user}=useAuthContext();
  const {allUser}=useDataContext();

  if(!user) return <TwirloSpinner/> ;
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
