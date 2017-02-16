'use strict';  // eslint-disable-line

/**
 * Default test configuration.
 */
const WebpackBaseConfig = require('./Base');
const webpack = require('webpack');

class WebpackTestConfig extends WebpackBaseConfig {

  constructor() {
    super();

    const cssModulesQuery = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    };

    this.config = {
      devtool: 'inline-source-map',
      entry: [
        './client.js'
      ],
      externals: {
        cheerio: 'window',
        'react/addons': 'true',
        'react/lib/ExecutionEnvironment': 'true',
        'react/lib/ReactContext': 'true'
      },
      module: {
        loaders: [
          {
            test: /\.cssmodule\.css$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              }
            ]
          },
          {
            test: /\.cssmodule\.less$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'less-loader' }
            ]
          },
          {
            test: /\.cssmodule\.styl$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'stylus-loader' }
            ]
          },
          {
            test: /\.cssmodule\.(sass|scss)$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'sass-loader' }
            ]
          },
          {
            test: /^.((?!cssmodule).)*\.css$/,
            loader: 'null-loader'
          },
          {
            test: /^.((?!cssmodule).)*\.(sass|scss)$/,
            loader: 'null-loader'
          },
          {
            test: /^.((?!cssmodule).)*\.less$/,
            loader: 'null-loader'
          },
          {
            test: /^.((?!cssmodule).)*\.styl$/,
            loader: 'null-loader'
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
            loader: 'null-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [].concat(
              this.includedPackages,
              [
                this.srcPathAbsolute,
                this.testPathAbsolute
              ]
            )
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"test"'
        })
      ]
    };
  }

  /**
   * Set the config data.
   * Will remove the devServer config value as we do not need it in test environments
   * This function will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {

    const baseSettings = this.defaultSettings;
    delete baseSettings.devServer;
    this._config = Object.assign({}, baseSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return super.config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'test';
  }
}

module.exports = WebpackTestConfig;
