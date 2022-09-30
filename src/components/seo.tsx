import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

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
        siteUrl,
      }
    }
  }
`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const SEO = ({
  title,
  description,
  image,
}: SEOProps) => {
  const data = useStaticQuery(query);
  const { pathname } = useLocation();

  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
    siteUrl,
    locale,
    twitter,
  } = data.site.siteMetadata;

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {/* og property */}
      <meta property="og:type" content="webiste" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.description} />
      <meta property="og:description" content={seo.description} />
      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={twitter} />
    </>
  );
};

export default SEO;
