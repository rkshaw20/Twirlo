import { Avatar, Flex } from '@chakra-ui/react';
import { avatarList } from '../utils/constants';

export const AvatarList = ({ onAvatarSelect, onClose }) => {
  const handleAvatarSelect = e => {
    onAvatarSelect(e);
    onClose();
  };
  return (
    <Flex flexWrap='wrap' justifyContent="space-between" gap={1}>
      {avatarList.map((item, i) => (
        <Avatar
          size="md"
          src={item}
          key={i}
          cursor="pointer"
          onClick={handleAvatarSelect}
        />
      ))}
    </Flex>
  );
};
