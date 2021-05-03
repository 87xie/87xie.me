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

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: `${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
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
