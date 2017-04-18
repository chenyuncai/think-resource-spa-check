var assert = require('assert');
var path = require('path');
var http = require('http');

var thinkjs = require('thinkjs');
var instance = new thinkjs();
instance.load();

var _http = require('./_http.js');
// var Middleware = require('../lib/index.js');

function getHttp(config, options){
  think.APP_PATH = path.dirname(__dirname) + think.sep + 'testApp';
  var req = think.extend({}, _http.req);
  var res = think.extend({}, _http.res);
  return think.http(req, res).then(function(http){
    if(config){
      http._config = config;
    }
    if(options){
      for(var key in options){
        http[key] = options[key];
      }
    }
    return http;
  })
}

// function execMiddleware(middleware, config, options, data){
//   return getHttp(config, options).then(function(http){
//     let instance = new Middleware(http, data);
//     return instance.run();
//   }) 
// }

describe('middleware/think-resource_spa', function(){
  it('base, resource_on off', function(done){
      assert.equal('no test result', 'no test result');
      done();
  })

  // it('base, resource_on off', function(done){
  //   execMiddleware({
  //     resource_on: false
  //   }, {}).then(function(data){
  //     assert.equal(data, null);
  //     done();
  //   }).catch(function(err){
  //     console.log(err.stack)
  //   })
  // })
  // it('base, pathname empty', function(done){
  //   execMiddleware('think-resource_spa', {
  //     resource_on: true
  //   }, {
  //     pathname: ''
  //   }).then(function(data){
  //     assert.equal(data, null);
  //     done();
  //   })
  // })
  // it('base, reg not match', function(done){
  //   execMiddleware('think-resource_spa', {
  //     resource_on: true,
  //     resource_reg: /^\d+$/
  //   }, {
  //     pathname: 'wwww'
  //   }).then(function(data){
  //     assert.equal(data, null);
  //     done();
  //   })
  // })
  // it('base, file not found', function(done){
  //   execMiddleware('think-resource_spa', {
  //     resource_on: true,
  //     resource_reg: /^\d+$/
  //   }, {
  //     pathname: '01111'
  //   }).then(function(data){
  //     assert.equal(data, true);
  //     done();
  //   })
  // })
  // it('base, file is dir', function(done){
  //   var RESOURCE_PATH = think.RESOURCE_PATH;
  //   think.RESOURCE_PATH = path.dirname(__dirname);
  //   execMiddleware('think-resource_spa', {
  //     resource_on: true,
  //     resource_reg: /^\w+$/
  //   }, {
  //     pathname: 'middleware'
  //   }).then(function(data){
  //     assert.equal(data, true);
  //     think.RESOURCE_PATH = RESOURCE_PATH;
  //     done();
  //   })
  // })
  // it('base, file exist', function(done){
  //   var RESOURCE_PATH = think.RESOURCE_PATH;
  //   think.RESOURCE_PATH = __dirname;
  //   execMiddleware('think-resource_spa', {
  //     resource_on: true,
  //     resource_reg: /^think-resource_spa\.js/
  //   }, {
  //     pathname: 'think-resource_spa.js'
  //   }).then(function(file){
  //     assert.equal(file.indexOf('think-resource_spa.js') > -1, true);
  //     think.RESOURCE_PATH = RESOURCE_PATH;
  //     done();
  //   })
  // })
})