/** @type {import('next').NextConfig} */
const nextConfig = {}

require('dotenv').config();

module.exports = nextConfig
module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      });
  
      return config;
    },
    env: {
      DRUPAL_API_BASE_URL: process.env.DRUPAL_API_BASE_URL,
    },
  };
  