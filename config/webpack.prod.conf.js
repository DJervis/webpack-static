const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const pages = require('./pages');

let entry = {
  index: path.resolve(__dirname, '../src/main.js'),
};
let plugins = [];

pages.forEach(page => {
  entry[page] = path.resolve(__dirname, `../src/page/${page}.js`);
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: path.resolve(__dirname, '../src/page.html'),
      chunks: ['vendor', 'common', page],
      chunksSortMode: 'manual'
    })
  )
})

module.exports = {
  mode: 'production',
  entry,
  devtool: '#source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   hot: true,
  //   compress: true,
  //   port: 3000
  // },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['vendor', 'common', 'index'],
      chunksSortMode: 'manual'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: '../dist/static'
      }
    ]),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['../dist']),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        },
        vendors: {
          test: /[\\/]node_modules[\\/](lodash|jquery)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 10
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'assets/img/[name].[contenthash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/css/font/[name].[ext]'
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].[chunkhash:7].js',
    chunkFilename: 'assets/js/[name].[chunkhash:7].js'
  },
  resolve: {
    extensions: ['.js', '.json'], // 自动解析的文件，引入模块时不用带扩展名
    // 设置常用别名
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      'Assets': path.resolve(__dirname, '../src/assets/'),
      'Static': path.resolve(__dirname, '../static/')
    }
  }
}