const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs'
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
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
}
