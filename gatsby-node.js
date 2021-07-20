const allMdxQuery = (graphql) => graphql(`{
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

const tagGroupQuery = (graphql) => graphql(`{
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
    allMdxQuery(graphql),
    tagGroupQuery(graphql),
  ]);

  if (results.some((result) => result.errors)) {
    reporter.panic('Error while running GraphQL query.');
    return;
  }

  const [allMdxResult, tagsGroupResult] = results;
  const posts = allMdxResult.data.allMdx.nodes;
  posts.forEach(({ frontmatter: { slug = '' }, id }) => {
    if (slug) {
      actions.createPage({
        path: `/post/${slug}`,
        component: require.resolve('./src/templates/post-template.jsx'),
        context: { id },
      });
    }
  });

  // post list
  const perPage = 7;
  const totalPages = Math.ceil(posts.length / perPage);

  for (let i = 1; i <= totalPages; i += 1) {
    actions.createPage({
      path: i === 1 ? '/posts' : `/posts/${i}`,
      component: require.resolve('./src/templates/post-pagination-template.jsx'),
      context: {
        limit: perPage,
        skip: (i - 1) * perPage,
        currentPage: i,
        totalPages,
      },
    });
  }

  // tag page
  const tagGroup = tagsGroupResult.data.allMdx.group;
  tagGroup.forEach(({ nodes, fieldValue }) => {
    actions.createPage({
      path: `/tag/${fieldValue}`,
      component: require.resolve('./src/templates/individual-tag-template.jsx'),
      context: {
        posts: nodes,
        tag: fieldValue,
      },
    });
  });
};
