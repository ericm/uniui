module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    config(config) {
      config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx']
      config.module.rules.push({
        'test': /\.tsx?$/,
        'loader': 'ts-loader',
      },{
        test: /\.css$/,
        use: [
          "postcss-loader",
          "css-loader", // translates CSS into CommonJS
        ]
    })

      return config
    },
  },
}