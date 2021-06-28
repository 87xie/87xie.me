import React from 'react';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import LottieContainer from '@components/lottie-container';
import dancingPallbearers from '../assets/lottie-animations/dancing-pallbearers.json';

const NotFound = () => (
  <>
    <SEO title="404" />
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <LottieContainer
        tip="Not Found"
        animationData={dancingPallbearers}
      />
    </Box>
  </>
);

export default NotFound;
