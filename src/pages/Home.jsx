import { Heading } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getFollowing } from '../utils/utils';

const Home = () => {
  const { token, user } = useAuthContext();
  const { allPost, dispatch, setLoader } = useDataContext();

  console.log(user, 'before')
  if (!user) return;

  const followingUserId = user.following.map(({ _id }) => _id);

  const userAndFollwingUserId = [...followingUserId, user._id];

  const homePagePosts = allPost.filter(({ author: { _id } }) =>
    userAndFollwingUserId.includes(_id)
  );

  return (
    <>
      <Heading>Home</Heading>
      {homePagePosts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default Home;
