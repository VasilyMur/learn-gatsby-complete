const dotenv = require('dotenv');

dotenv.config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'Fresh Blog',
    siteUrl: 'https://fresh.blog',
    description: 'Мой супер быстрый блог!',
    author: 'Vasily M.',
    vk: 'https://vk.com/freshblog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '7gwi0sda',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
