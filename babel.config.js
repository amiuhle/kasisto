const presets = [
  ['@babel/preset-env', {
    'debug': false,
    useBuiltIns: 'usage'
  }],
  '@babel/preset-react'
]

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-spread',
  'react-hot-loader/babel'
]

module.exports = {
  presets,
  plugins
}
