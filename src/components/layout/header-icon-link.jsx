import React from 'react';
import { Link, useColorModeValue } from '@chakra-ui/react';

const HeaderIconLink = (props) => {
  const hoverColor = useColorModeValue('pink.500', 'red.200');
  const hoverBackground = useColorModeValue('red.100', 'rgba(254, 178, 178, 0.16)');

  return (
    <Link
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      height="8"
      width="8"
      borderRadius="4"
      sx={{ '&.is-active': { color: hoverColor } }}
      _hover={{ color: hoverColor, background: hoverBackground }}
      {...props}
    />
  );
};

export default HeaderIconLink;
