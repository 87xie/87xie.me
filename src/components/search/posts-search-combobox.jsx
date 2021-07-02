import React from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHash,
  FiCornerDownLeft,
} from 'react-icons/fi';
import { useCombobox } from 'downshift';
import usePostsSearch from './use-posts-search';

const PostsSearchCombobox = () => {
  const { downshiftProps } = usePostsSearch();
  const {
    isOpen,
    getMenuProps,
    getItemProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox(downshiftProps);

  const listBackground = useColorModeValue('gray.100', 'gray.600');
  const itemActiveBackground = useColorModeValue('pink.300', 'red.200');
  const itemActiveColor = useColorModeValue('white', 'gray.600');

  return (
    <Box {...getComboboxProps()}>
      <Input {...getInputProps({ autoFocus: true })} />
      <List
        {...getMenuProps()}
        maxHeight="384px"
        overflow="scroll"
        borderRadius="4"
        paddingRight="1"
        background={listBackground}
        shadow="lg"
      >
        {isOpen && downshiftProps.items.map((item, index) => (
          <ListItem
            {...getItemProps({ item, index })}
            key={item.slug}
            marginRight="-1"
            borderRadius="4"
            paddingY="3"
            paddingLeft="4"
            paddingRight="2"
            background={highlightedIndex === index && itemActiveBackground}
            color={highlightedIndex === index && itemActiveColor}
          >
            <Flex alignItems="center">
              <ListIcon as={FiHash} />
              <Box flex="auto" paddingX="2">
                <Text fontWeight="bold">
                  {item.title}
                </Text>
                <Text fontSize="sm" lineHeight="1">
                  {item.tags.join(', ')}
                </Text>
              </Box>
              <ListIcon as={FiCornerDownLeft} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PostsSearchCombobox;
