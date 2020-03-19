module.exports = {
  plugins: [
    'gatsby-theme-uniui',
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true
      }
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-uniui'],
      },
    }
  ]
};
