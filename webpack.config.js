const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: '',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [{ loader: "css-loader", options: { modules: true } },
          "postcss-loader"]
      }
    ]
  }
}
