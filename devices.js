var request = require('request');
var uuid = require('node-uuid');
var constants = require('./secrets.private');
//https://developer.ibm.com/iotfoundation/recipes/api-documentation/
var API_KEY = constants.API_KEY;
var ORG = constants.ORG;
var TOKEN = constants.TOKEN;
var HOST = constants.HOST;

/**
 * List devices
 */
request.get('API_URL')
.auth(API_KEY,TOKEN)
.on('response',function(response){
  response.body="";
  response.on("data",function(chunk){
    response.body += chunk;
  });
  response.on("end",function(){
    console.log(response.body);
  });
})
.on("error",function(err){
  console.log(err);
});

/**
 * Add a device
 */
addDevice = function(){
    request.post({
      url: 'API_URL',
      auth: {
        'username': API_KEY,
        'password': TOKEN,
      },
      json: true,
      body: {
        id: uuid.v1(),
        type: 'fl-d2',
      }
    },function(error,response,body){
      return body;
    });
};

removeDevices = function(type,id){
    request.del({
      url: HOST+ORG+'/devices/'+type+'/'+id,
      auth: {
        'username': API_KEY,
        'password': TOKEN,
      }
    });
};
