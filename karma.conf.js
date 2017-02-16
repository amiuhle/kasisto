'use strict';

const webpackCfg = require('./webpack.config')('test');

module.exports = function karmaConfig(config) {

  config.set({
    browsers: ['PhantomJS'],
    files: [
      'test/loadtests.js'
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage', 'junit'],
    mochaReporter: {
      output: 'autowatch'
    },
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    junitReporter: {
      outputDir: 'coverage',
      outputFile: 'junit-result.xml',
      useBrowserName: false
    },
    coverageReporter: {
      dir: 'coverage/',
      watermarks: {
        statements: [70, 80],
        functions: [70, 80],
        branches: [70, 80],
        lines: [70, 80]
      },
      reporters: [
        { type: 'text' },
        {
          type: 'html',
          subdir: 'html'
        },
        {
          type: 'cobertura',
          subdir: 'cobertura'
        },
        {
          type: 'lcovonly',
          subdir: 'lcov'
        }
      ]
    }
  });
};
