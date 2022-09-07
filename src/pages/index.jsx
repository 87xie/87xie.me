import {
  graphql,
  Link as GatsbyLink,
} from 'gatsby';
import {
  Box,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { SkipNavContent } from '@components/skip-nav';
import SEO from '@components/seo';
import * as PostsSection from '@features/posts/posts-section';

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allMdx(
      limit: 7
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      nodes {
        id
        frontmatter {
          title
          tags
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;

const items = [
  {
    imgProps: {
      src: '/images/netlify.svg',
      width: 32,
      height: 32,
    },
    href: 'https://www.netlify.com/',
    ariaLabel: 'Go to netlify.com',
  },
  {
    imgProps: {
      src: '/images/gatsby.svg',
      width: 32,
      height: 32,
    },
    href: 'https://github.com/gatsbyjs/gatsby',
    ariaLabel: 'Go to Gatsby GitHub page',
  },
  {
    imgProps: {
      src: '/images/chakra-ui.svg',
      width: 32,
      height: 32,
    },
    href: 'https://github.com/chakra-ui/chakra-ui',
    ariaLabel: 'Go to Chakra UI GitHub page',
  },
  {
    imgProps: {
      src: '/images/mermaid.png',
      width: 32,
      height: 32,
    },
    href: 'https://github.com/mermaid-js/mermaid',
    ariaLabel: 'Go to mermaid GitHub page',
  },
  {
    imgProps: {
      src: '/images/mdx.svg',
      width: 77.28,
      height: 32,
    },
    href: 'https://github.com/mdx-js/mdx',
    ariaLabel: 'Go to mdx-js GitHub page',
  },
];

const BuiltWith = () => (
  <Box>
    <Text
      marginBottom="2"
      fontSize="xl"
      fontWeight="bold"
      color={useColorModeValue('gray.600', 'gray.200')}
    >
      Built With
    </Text>
    <Box
      display="flex"
      flexWrap="wrap"
      marginBottom="-0.875rem"
    >
      {items.map(({ href, imgProps, ariaLabel }) => (
        <ChakraLink
          d="inline-block"
          margin="0 0.875rem 0.875rem 0"
          isExternal
          key={href}
          href={href}
          aria-label={ariaLabel}
        >
          <img alt={ariaLabel} {...imgProps} />
        </ChakraLink>
      ))}
    </Box>
  </Box>
);

const Index = ({ data }) => {
  const posts = data.allMdx.nodes;
  const description = data.site.siteMetadata?.description;
  const textOrange = useColorModeValue('orange.500', 'orange.200');

  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      maxWidth="4xl"
      margin="0 auto"
      height="100%"
    >
      <Box flex="auto">
        <SkipNavContent />
        <PostsSection.Section marginBottom="5">
          <PostsSection.Heading>
            Recent Posts
          </PostsSection.Heading>
          <PostsSection.Previews posts={posts} />
        </PostsSection.Section>

        <Box textAlign="left">
          <ChakraLink
            as={GatsbyLink}
            to="/posts"
            color={textOrange}
            fontSize="lg"
            fontWeight="bold"
          >
            to=&quot;/posts&quot;
          </ChakraLink>
        </Box>
      </Box>

      <Box
        as="aside"
        flex={['auto', 'auto', 'auto', '0 0 235px']}
        marginTop={['6', '6', '6', '0']}
        marginLeft={['0', '0', '0', '12']}
      >
        <Text
          marginBottom="3"
          lineHeight="1.2"
        >
          {description}
        </Text>
        <BuiltWith />
      </Box>
    </Box>
  );
};

export const Head = () => (
  <SEO />
);

export default Index;
