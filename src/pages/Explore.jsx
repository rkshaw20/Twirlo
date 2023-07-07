import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

import PostCard from '../components/PostCard';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useDataContext } from '../contexts/DataContextProvider';
import { useEffect, useRef, useState } from 'react';
import { getAllPost, getAllUser } from '../services/DataServices';
import SideBarUser from '../components/SideBarUser';

const Explore = () => {
  const { allPost, allUser, dispatch, setLoader } = useDataContext();
  const { token } = useAuthContext();
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef(null);

  useEffect(() => {
    getAllUser(token, dispatch);
    getAllPost(token, dispatch);
  }, []);

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    
  };
  const filteredList = allUser.filter(({ firstName, lastName, username }) => {
    const fullName = `${firstName} ${lastName}`;
    return (
      fullName.toLowerCase().includes(inputValue.trim()) ||
      username.toLowerCase().includes(inputValue.trim())
    );
  });
  return (
    <Flex flexDir="column" mt={2} >
      <Flex justifyContent="center">
        <Popover
          isLazy
          placement="bottom"
          initialFocusRef={initialFocusRef}
          isOpen={isOpen && inputValue.length > 0}
        >
          <PopoverTrigger>
            <Flex>
              <InputGroup>
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  ref={initialFocusRef}
                  type="search"
                  w={{ base: '', lg: '400px' }}
                  placeholder="search user"
                  value={inputValue}
                  onChange={handleSearch}
                  onBlur={onClose}
                  onFocus={onOpen}
                ></Input>
              </InputGroup>
            </Flex>
          </PopoverTrigger>
          <PopoverContent maxW={{ base: '12rem', lg: '22rem' }}>
            <PopoverArrow />
            <PopoverBody>
            <Flex flexDir="column" gap="4" maxH="16rem" overflowY="auto" p="2">

              {filteredList.length > 0 &&
                filteredList.map(userInfo => (
                  <SideBarUser key={userInfo._id} userInfo={userInfo} isSearch/>
                ))}
              {filteredList.length === 0 && (
                <Text>No User with this name </Text>
              )}
              </Flex>
            </PopoverBody>
           
          </PopoverContent>
        </Popover>
      </Flex >
<Flex flexDir='column' alignItems='center' > 
      {allPost.length > 0 &&
        allPost.map(post => <PostCard key={post._id} post={post} />)}
        </Flex>
      <Flex />
    </Flex>
  );
};

export default Explore;
