const postsQuery = (graphql) => graphql(`{
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          slug
          date
        }
      }
    }
  }
}`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await postsQuery(graphql);

  if (result.errors) {
    reporter.panic('Error while running GraphQL query.');
    return;
  }

  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    const { slug = '' } = node.frontmatter;

    if (!slug) {
      return;
    }

    actions.createPage({
      path: `/post/${slug}`,
      component: require.resolve('./src/templates/post-template.jsx'),
      context: {
        id: node.id,
      },
    });
  });

  // post list
  const perPage = 6;
  const totalPages = Math.ceil(posts.length / perPage);

  Array.from({ length: totalPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? '/posts' : `/posts/${i + 1}`,
      component: require.resolve('./src/templates/post-list-template.jsx'),
      context: {
        limit: perPage,
        skip: i * perPage,
        currentPage: i + 1,
        totalPages,
      },
    });
  });
};
