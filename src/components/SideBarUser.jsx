import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { followUser } from '../services/DataServices';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getSingleUserDetail } from '../services/AuthServices';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SideBarUser = ({ userInfo ,isSearch }) => {
  const { token, user, setUser } = useAuthContext();
  const { setLoader, loader } = useDataContext();
  const { _id, firstName,lastName, username, pic } = userInfo;

  const handleFollow = async () => {
    try {
      setLoader(true)
      await followUser(token, _id);
      const userData =await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      setLoader(false)
    } catch (error) {
      console.log('Error in following', error);
    }
  };
  return (
    <Flex align="center" mt={3}>
      <Avatar src={pic} />
      <Box ml="2">
        <Link to={`/profile/${_id}`} fontSize="md" fontWeight="bold">
          {`${firstName} ${lastName}`}
        </Link>
        <Text fontSize="xs">@{username}</Text>
      </Box>
      {!isSearch &&  <Button
        colorScheme="twitter"
        ml="auto"
        rounded="3xl"
        onClick={handleFollow}
      >
        Follow
      </Button>}
     
    </Flex>
  );
};
export default SideBarUser;
