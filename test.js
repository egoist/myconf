var assert = require("assert")
var Config = require('./lib/myconf')
var config = new Config('.testrc')


describe('main', function () {
  it('should return the version number', function () {
    config
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
})
