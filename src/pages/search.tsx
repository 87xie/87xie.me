import { graphql } from 'gatsby';
import { Box } from '@chakra-ui/react';
import { SkipNavContent } from '@components/skip-nav';
import SEO from '@components/seo';
import PostsCombobox from '@features/posts/posts-combobox';
import { PostFrontmatter } from '@features/posts/types';

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
          tags
          slug
        }
      }
    }
  }
`;

export interface QueryData {
  allMdx: {
    nodes: Array<{
      frontmatter: PostFrontmatter
    }>
  };
}

const SearchPage = ({ data }: { data: QueryData }) => {
  const posts = data.allMdx.nodes.map((node) => node.frontmatter);

  return (
    <>
      <SkipNavContent />
      <Box
        maxWidth="500px"
        marginTop="10%"
        marginX="auto"
      >
        <PostsCombobox posts={posts} />
      </Box>
    </>
  );
};

export const Head = () => (
  <SEO title="search" />
);

export default SearchPage;
