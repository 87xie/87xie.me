import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const InlineCode = ({ children }) => {
  const color = useColorModeValue('rgb(61, 126, 154)', 'rgb(251, 211, 141)');
  const backgroundColor = useColorModeValue('rgba(220, 220, 220, 0.5)', 'rgb(54, 60, 72)');

  return (
    <Box
      as="code"
      padding="0.125rem 0.25rem"
      borderRadius="sm"
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </Box>
  );
};

export default InlineCode;
