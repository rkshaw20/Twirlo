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

const UserProfile = () => {
  const bgColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex flexDir="column" gap={2} p={2}>
      <Flex flexDir="column">
        <Flex w="full" p={{ base: '', lg: '.5rem' }} justify="space-between">
          <Avatar
            size={{ base: 'xl', lg: '2xl' }}
            src="https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg"
          />
          <Button bgColor={bgColor}>Edit Profile</Button>
        </Flex>
        <Flex flexDir="column" gap={1} p={1}>
          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">
              Raj
            </Text>
            <Text fontSize="sm">@RajKishorShaw17</Text>
          </Box>
          <Box ml="3">
            <Text fontWeight="bold">
              Web Developer || Open-source || ReactJs & JavaScript || Student
              @neogCamp '23
            </Text>
          </Box>
          <Box ml="3">
            <Flex gap={5}>
              {' '}
              <Text>
                {' '}
                <Text fontWeight="bold">366</Text> Following
              </Text>{' '}
              <Text>
                <Text fontWeight="bold">700</Text> Followers
              </Text>{' '}
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
                 {/* remove this after  */}
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </TabPanel>
            <TabPanel>
              <p>Likes</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default UserProfile;
