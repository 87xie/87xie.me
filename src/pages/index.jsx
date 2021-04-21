import React from 'react';
import { Box } from '@chakra-ui/react';
import LottieContainer from '@components/lottie-container';
import underMaintenance from '../assets/animations/under-maintenance.json';

const Index = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100%"
  >
    <LottieContainer
      tip="Work In Progress"
      animationData={underMaintenance}
    />
  </Box>
);

export default Index;
