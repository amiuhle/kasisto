import config from 'config';

describe('Application Environment', function () {

  it('should load app config file depending on current --env', function () {
    expect(config.appEnv).to.equal('test');
  });
});
