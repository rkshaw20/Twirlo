import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Spinner,
  Tab,
  TabList,
  Tabs,
  Textarea,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getFollowing } from '../utils/utils';
import { useEffect } from 'react';
import { getAllPost } from '../services/DataServices';
import { getSingleUserDetail } from '../services/AuthServices';
import { useState } from 'react';
import { getFilteredPost } from '../utils/getFilteredPost';
import TwirloSpinner from '../components/TwirloSpinner';

const Home = () => {
  const { token, user, setUser } = useAuthContext();
  const { allPost, dispatch, setLoader } = useDataContext();
  const [filterType, setFilterType] = useState('');

  if (!user) 
    return 

  
  const followingUserId = user.following.map(({ _id }) => _id);

  const userAndFollwingUserId = [...followingUserId, user._id];

  const homePagePosts = allPost?.filter(({ author: { _id } }) =>
    userAndFollwingUserId.includes(_id)
  );
  const handleTab = type => {
    if (filterType !== type) {
      setFilterType(type);
    }
  };
  const filteredPost = getFilteredPost(homePagePosts, filterType);

  if(filteredPost.length===0){
    return <TwirloSpinner/>
  }
  return (
    <Flex flexDir="column" justify="center"mt={2} >
      <Flex>
        <Heading>Home</Heading>
      </Flex>
      <Divider />
      {/* <Flex flexDir='column'  alignItems='center' > */}
      <Flex w="full">
        <Tabs w="full">
          <TabList>
            <Flex w="full" justify="space-around">
              <Tab onClick={() => handleTab('latest')}>Latest</Tab>
              <Tab onClick={() => handleTab('trending')}>Trending</Tab>
            </Flex>
          </TabList>
        </Tabs>
      </Flex >
      <Flex flexDir='column' alignItems='center' >
      {filteredPost.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
      </Flex>
    </Flex>

    // </Flex> 
  );
};

export default Home;
