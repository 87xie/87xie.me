import React from 'react';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo/seo';
import LottieContainer from '@components/lottie-container';
import dancingPallbearers from '../assets/animations/dancing-pallbearers.json';

const Index = () => (
  <>
    <SEO title="tags" />
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
  </>
);

export default Index;