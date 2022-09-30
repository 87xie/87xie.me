import { GatsbyLinkProps } from 'gatsby';
import {
  Link,
  LinkProps as ChakraLinkProps,
  useColorModeValue,
} from '@chakra-ui/react';

type HeaderIconLinkProps = ChakraLinkProps | GatsbyLinkProps<unknown>;

const HeaderIconLink = (props: HeaderIconLinkProps) => {
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
      sx={{
        '&.is-active': { color: hoverColor },
        '&:hover': {
          color: hoverColor,
          background: hoverBackground,
        },
      }}
      {...props}
    />
  );
};

export default HeaderIconLink;
