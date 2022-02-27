import {
  Box,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';

const HistoryBack = ({ children }) => (
  <Button
    variant="link"
    aria-label="Back to referrer"
    display="inline-flex"
    alignItems="center"
    marginBottom="2"
    color={useColorModeValue('orange.500', 'orange.200')}
    letterSpacing="wider"
    onClick={() => window.history.back()}
  >
    <Icon as={FiChevronLeft} w={4} h={4} marginRight="1" />
    <Box
      as="span"
      display="inline-block"
      fontSize="md"
      textDecoration="underline"
    >
      {children || 'window.history.back()'}
    </Box>
  </Button>
);

export default HistoryBack;
