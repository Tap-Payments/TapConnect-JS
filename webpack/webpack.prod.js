var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonPaths = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin-legacy');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: `${commonPaths.jsFolder}/[name].js`,
    path: commonPaths.outputPath,
    library: 'Connect',
    globalObject: 'this',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // "sass-loader"
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: 4,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
    usedExports: true,
    splitChunks: {
      minChunks: 1,
      chunks: 'async',
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    }),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: '[name].css',
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: true,
        ecma: 6,
        mangle: true,
      },
      sourceMap: true,
    }),
    new CompressionPlugin(),
  ],
  devtool: 'source-map',
};
