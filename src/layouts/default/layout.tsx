import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { SkipNavLink } from '@components/skip-nav';
import Header from './header';
import Footer from './footer';

const DefaultLayout = ({
  children,
}: { children: ReactNode }) => {
  return (
    <Box
      display="grid"
      gridTemplateRows="auto 1fr auto"
      minHeight="100vh"
      lineHeight="tall"
      letterSpacing="wide"
    >
      <SkipNavLink />
      <Header />
      <Box
        as="main"
        minWidth="0"
        px="6"
        pt="8"
        pb="4"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
