import { useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import lottie from 'lottie-web/build/player/lottie_light';
import SEO from '@components/seo';
import { SkipNavContent } from '@components/skip-nav';
import dancingPallbearers from '../assets/lottie-animations/dancing-pallbearers.json';

const NotFound = () => {
  const lottieContainerRef = useRef();
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: dancingPallbearers,
    });
    return () => animation.destroy();
  }, []);

  return (
    <>
      <SkipNavContent />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box role="alert" maxWidth={['280px', '400px']}>
          <Box ref={lottieContainerRef} aria-hidden="true" />
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
};

export const Head = () => (
  <SEO title="404" />
);

export default NotFound;
