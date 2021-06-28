import React from 'react';
import { useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import { render, waitFor } from '@testing-library/react';
import SEO from './seo';

const mockSiteMetadata = {
  defaultTitle: 'default-title',
  defaultDescription: 'default-description',
  defaultImage: 'https://default-imgae.jpg',
  siteUrl: 'https://87xie.me',
  siteLanguage: 'zh-Hant',
  locale: 'zh-TW',
  twitter: '@twitter',
};

const checkSeoTags = (
  seoProps = {},
  siteMetadata = mockSiteMetadata,
) => {
  const title = seoProps?.title || '';
  const description = seoProps?.description || '';
  const image = seoProps?.image || '';

  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
  } = siteMetadata;

  const location = useLocation();
  const seo = {
    locale: siteMetadata.locale,
    twitter: siteMetadata.twitter,
    siteLanguage: siteMetadata.siteLanguage,
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteMetadata.siteUrl}${location.pathname}`,
  };

  expect(document.title).toBe(seo.title);
  expect(document.querySelector('html')).toHaveAttribute('lang', seo.siteLanguage);

  const metaTagcheckList = [
    ['meta[property="og:title"]', seo.title],
    ['meta[property="og:description"]', seo.description],
    ['meta[property="og:image"]', seo.image],
    ['meta[property="og:url"]', seo.url],
    ['meta[property="og:locale"]', seo.locale],
    ['meta[name="twitter:title"]', seo.title],
    ['meta[name="twitter:description"]', seo.description],
    ['meta[name="twitter:image"]', seo.image],
    ['meta[name="twitter:creator"]', seo.twitter],
    ['meta[name="description"', seo.description],
  ];

  metaTagcheckList.forEach(([selector, expectedContent]) => {
    const metaTags = document.querySelectorAll(selector);
    const [metaTag] = metaTags;

    expect(metaTags.length).toBe(1);
    expect(metaTag).toHaveAttribute('content', expectedContent);
  });
};

/* mock query and @reach/router useLocation */
beforeAll(() => {
  useLocation.mockReturnValue({ pathname: '/' });
  useStaticQuery.mockReturnValue({
    site: { siteMetadata: mockSiteMetadata },
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('seo component', () => {
  it('should render correctly with default value', async () => {
    render(<SEO />);

    await waitFor(() => {
      checkSeoTags();
    });
  });

  it('should render correctly when passing props', async () => {
    const seoProps = {
      title: 'posts',
      description: 'all posts',
      image: 'https://new-image.jpg',
    };

    render(<SEO {...seoProps} />);

    await waitFor(() => {
      checkSeoTags(seoProps);
    });
  });
});
