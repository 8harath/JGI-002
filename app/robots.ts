import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/static/',
        '/admin/',
        '/private/',
      ],
    },
    sitemap: 'https://www.jainuniversity.live/sitemap.xml',
  }
}
