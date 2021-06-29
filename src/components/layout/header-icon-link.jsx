/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

const HeaderIconLink = ({
  to,
  icon,
  isExternal,
  ...props
}) => {
  const hoverColor = useColorModeValue('pink.500', 'red.200');
  const hoverBackground = useColorModeValue('red.100', 'rgba(254, 178, 178, 0.16)');

  return (
    <ChakraLink
      {...(isExternal && {
        href: to,
        isExternal,
      })}
      {...(!isExternal && {
        to,
        as: GatsbyLink,
        partiallyActive: true,
        activeClassName: 'is-active',
      })}
      {...props}
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      height="32px"
      borderRadius="4"
      sx={{ '&.is-active': { color: hoverColor } }}
      _hover={{ color: hoverColor, background: hoverBackground }}
    >
      <Icon as={icon} />
    </ChakraLink>
  );
};

HeaderIconLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  isExternal: PropTypes.bool.isRequired,
};

export default HeaderIconLink;
