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
  useDisclosure,
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
  deletePost,
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
import TweetModal from './TweetModal';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostCard = ({ post, isUserProfile, isBookmark, isUserAllPost }) => {
  const { token, user, setUser } = useAuthContext();
  const { loader, setLoader, dispatch } = useDataContext();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [btnLoader, setBtnLoader] = useState(false);

  const {
    likes: { likeCount, likedBy },
    _id: postId,
    author: { _id: authorId, firstName, lastName, username, pic },
    content,
    imageUrl,
    createdAt,
  } = post;

  // console.log({userIdFromParam});
  // console.log(user._id);

  const isAuthUser = authorId === user?._id;
  const currentDate = new Date();
  const timeOfPost = getHumanizeTimeForOlderPost(currentDate, createdAt);

  const isLikedByUser = isUserProfile
    ? isUserAllPost
      ? likedBy.map(({ _id }) => _id).includes(user._id)
      : likedBy.includes(user._id)
    : likedBy.includes(user?._id);
 

  const isBookmarked = user.bookmarks.includes(postId);

  const handleLike = async () => {
    try {
      // setLoader(true);
      setBtnLoader(true);
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
      setBtnLoader(false);
      // setLoader(false);
    } catch (error) {
      console.error('Error handling the like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      // setLoader(true);
      setBtnLoader(true);
      if (!isBookmarked) {
        await bookmarkPostService(token, postId);
      } else {
        await unbookmarkPostService(token, postId);
      }
      await getBookmarkPost(token, dispatch);
      const userData = await getSingleUserDetail(token, user._id);
      setUser(userData.user);
      setBtnLoader(false);
      // setLoader(false);
    } catch (error) {
      console.error('Error handling the bookmark:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoader(true);
      await deletePost(token, postId);
      await getAllPost(token, dispatch);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card m={2} p=".5rem" mb={3} maxH="600px">
      <CardHeader m={0}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={firstName} src={pic} />

            <Box>
              <Heading size="sm">
                {' '}
                <Link
                  to={`/profile/${authorId}`}
                >{`${firstName} ${lastName}`}</Link>{' '}
              </Heading>
              <Text>@{username}</Text>
            </Box>
            <Text alignSelf="flex-start" fontSize="md">
              {timeOfPost}
            </Text>
          </Flex>
          {isAuthUser && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDotsVertical />}
                variant="ghost"
                rounded='full'
              />
              <MenuList minW='6rem' >
                <MenuItem
                  isDisabled={loader}
                  icon={<FiEdit />}
                  onClick={onOpen}
                >
                  Edit
                </MenuItem>
                <TweetModal
                  isOpen={isOpen}
                  onClose={onClose}
                  post={post}
                  isEdit
                />

                <MenuItem
                  isDisabled={loader}
                  icon={<AiFillDelete />}
                  onClick={() => handleDelete()}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody mt="-6">
        <Text>{content}</Text>
      </CardBody>

      {imageUrl && (
        <Image
          ml="1.2rem"
          mr="1.2rem"
          rounded="2xl"
          objectFit="cover"
          maxH="300px"
          maxW={{ base: '', lg: '600px' }}
          src={imageUrl}
          alt="Chakra UI"
        />
      )}

      <CardFooter p="0 1rem" mt={2} justify="space-between" flexWrap="wrap">
        <Flex gap={4}>
          <Flex alignItems="center" gap={0.5}>
            <IconButton
              rounded="full"
              p=".5rem"
              fontSize="1.5rem"
              variant="ghost"
              isDisabled={btnLoader}
              icon={isLikedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
              color={isLikedByUser ? 'red.400' : ''}
              onClick={() => handleLike()}
            ></IconButton>
            {likeCount>0 && <Text fontSize="1.2rem">{likeCount}</Text> }
            
          </Flex>
          <IconButton
            rounded="full"
            p=".5rem"
            fontSize="1.5rem"
            variant="ghost"
            isDisabled={btnLoader}
            icon={isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            color={isBookmarked ? 'blue.400' : ''}
            onClick={() => handleBookmark()}
          ></IconButton>{' '}
        </Flex>

        <IconButton
          rounded="full"
          p=".5rem"
          fontSize="1.5rem"
          variant="ghost"
          icon={<BiShareAlt />}
        ></IconButton>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
