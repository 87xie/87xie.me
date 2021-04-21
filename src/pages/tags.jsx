import React from 'react';
import { Box } from '@chakra-ui/react';
import LottieContainer from '@components/lottie-container';
import dancingPallbearers from '../assets/animations/dancing-pallbearers.json';

const Index = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100%"
  >
    <LottieContainer
      tip="Work In Progress"
      animationData={dancingPallbearers}
    />
  </Box>
);

export default Index;
