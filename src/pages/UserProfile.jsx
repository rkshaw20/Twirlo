import {
  Avatar,
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getAllPostOfUser } from '../services/DataServices';
import { useEffect } from 'react';
import { getSingleUserDetail } from '../services/AuthServices';

const UserProfile = () => {
  const bgColor = useColorModeValue('gray.300', 'gray.600');

  const { user,setUser, token } = useAuthContext();
  const { dispatch,setLoader, userAllPost } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      setLoader(false);
    };
  
    fetchData();
  }, []);
  

  if(!user) return;
  return (
    <Flex flexDir="column" gap={2} p={2}>
      <Flex flexDir="column">
        <Flex w="full" p={{ base: '', lg: '.5rem' }} justify="space-between">
          <Avatar size={{ base: 'xl', lg: '2xl' }} src={user?.pic} />
          <Button bgColor={bgColor}>Edit Profile</Button>
        </Flex>
        <Flex flexDir="column" gap={1} p={1}>
          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">
              {user?.firstName}
            </Text>
            <Text fontSize="sm">@{user?.username}</Text>
          </Box>
          <Box ml="3">
            <Text fontWeight="bold">
              Web Developer || Open-source || ReactJs & JavaScript || Student
              @neogCamp '23
            </Text>
          </Box>
          <Box ml="3">
            <Flex gap={8}>
              <Flex gap={2} >
                <Text fontWeight="bold">366</Text>
                <Text>Following</Text>
              </Flex>
              <Flex gap={2} >
                <Text fontWeight="bold">700</Text>
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
              <Tab _hover={{ backgroundColor: bgColor }}>Likes</Tab>
              <Tab _hover={{ backgroundColor: bgColor }}>Three</Tab>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              {userAllPost.length &&
                userAllPost.map(post => (
                  <PostCard key={post?._id} post={post} isUserProfile />
                ))}
            </TabPanel>
            <TabPanel>{/* <p>Likes</p> */}</TabPanel>
            <TabPanel>{/* <p>three!</p> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default UserProfile;
