import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  chakra,
  color,
} from '@chakra-ui/react';
import {
  BsThreeDotsVertical,
  BsBookmark,
  BsBookmarkFill,
} from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { getHumanizeTimeForOlderPost } from '../utils/utils';
import {
  bookmarkPostService,
  dislikePostService,
  getAllPost,
  getAllPostOfUser,
  getBookmarkPost,
  likePostService,
  unbookmarkPostService,
} from '../services/DataServices';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { getSingleUserDetail } from '../services/AuthServices';

// const post = [
//   {
//     likes: {
//       likeCount: 0,
//       likedBy: [],
//       dislikedBy: [],
//     },
//     _id: '6491f97b6b94cc7c9e716b46',
//     author: {
//       _id: '6491e6ea2e336a4721e206dd',
//       firstName: 'Jagrut',
//       username: 'jagrut',
//       pic: '',
//     },
//     content: 'This is a sample content',
//     imgURL: '',
//     comments: [],
//     createdAt: '2023-06-20T19:09:47.843Z',
//     updatedAt: '2023-06-20T19:09:47.843Z',
//     __v: 0,
//   },
// ];

const PostCard = ({ post, isUserProfile, isBookmark }) => {
  // const HoverableIcon = chakra(AiOutlineHeart);
  const { token, user, setUser } = useAuthContext();
  const { bookmarks, loader, setLoader, dispatch } = useDataContext();
  const {
    likes: { likeCount, likedBy },
    _id: postId,
    author: { _id: authorId, firstName, lastName, username, pic },
    content,
    imageUrl,
    comments,
    createdAt,
  } = post;

  const currentDate = new Date();
  const timeOfPost = getHumanizeTimeForOlderPost(currentDate, createdAt);

  const isLikedByUser = isUserProfile
    ? likedBy.map(({ _id }) => _id).includes(user._id)
    : likedBy.includes(user._id);

  const isBookmarked = user.bookmarks.includes(postId);

  const handleLike = async () => {
    try {
      setLoader(true);
      if (!isLikedByUser) {
        await likePostService(token, postId);
      } else {
        await dislikePostService(token, postId);
      }
      await getAllPost(token, dispatch);
      if (isUserProfile) {
        await getAllPostOfUser(token, user._id, dispatch);
      }
      if (isBookmark) {
        await getBookmarkPost(token, dispatch);
      }
      setLoader(false);
    } catch (error) {
      console.error('Error handling the like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      setLoader(true);
      if (!isBookmarked) {
        await bookmarkPostService(token, postId);
      } else {
        await unbookmarkPostService(token, postId);
      }
      await getBookmarkPost(token, dispatch);
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      setLoader(false);
    } catch (error) {
      console.error('Error handling the bookmark:', error);
    }
  };

  return (
    <Card m={2} p="1rem" mb={3} maxH="600px">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={firstName} src={pic} />

            <Box>
              <Heading size="sm">{`${firstName} ${lastName}`}</Heading>
              <Text>@{username}</Text>
            </Box>
            {/* add date here */}
            <Text
              alignSelf="flex-start"
              fontSize="md"
              ml={{ base: '', lg: '-2' }}
              pt={{ base: '', lg: '.3rem' }}
            >
              {timeOfPost}
            </Text>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<FiEdit />}>Edit </MenuItem>
              <MenuItem icon={<AiFillDelete />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody mt="-6">
        <Text>{content}</Text>
      </CardBody>

      {/* <Image
        ml="1.2rem"
        mr="1.2rem"
        rounded="2xl"
        objectFit="cover"
        maxH="300px"
        maxW={{ base: '', lg: '600px' }}
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      /> */}
      <CardFooter justify="space-between" flexWrap="wrap">
        <Flex>
          {' '}
          <IconButton
            rounded="full"
            p=".5rem"
            variant="ghost"
            isDisabled={loader}
            icon={isLikedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
            color={isLikedByUser ? 'red.400' : ''}
            onClick={() => handleLike()}
          ></IconButton>
          <IconButton
            rounded="full"
            p=".5rem"
            variant="ghost"
            isDisabled={loader}
            icon={isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            color={isBookmarked ? 'blue.400' : ''}
            onClick={() => handleBookmark()}
          ></IconButton>{' '}
        </Flex>

        <IconButton
          rounded="full"
          p=".5rem"
          variant="ghost"
          icon={<BiShareAlt />}
        ></IconButton>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
