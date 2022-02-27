import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SEO from '@components/seo';
import LottieContainer from '@components/lottie-container';
import dancingPallbearers from '../assets/lottie-animations/dancing-pallbearers.json';
import { SkipNavContent } from '@components/skip-nav';

const NotFound = () => (
  <>
    <SEO title="404" />
    <SkipNavContent />
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box role="alert" maxWidth={['280px', '400px']}>
        <LottieContainer
          role="alert"
          tip="Page Not Found"
          animationData={dancingPallbearers}
        />
        <Heading
          as="h1"
          mt="5"
          fontSize="lg"
          fontWeight="bold"
          textAlign="center"
        >
          Page Not Found
        </Heading>
      </Box>
    </Box>
  </>
);

export default NotFound;
