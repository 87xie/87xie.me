import React from 'react';
import * as ChakraUI from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import HeaderIconLink from './header-icon-link';

const mockIcon = () => <svg />;
jest.spyOn(ChakraUI, 'useColorModeValue').mockImplementation(() => {});
afterAll(() => {
  jest.clearAllMocks();
});

describe('header icon link component', () => {
  it('should external link have expected attributes', () => {
    const props = {
      to: 'https://github.com/Oscar87Xie',
      icon: mockIcon,
      isExternal: true,
    };
    render((
      <HeaderIconLink
        {...props}
        aria-label="to my github page"
      />
    ));

    const link = screen.getByRole('link');
    expect(link).toContainHTML('svg');
    expect(link.href).toBe(props.to);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAccessibleName(/to my github page/i);
  });

  it('should internal link not exist rel, target attributes', () => {
    const props = {
      to: '/posts',
      icon: mockIcon,
      isExternal: false,
    };

    render(<HeaderIconLink {...props} />);

    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });
});
