var mqtt = require('mqtt');
var fs = require('fs');
require('./devices.js');

var PORT = 1883;
var HOST = 'YOUR_HOST';

var timeDiff = process.argv[2];
if(!timeDiff){
  console.log("please enter all args!");
  process.exit(1);
}

  

for (var i=0;i<1;i++){
var device = addDevice();
console.log(JSON.stringify(device));
var options = {
  port: PORT,
  host: HOST,
  rejectUnauthorized : true,
  clientId: device.uuid,
  username: 'use-token-auth',
  password: device.password,
  encoding:'utf8',
  reconnectPeriod: 1000
};

var client = mqtt.connect(options);

client.on('connect', function () {
  console.log('publish');
  data = { id: '123232', devt: 'Wippschalter', val: '0D', time: Date.now(), devid: '1c43f152c3474108917f616244dbba50' };
  res = client.publish('iot-2/evt/ownEvent/fmt/json', JSON.stringify(data), {retain: false, qos: 1});

  data = { id: '654', val: 4, devt: 'wilo pico', cname: 'PERROR', time: Date.now(), manufacturer: 'manufacturer', errorCode: '42' };
  client.publish('iot-2/evt/ownEvent/fmt/json', JSON.stringify(data), {retain: false, qos: 1});

});


client.on('disconnect', function () {
  console.log('disconnect');
});
}
console.log("Finished!");

