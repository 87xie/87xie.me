import { Link } from 'gatsby';
import {
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import SEO from '@components/seo';
import { SkipNavContent } from '@components/skip-nav';
import * as PostsSection from '@features/posts/posts-section';
import type { ListPageContext } from '@features/posts/create-pages';

interface PostListTemplateProps {
  pageContext: ListPageContext;
}

const PostsListTemplate = ({
  pageContext,
}: PostListTemplateProps) => {
  const {
    items,
    currentPage,
    totalPages,
  } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <>
      <SkipNavContent />
      <Box maxWidth="4xl" marginX="auto">
        <PostsSection.Section>
          <PostsSection.Heading>
            Posts
            <Text fontSize="sm" lineHeight="tall">
              {`(page ${currentPage} of ${totalPages})`}
            </Text>
          </PostsSection.Heading>
          <PostsSection.Previews posts={items} />
        </PostsSection.Section>

        <Box marginTop="5">
          <Button
            as={Link}
            size="sm"
            to={`/posts/${prevPage}`}
            leftIcon={<FiArrowLeft />}
            colorScheme={isFirst ? 'gray' : 'red'}
            pointerEvents={isFirst ? 'none' : 'auto'}
            mr="7"
          >
            Prev
          </Button>

          <Button
            as={Link}
            pointerEvents={isLast ? 'none' : 'auto'}
            size="sm"
            to={`/posts/${nextPage}`}
            rightIcon={<FiArrowRight />}
            colorScheme={isLast ? 'gray' : 'red'}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const Head = () => (
  <SEO title="posts" />
);

export default PostsListTemplate;
