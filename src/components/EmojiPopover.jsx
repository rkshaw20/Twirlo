import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import { FaRegSmile } from 'react-icons/fa';

const EmojiPopover = ({ onEmojiClick }) => {
  const colorModeValue = useColorModeValue('light', 'dark');
  return (
    <Popover isLazy >
      <PopoverTrigger>
        <IconButton
          icon={FaRegSmile()}
          variant="ghost"
          _hover={{ bg: 'transparent' }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody p={0} w='fit-content' >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme={colorModeValue}
            emojiStyle="apple"
            emojiVersion="1.0"
            searchDisabled
            lazyLoadEmojis
            skinTonesDisabled
            suggestedEmojisMode="recent"
            previewConfig={{
              showPreview: false,
            }}
            height="240px"
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
