const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', commonPaths.demoPath],

  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[id].[chunkhash].js',
    library: 'Connect',
    globalObject: 'this',
    libraryTarget: 'umd',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          // "sass-loader"
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: commonPaths.templatePath,
    port: 3000,
    open: true,
  },
};
