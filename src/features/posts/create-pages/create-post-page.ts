import path from 'path';
import { CreatePagesArgs } from 'gatsby';
import type { PostNode } from '../types';

export interface AllMdxData {
  allMdx: { nodes: PostNode[] }
}

export interface ListPageContext {
  items: PostNode[];
  limit: number;
  skip: number;
  totalPages: number;
  currentPage: number;
}

export async function createPostPage({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) {
  const { data, errors } = await graphql<AllMdxData>(`
    query {
      allMdx(sort: {order: DESC, fields: frontmatter___date}) {
        nodes {
          id
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            slug
            tags
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panic('Error while running createPostPage.');
    return;
  }
  if (!data) return;
  const posts = data.allMdx.nodes;
  const postTemplate = path.resolve('./src/templates/post-template.tsx');

  posts.forEach((node) => {
    if (node.frontmatter.slug) {
      actions.createPage({
        path: `/post/${node.frontmatter.slug}`,
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
        },
      });
    }
  });

  // list
  const perPage = 7;
  const listTemplate = path.resolve('./src/templates/posts-list-template.tsx');
  const totalPages = Math.ceil(posts.length / perPage);

  for (let i = 1; i <= totalPages; i += 1) {
    actions.createPage({
      path: i === 1 ? '/posts' : `/posts/${i}`,
      component: listTemplate,
      context: {
        items: posts.slice(i, i + perPage),
        limit: perPage,
        skip: (i - 1) * perPage,
        totalPages,
        currentPage: i,
      },
    });
  }
}
