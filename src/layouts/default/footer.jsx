import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box
    as="footer"
    p="2"
    borderTop="1px"
    borderColor="inherit"
    textAlign={['left', 'left', 'center']}
  >
    <Text
      as="small"
      w="100%"
      fontSize="12px"
    >
      &copy;
      {` ${new Date().getFullYear()} `}
      oscar87xie All Rights Reserved.
    </Text>
    <Text
      as="p"
      w="100%"
      fontSize="12px"
    >
      Builded with Gatsbyjs and Chakra-UI.
    </Text>
  </Box>
);

export default Footer;
