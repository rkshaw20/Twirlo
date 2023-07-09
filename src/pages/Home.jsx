import {
  Flex,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getFilteredPost } from '../utils/utils';
import { useState } from 'react';
import TwirloSpinner from '../components/TwirloSpinner';

const Home = () => {
  const {  user } = useAuthContext();
  const { allPost, loader } = useDataContext();
  const [filterType, setFilterType] = useState('');

  if (!user) return <TwirloSpinner />;

  const followingUserId = user?.following.map(({ _id }) => _id);

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

  if(loader){
    return <TwirloSpinner/>
  }
  return (
    <Flex flexDir="column" justify="center" mt={2} alignItems='center' >
      <Flex w="full">
        <Tabs w="full">
          <TabList>
            <Flex w="full" justify="space-around">
              <Tab onClick={() => handleTab('latest')}>Latest</Tab>
              <Tab onClick={() => handleTab('trending')}>Trending</Tab>
            </Flex>
          </TabList>
        </Tabs>
      </Flex>
      <Flex flexDir="column" alignItems="center">
        {  filteredPost.length===0 ? <Text>Follow User to see Tweet</Text> :  filteredPost.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
