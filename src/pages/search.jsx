import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import PostsSearchCombobox from '@features/posts/posts-combobox';
import { SkipNavContent } from '@components/skip-nav';

const SearchPage = () => (
  <>
    <SkipNavContent />
    <Box
      maxWidth="500px"
      marginTop="10%"
      marginX="auto"
    >
      <PostsSearchCombobox />
    </Box>
  </>
);

export const Head = () => (
  <SEO title="search" />
);

export default SearchPage;
