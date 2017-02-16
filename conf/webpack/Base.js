'use strict';
const fs = require('fs');
const path = require('path');
const npmBase = path.join(__dirname, '../../node_modules');
class WebpackBaseConfig {
  constructor() {
    this._config = {};
  }
  get includedPackages() {
    return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)));
  }
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }
  get config() {
    return this._config;
  }
  get env() {
    return 'dev';
  }
  get srcPathAbsolute() {
    return path.resolve('./src');
  }
  get testPathAbsolute() {
    return path.resolve('./test');
  }
  get defaultSettings() {
    const cssModulesQuery = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    };
    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      devServer: {
        contentBase: './src/',
        publicPath: '/assets/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
      },
      entry: './index.js',
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js?$/,
            include: this.srcPathAbsolute,
            loader: 'babel-loader',
            query: { presets: ['es2015'] }
          },
          {
            test: /^.((?!cssmodule).)*\.css$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader' }
            ]
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
            loader: 'file-loader'
          },
          {
            test: /^.((?!cssmodule).)*\.(sass|scss)$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' }
            ]
          },
          {
            test: /^.((?!cssmodule).)*\.less$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'less-loader' }
            ]
          },
          {
            test: /^.((?!cssmodule).)*\.styl$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'stylus-loader' }
            ]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(js|jsx)$/,
            include: [].concat(this.includedPackages, [this.srcPathAbsolute]),
            loaders: [{ loader: 'babel-loader' }]
          },
          {
            test: /\.cssmodule\.(sass|scss)$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' }
            ]
          },
          {
            test: /\.cssmodule\.css$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'postcss-loader' }
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
              { loader: 'postcss-loader' },
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
              { loader: 'postcss-loader' },
              { loader: 'stylus-loader' }
            ]
          }
        ]
      },
      output: {
        path: path.resolve('./dist/assets'),
        filename: 'app.js',
        publicPath: './assets/'
      },
      plugins: [],
      resolve: {
        alias: {
          actions: `${ this.srcPathAbsolute }/actions/`,
          components: `${ this.srcPathAbsolute }/components/`,
          config: `${ this.srcPathAbsolute }/config/${ this.env }.js`,
          images: `${ this.srcPathAbsolute }/images/`,
          sources: `${ this.srcPathAbsolute }/sources/`,
          stores: `${ this.srcPathAbsolute }/stores/`,
          styles: `${ this.srcPathAbsolute }/styles/`
        },
        extensions: [
          '.js',
          '.jsx'
        ],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      },
      postcss: function () {
        return [];
      }
    };
  }
}
module.exports = WebpackBaseConfig;