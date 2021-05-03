import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const Facebook = ({
  url,
  name,
  type,
  title,
  description,
  image,
  locale,
}) => (
  <Helmet>
    {name && <meta property="og:site_name" content={name} />}
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={description} />
    <meta property="og:description" content={description} />
  </Helmet>
);

Facebook.propTypes = {
  url: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
};

Facebook.defaultProps = {
  type: 'website',
  name: null,
};

export default Facebook;
