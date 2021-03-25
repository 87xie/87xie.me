/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Icon, useColorMode } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const ExternalLink = ({ href, children }) => {
  const { colorMode } = useColorMode();
  const color = colorMode === 'dark'
    ? 'teal.200'
    : 'teal.500';

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
