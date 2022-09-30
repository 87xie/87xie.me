import path from 'path';
import { GatsbyNode } from 'gatsby';
import {
  createTagPage,
  createPostPage,
} from './src/features/posts/create-pages';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve('src/components'),
        '@features': path.resolve('src/features'),
        '@layouts': path.resolve('src/layouts'),
      },
    },
  });
};

export const createPages: GatsbyNode['createPages'] = async (createPagesArgs) => {
  await Promise.all([
    createPostPage(createPagesArgs),
    createTagPage(createPagesArgs),
  ]);
};
