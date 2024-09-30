import type { NextraBlogTheme } from 'nextra-theme-blog'
import { useRouter } from 'nextra/hooks'

const siteConfig = {
  title: '87xie.me',
  description: 'Personal writing by 87xie',
  siteUrl: 'https://87xie.me',
  image: 'https://87xie.me/patrick-star-in-love.jpg',
}

const config: NextraBlogTheme = {
  darkMode: true,
  head: function Head({ meta }) {
    const title = meta.title
      ? `${meta.title} | ${siteConfig.title}`
      : siteConfig.title
    const description = meta.descriotion ?? siteConfig.description;
    const { pathname } = useRouter()
    const siteUrl = `${siteConfig.siteUrl}${pathname}`

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
        <meta property="og:url" content={siteUrl} />
      </>
    )
  },
  footer: null,
}

export default config
