import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box
    as="footer"
    py="2"
    textAlign="center"
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
  </Box>
);

export default Footer;
