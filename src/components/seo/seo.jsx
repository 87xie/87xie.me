import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import Facebook from './facebook';
import Twitter from './twitter';

const query = graphql`
  query {
    site {
      siteMetadata {
        twitter,
        locale,
        siteLanguage,
        defaultTitle: title,
        defaultDescription: description,
        defaultImage: image,
        siteUrl: url,
      }
    }
  }
`;

const SEO = ({ title, description, image }) => {
  const data = useStaticQuery(query);
  const { pathname } = useLocation();

  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
    siteUrl,
    siteLanguage,
    locale,
    twitter,
  } = data.site.siteMetadata;

  /**
   * use template literals in seo object cause eslint linting
   * "TypeError: Cannot read property 'value' of null"
   * https://github.com/eslint/eslint/issues/13542
   */
  const seoTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const url = `${siteUrl}${pathname}`;
  const seo = {
    title: seoTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url,
  };

  return (
    <>
      <Helmet>
        <html lang={siteLanguage} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
      </Helmet>
      <Facebook
        title={seo.title}
        description={seo.description}
        image={seo.image}
        url={seo.url}
        locale={locale}
      />
      <Twitter
        username={twitter}
        title={seo.title}
        description={seo.description}
        image={seo.image}
      />
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
