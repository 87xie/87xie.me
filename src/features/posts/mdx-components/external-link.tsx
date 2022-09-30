import {
  Link,
  Icon,
  useColorModeValue,
  ChakraComponent,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const ExternalLink = (({
  href,
  children,
}) => {
  const color = useColorModeValue('blue.500', 'blue.200');

  return (
    <Link
      isExternal
      href={href}
      color={color}
      display="inline-flex"
      paddingX="1"
      alignItems="center"
      fontWeight="600"
    >
      {children}
      <Icon as={FiExternalLink} ml="2" />
    </Link>
  );
}) as ChakraComponent<'a', {}>;

export default ExternalLink;
