const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const extractCSS = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
});

const IS_DEV = process.env.NODE_ENV === 'development';

const config = {
  mode: IS_DEV ? 'development' : 'production',
  entry: {
    editor: './modules/editor/webpackEntry.ts',
    admin: './modules/admin/webpackEntry.js',
    'lazyload-all': './modules/lazyload-all/webpackEntry.js',
    'lazyload-vimeo': './modules/lazyload-vimeo/webpackEntry.js',
    'lazyload-youtube': './modules/lazyload-youtube/webpackEntry.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@wordpress\/block-library)/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: IS_DEV,
              // This option makes ESLint automatically fix minor issues
              fix: !IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              happyPackMode: IS_DEV,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: IS_DEV,
              // This option makes ESLint automatically fix minor issues
              fix: !IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                const plugins = [];
                plugins.push(autoprefixer);
                return plugins;
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.scss'],
  },
  output: {
    path: `${__dirname}/assets/`,
    filename: 'js/[name].js',
  },
  plugins: [extractCSS],
  externals: {
    // Manually import used WP packages because if we would use
    // "@wordpress/dependency-extraction-webpack-plugin" instead,
    // our use of "@wordpress/block-library" would throw an error
    // because we're directly accessing internals that aren't
    // exposed via the wp.blockLibrary API
    '@wordpress/data': 'wp.data',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/element': 'wp.element',
    '@wordpress/compose': 'wp.compose',
    '@wordpress/components': 'wp.components',
    '@wordpress/hooks': 'wp.hooks',
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/block-editor': 'wp.blockEditor',
    lodash: 'lodash',
  },
};

if (IS_DEV) {
  config.devtool = 'eval-cheap-module-source-map';
}

module.exports = config;
