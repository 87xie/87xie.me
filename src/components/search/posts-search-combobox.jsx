import React, { useRef, useEffect } from 'react';
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
  const { downshiftOptions } = usePostsSearch();
  const {
    isOpen,
    getMenuProps,
    getItemProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox(downshiftOptions);

  const listBackground = useColorModeValue('gray.100', 'gray.600');
  const itemActiveBackground = useColorModeValue('pink.300', 'red.200');
  const itemActiveColor = useColorModeValue('white', 'gray.600');

  const inputRef = useRef(null);
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <Box {...getComboboxProps()}>
      <Input {...getInputProps({ ref: inputRef })} />
      <List
        {...getMenuProps()}
        maxHeight="384px"
        overflow="scroll"
        borderRadius="4"
        paddingRight="1"
        background={listBackground}
        shadow="lg"
      >
        {isOpen && downshiftOptions.items.map((item, index) => (
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
                <Text fontSize="14px" lineHeight="1">
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
