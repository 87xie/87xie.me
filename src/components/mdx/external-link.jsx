/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const ExternalLink = ({ href, children }) => {
  const color = useColorModeValue('red.300', 'red.200');

  return (
    <Link
      isExternal
      href={href}
      color={color}
      fontWeight="600"
    >
      {children}
      <Icon as={FiExternalLink} ml="2" />
    </Link>
  );
};

export default ExternalLink;
