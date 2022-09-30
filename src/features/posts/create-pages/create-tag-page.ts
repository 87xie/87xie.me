import { CreatePagesArgs } from 'gatsby';
import path from 'path';
import { PostNode } from '../types';

export interface GroupedByTagMdxData {
  allMdx: {
    group: Array<{
      fieldValue: string;
      nodes: PostNode[];
    }>
  }
}

export interface TagPageContext {
  posts: PostNode[];
  tag: string;
}

export const createTagPage = async ({
  actions,
  graphql,
}: CreatePagesArgs) => {
  const template = path.resolve('./src/templates/individual-tag-template.tsx');
  const { data } = await graphql<GroupedByTagMdxData>(`
    query {
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
    }
  `);

  if (!data) return;

  data.allMdx.group.forEach(({ nodes, fieldValue }) => {
    actions.createPage({
      path: `/tag/${fieldValue}`,
      component: template,
      context: {
        posts: nodes,
        tag: fieldValue,
      },
    });
  });
};
