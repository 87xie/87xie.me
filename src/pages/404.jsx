import React from 'react';
import { Box } from '@chakra-ui/react';
import LottieContainer from '@components/lottie-container';
import dancingDog from '../assets/animations/dancing-dog.json';

const Index = () => (
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
);

export default Index;
