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
      oscar87xie build with Gatsbyjs and Chakra-UI. All Rights Reserved.
    </Text>
  </Box>
);

export default Footer;
