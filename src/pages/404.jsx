import React from 'react';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo/seo';
import LottieContainer from '@components/lottie-container';
import dancingDog from '../assets/lottie-animations/dancing-dog.json';

const Index = () => (
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
        animationData={dancingDog}
      />
    </Box>
  </>
);

export default Index;
