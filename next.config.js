/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Include components directory in webpack configuration
    config.module.rules.push({
      test: /\.jsx?$/,
      include: /components/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
  images: {
    domains: ["images.pexels.com"]
  }
}

module.exports = nextConfig
