import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import {
  followUser,
  getAllPostOfUser,
  unfollowUser,
} from '../services/DataServices';
import { useEffect, useState } from 'react';
import { getSingleUserDetail, updateUserInfo } from '../services/AuthServices';
import UserInfoModal from '../components/UserInfoModal';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  const { userId: userIdFromParam } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUser, token } = useAuthContext();
  const { allUser, dispatch, setLoader, userAllPost } = useDataContext();
  const [profile, setProfile] = useState({});

  const isAuthUser = userIdFromParam === user?._id;
  const secondUserDetail = allUser?.find(({ _id }) => _id === userIdFromParam);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdForFetch = isAuthUser ? user?._id : secondUserDetail._id;
        setLoader(true);
        if (isAuthUser) {
          const userData = await getSingleUserDetail(token, user?._id);
          setUser(userData.user);
        }
        await getAllPostOfUser(token, userIdForFetch, dispatch);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userIdFromParam,user]);

  // this is for setting profile details of user
  useEffect(() => {
    if (isAuthUser) {
      setProfile(user);
    } else {
      setProfile(secondUserDetail);
    }
  }, [secondUserDetail]);

  const followingUserId = user.following.map(({ _id }) => _id);
  const userAndFollwingUserId = [...followingUserId, user._id];
  const isFollwing = userAndFollwingUserId.includes(userIdFromParam);

  const handleFollowAndUnfollow = async () => {
    try {
      setLoader(true);
      if (isFollwing) {
        await unfollowUser(token, userIdFromParam);
      } else {
        await followUser(token, userIdFromParam);
      }
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return;
  return (
    <Flex flexDir="column" gap={2} p={2}>
      <Flex flexDir="column">
        <Flex w="full" p={{ base: '', lg: '.5rem' }} justify="space-between">
          <Avatar size={{ base: 'xl', lg: '2xl' }} src={profile?.pic} />
          {isAuthUser ? (
            <Button bgColor={bgColor} onClick={onOpen}>
              Edit Profile
            </Button>
          ) : (
            <Button bgColor="blue.400" onClick={handleFollowAndUnfollow}>
              {isFollwing ? 'Unfollow' : 'Follow'}
            </Button>
          )}

          <UserInfoModal isOpen={isOpen} onClose={onClose} />
        </Flex>
        <Flex flexDir="column" gap={1} p={1}>
          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">
              {`${profile?.firstName} ${profile?.lastName}`}
            </Text>
            <Text fontSize="sm">@{profile?.username}</Text>
          </Box>
          <Box ml="3">
            <Text fontWeight="bold">{profile?.bio}</Text>
          </Box>
          <Box ml="3">
            <Link target="blank" href={profile?.link} fontWeight="bold">
              {profile?.link}
            </Link>
          </Box>
          <Box ml="3">
            <Flex gap={8}>
              <Flex gap={2}>
                <Text fontWeight="bold">{profile?.following?.length}</Text>
                <Text>Following</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="bold">{profile?.followers?.length}</Text>
                <Text>Followers</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex w="full">
        <Tabs w="full">
          <TabList>
            <Flex w="full" justify="space-between">
              <Tab _hover={{ backgroundColor: bgColor }}>Tweets</Tab>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              {userAllPost.length &&
                userAllPost.map(post => (
                  <PostCard key={post?._id} post={post} isUserProfile />
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default UserProfile;
