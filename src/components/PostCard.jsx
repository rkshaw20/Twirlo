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
  Text,
  chakra,
  color,
} from '@chakra-ui/react';
import { BsThreeDotsVertical, BsBookmark } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';

const post = [
  {
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    _id: '6491f97b6b94cc7c9e716b46',
    author: {
      _id: '6491e6ea2e336a4721e206dd',
      firstName: 'Jagrut',
      username: 'jagrut',
      pic: '',
    },
    content: 'This is a sample content',
    imgURL: '',
    comments: [],
    createdAt: '2023-06-20T19:09:47.843Z',
    updatedAt: '2023-06-20T19:09:47.843Z',
    __v: 0,
  },
];

const PostCard = () => {
    const HoverableIcon = chakra(AiOutlineHeart);

  return (
    <Card p="1rem" m="2rem" maxH="600px">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>@Segun</Text>
            </Box>
            {/* add date here */}
            <Text
              alignSelf="flex-start"
              fontSize="xs"
              ml={{ base: '', lg: '-2' }}
              pt={{ base: '', lg: '.3rem' }}
            >
              Dec 20,2022
            </Text>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody mt="-6">
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>

      <Image
        ml="1.2rem"
        mr="1.2rem"
        rounded="2xl"
        objectFit="cover"
        maxH="300px"
        maxW={{ base: '', lg: '600px' }}
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />
      <CardFooter justify="space-between" flexWrap="wrap">
       
          {/* <HoverableIcon  _hover={{ color: 'red.500' }}/>
          <HoverableIcon  _hover={{ color: 'red.500' }}/>
          <HoverableIcon  _hover={{ color: 'red.500' }}/> */}
        <IconButton p='1rem' variant="ghost" icon={<AiOutlineHeart />}></IconButton>
        <IconButton p='1rem' variant="ghost" icon={<BsBookmark />}></IconButton>
        <IconButton p='1rem' variant="ghost" icon={<BiShareAlt />}></IconButton>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
