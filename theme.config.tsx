import type { NextraBlogTheme } from 'nextra-theme-blog';

const siteConfig = {
  title: '87xie.me',
  description: 'Personal writing by 87xie',
  image: 'https://87xie.me/patrick-star-in-love.jpg',
}

const config: NextraBlogTheme = {
  darkMode: true,
  head: ({ meta }) => {
    const title = meta.title
      ? `${meta.title} | ${siteConfig.title}`
      : siteConfig.title;
    const description = meta.descriotion ?? siteConfig.description;
    return (
      <>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {meta.tag && <meta name="keywords" content={meta.tag} />}
        {/* open graph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteConfig.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </>
    );
  },
  footer: null
}

export default config
