import * as path from 'path'
const PUBLIC = path.resolve(__dirname, 'public')

export default {
  theme: 'gatsby-theme-uniui',
  modifyBundlerConfig: bundlerConfig => {
    const rules = [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  },
  typescript: true,
  public: "./img",
  src: ".",
  themeConfig: {
    showPlaygroundEditor: true,
    showDarkModeSwitch: false,
    logo: {
      src: "/public/uniui.svg",
      width: 150
    }
  },
  onCreateWebpackChain: config => {
    config.resolve.alias
      .set('@images', PUBLIC)
    return config
  },
};
