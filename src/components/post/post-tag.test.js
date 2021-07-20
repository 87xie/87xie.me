import React from 'react';
import { render, screen } from '@testing-library/react';
import PostTag from './post-tag';

describe('post tag component', () => {
  it('is routable', () => {
    const to = '/foo/bar';
    const textNode = 'foo';
    render((
      <PostTag to={to}>
        {textNode}
      </PostTag>
    ));

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', to);
    expect(link).toHaveTextContent(textNode);
  });
});
