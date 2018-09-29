const presets = [
  ['@babel/preset-env', {
    targets: {
      chrome: '60',
      firefox: '58',
      safari: '10',
      ios: '10',
      edge: '13',
      node: 'current'
    },
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
