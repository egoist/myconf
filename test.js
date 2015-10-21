var assert = require("assert")
var Config = require('./lib/myconf')
var config = new Config('.testrc')

describe('main', function () {
  it('should return the version number', function () {
    config
    .parser('yaml')
    .set({
      version: '1.4.2',
      year: 2015
    })
    .then(function (data) {
      config.get('version')
      .then(function(version) {
        assert.equal(version, '1.4.2')
      })
    })
  })
  it('should return object', function () {
    var path = config
      .path(process.cwd())
    assert.equal(typeof path, 'object')
  })
  it('should save data and return object', function () {
    config
      .save({hello: '2016'})
      .then(function (data) {
        assert.equal(data.hello, '2016')
      })
  })
  it('should get object and return string', function () {
    config.parser('yaml').get('version').then(version => {
      assert.equal(typeof version, 'string')
    })
  })
})

