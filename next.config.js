// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { dirs: ['src'] },
  images: {
    domains: ['media-exp1.licdn.com', 'cdn-images-1.medium.com', 'medium.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        { loader: '@svgr/webpack', options: { typescript: true, icon: true } },
      ],
    });

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
