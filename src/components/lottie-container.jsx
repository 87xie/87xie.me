/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import lottie from 'lottie-web/build/player/lottie_light';

const LottieContainer = ({ animationData }) => {
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
    <Box
      aria-hidden="true"
      ref={animationContainer}
    />
  );
};

export default LottieContainer;
