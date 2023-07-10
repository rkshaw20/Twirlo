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
import { getSingleUserDetail } from '../services/AuthServices';
import UserInfoModal from '../components/UserInfoModal';
import { useParams } from 'react-router-dom';
import TwirloSpinner from '../components/TwirloSpinner';

const UserProfile = () => {
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  const { userId: userIdFromParam } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUser, token } = useAuthContext();
  const { userAllPost, allPost, dispatch } = useDataContext();
  const [profile, setProfile] = useState({});
  const [followLoader, setFollowLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const isAuthUser = userIdFromParam === user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const userData = await getSingleUserDetail(token, userIdFromParam);
        setProfile(userData.user);
        await getAllPostOfUser(token, userIdFromParam, dispatch);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userIdFromParam,user]);

  if (!user) return <TwirloSpinner />;

  const followingUserId = user.following.map(({ _id }) => _id);
  const userAndFollwingUserId = [...followingUserId, user._id];
  const isFollwing = userAndFollwingUserId.includes(userIdFromParam);

  const handleFollowAndUnfollow = async () => {
    try {
      setFollowLoader(true);
      if (isFollwing) {
        await unfollowUser(token, userIdFromParam);
      } else {
        await followUser(token, userIdFromParam);
      }
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      setFollowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const likedPostList = allPost.filter(({ likes: { likedBy } }) =>
    likedBy.includes(userIdFromParam)
  );

  if ( loader ) {
    return <TwirloSpinner />;
  }

  
  return (
    <Flex flexDir="column" gap={2} p={2}>
      <Flex flexDir="column">
        <Flex w="full" p={{ base: '', lg: '.5rem' }} justify="space-between">
          <Avatar size={{ base: 'xl', lg: '2xl' }} src={profile?.pic} />
          {isAuthUser ? (
            <>
              <Button bgColor={bgColor} onClick={onOpen} rounded="full">
                Edit Profile
              </Button>
              <UserInfoModal isOpen={isOpen} onClose={onClose} />
            </>
          ) : (
            <Button
              bgColor="blue.400"
              onClick={handleFollowAndUnfollow}
              isLoading={followLoader}
              rounded="full"
            >
              {isFollwing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
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
                <Text>
                  {profile?.followers?.length > 0 ? 'Followers' : 'Follower'}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex w="full">
        <Tabs w="full">
          <TabList>
            <Flex w="full" justify="space-around">
              <Tab _hover={{ backgroundColor: bgColor }}>Tweets</Tab>
              <Tab _hover={{ backgroundColor: bgColor }}>Likes</Tab>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex flexDir="column" alignItems="center">
                {userAllPost.length === 0 ? (
                  <Text>No tweet to show</Text>
                ) : (
                  userAllPost.map(post => (
                    <PostCard
                      key={post?._id}
                      post={post}
                      userIdFromParam={userIdFromParam}
                      isUserProfile
                      isUserAllPost
                    />
                  ))
                )}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column" alignItems="center">
                {likedPostList.length === 0 ? (
                  <Text>No liked tweet to show</Text>
                ) : (
                  likedPostList.map(post => (
                    <PostCard key={post?._id} post={post} isUserProfile />
                  ))
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default UserProfile;
