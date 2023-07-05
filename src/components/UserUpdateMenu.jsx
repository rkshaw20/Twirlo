import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { FaUpload } from 'react-icons/fa';
import { AvatarList } from './AvatarList';

export const UserUpdateMenu = ({ handleAvatarSelect, handleImageInput }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const imageRef = useRef(null);

  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={AiFillCamera()}
        rounded="full"
        fontSize="1.8rem"
        variant="ghost"
        p={0}
      />
      <MenuList minW="8rem">
        <Popover
          isLazy
          placement="bottom"
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <Button
              leftIcon={<EditIcon />}
              onClick={e => e.stopPropagation()}
              variant="ghost"
              p={3}
            >
              Select Avatar
            </Button>
          </PopoverTrigger>
          <PopoverContent ml="1rem">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Select Avatar</PopoverHeader>
            <PopoverBody>
              <AvatarList
                onAvatarSelect={handleAvatarSelect}
                onClose={onClose}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <MenuItem
          icon={FaUpload()}
          fontSize="1rem"
          onClick={() => imageRef.current.click()}
        >
          <FormControl>
            <FormLabel m={0} >
              Upload
            </FormLabel>
            <Input
              ref={imageRef}
              type="file"
              display="none"
              accept="image/*"
              onChange={handleImageInput}
            />
          </FormControl>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
