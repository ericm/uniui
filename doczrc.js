export default {
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
  typescript: true
};
