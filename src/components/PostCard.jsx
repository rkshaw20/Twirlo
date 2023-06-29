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
import { BsThreeDotsVertical, BsBookmark } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { getHumanizeTimeForOlderPost } from '../utils/utils';
import {
  dislikePostService,
  getAllPost,
  getAllPostOfUser,
  getBookmarkPost,
  likePostService,
} from '../services/DataServices';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';

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
  const { token, user } = useAuthContext();
  const { setLoader, dispatch } = useDataContext();
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

  let startTime;
  let timerId;

  function startTimer() {
    startTime = Date.now();
    timerId = setInterval(updateTimer, 1000); // Update timer every second (1000 milliseconds)
  }

  function stopTimer() {
    clearInterval(timerId);
  }

  function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const seconds = elapsedTime / 1000;

    console.log(`Timer: ${seconds} seconds`);
  }

  const handleLike = async () => {
    try {
      if (!isLikedByUser) {
        await likePostService(token, postId, setLoader);
      } else {
        await dislikePostService(token, postId, setLoader);
      }
      await getAllPost(token, dispatch, setLoader);
      if(isUserProfile){
        await getAllPostOfUser(token, user._id, dispatch, setLoader);
      }
    if(isBookmark){
      await getBookmarkPost(token,dispatch,setLoader)
    }
    } catch (error) {
      console.error('Error handling the like:', error);
    }
  };

  const handleBookmark=async()=>{
    
  }

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
            icon={isLikedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
            color={isLikedByUser ? 'red.400' : ''}
            onClick={() => handleLike()}
          ></IconButton>
          <IconButton
            rounded="full"
            p=".5rem"
            variant="ghost"
            icon={<BsBookmark />}
            onClick={()=>handleBookmark}
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
