const allPostsQuery = (graphql) => graphql(`{
  allMdx(sort: {order: DESC, fields: frontmatter___date}) {
    nodes {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        tags
        title
      }
      id
    }
  }
}`);

const tagsGroupQuery = (graphql) => graphql(`{
  allMdx(sort: {order: DESC, fields: frontmatter___date}) {
    group(field: frontmatter___tags) {
      fieldValue
      nodes {
        id
        frontmatter {
          slug
          title
          date(formatString: "YYYY-MM-DD")
          tags
        }
      }
    }
  }
}`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const results = await Promise.all([
    allPostsQuery(graphql),
    tagsGroupQuery(graphql),
  ]);

  if (results.some((result) => result.errors)) {
    reporter.panic('Error while running GraphQL query.');
    return;
  }

  const [postsResult, tagsGroupResult] = results;

  const posts = postsResult.data.allMdx.nodes;
  posts.forEach(({ frontmatter, id }) => {
    const { slug = '' } = frontmatter;

    if (!slug) {
      return;
    }

    // post page
    actions.createPage({
      path: `/post/${slug}`,
      component: require.resolve('./src/templates/post-template.jsx'),
      context: { id },
    });
  });

  // post list
  const perPage = 8;
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

  // tag page
  const tagsGroup = tagsGroupResult.data.allMdx.group;
  tagsGroup.forEach(({ nodes, fieldValue }) => {
    actions.createPage({
      path: `/tag/${fieldValue}`,
      component: require.resolve('./src/templates/tag-template.jsx'),
      context: {
        posts: nodes,
        tag: fieldValue,
      },
    });
  });
};
