import * as JsSearch from 'js-search';
import { navigate } from 'gatsby';
import {
  useRef,
  useState,
  useEffect,
} from 'react';
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
import { useDebounce } from 'use-debounce';

const useJsSearch = (posts) => {
  const instanceRef = useRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const jsSearch = new JsSearch.Search('slug');
    jsSearch.addIndex('title');
    jsSearch.addIndex('tags');
    jsSearch.addDocuments(posts);
    instanceRef.current = jsSearch;
    setIsReady(true);
  }, []);

  return {
    isReady,
    instanceRef,
  };
};

const PostsCombobox = ({ posts }) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 300);
  const [searchedItems, setSearchedItems] = useState([]);
  const { isReady, instanceRef } = useJsSearch(posts);

  useEffect(() => {
    const jsSearch = instanceRef.current;
    if (debouncedValue.length >= 2) {
      setSearchedItems(jsSearch.search(debouncedValue));
      return;
    }

    if (debouncedValue.length < 2) {
      setSearchedItems([]);
    }
  }, [debouncedValue]);

  // focus the input when js-search ready
  useEffect(() => {
    if (!isReady) return;
    inputRef.current.focus();
  }, [isReady]);

  // downshift
  const {
    isOpen,
    getMenuProps,
    getItemProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items: searchedItems,
    onSelectedItemChange: ({ selectedItem: post }) => {
      if (!post) return;
      navigate(`/post/${post.slug}`);
    },
    onInputValueChange: ({ inputValue }) => setValue(inputValue),
    itemToString: (item) => item?.title || '',
  });

  const listBackground = useColorModeValue('gray.100', 'gray.600');
  const itemActiveBackground = useColorModeValue('pink.300', 'red.200');
  const itemActiveColor = useColorModeValue('white', 'gray.600');

  return (
    <Box {...getComboboxProps()}>
      <Input
        {...getInputProps({
          ref: inputRef,
          disabled: !isReady,
        })}
      />
      <List
        {...getMenuProps()}
        shadow="lg"
        maxHeight="384px"
        overflow="scroll"
        borderRadius="4"
        paddingRight="1"
        background={listBackground}
      >
        {isOpen && searchedItems.map((item, index) => (
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

export default PostsCombobox;
