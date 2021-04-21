/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import lottie from 'lottie-web';

const UnderMaintance = ({ animationData, tip }) => {
  const animationContainer = useRef();
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
    return () => animation.destroy();
  }, []);

  return (
    <Box maxWidth={['280px', '400px']}>
      <Box ref={animationContainer} />
      {tip && (
        <Text
          mt="5"
          fontSize="lg"
          fontWeight="bold"
          textAlign="center"
        >
          {tip}
        </Text>
      )}
    </Box>
  );
};

export default UnderMaintance;
