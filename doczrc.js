export default {
  onCreateWebpackChain: config => {
    // Allow CSS imports
    config.module
      .rule("scss")
      .test(/\.css|scss|sass$/)
      .use("style")
      .loader("style-loader")
      .end()
      .use("css")
      .loader("css-loader")
      .end();
  },
  typescript: true
};
