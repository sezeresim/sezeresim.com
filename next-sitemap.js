/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // Keep in sync with SITE.url in src/constants/index.tsx
  siteUrl: 'https://sezeresim.vercel.app',
  // Unlisted pages
  exclude: ['/cv', '/cv/*'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
