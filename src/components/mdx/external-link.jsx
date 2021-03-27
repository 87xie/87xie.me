/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Icon } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const ExternalLink = ({ href, children }) => (
  <Link
    isExternal
    href={href}
    color="pink"
    fontWeight="600"
  >
    {children}
    <Icon as={FiExternalLink} ml="2" />
  </Link>
);

export default ExternalLink;
