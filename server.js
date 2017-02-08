const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
const Yoti = require('yoti-node-sdk');

const CLIENT_SDK_TD = ' 63ed9e94-3ead-47a9-817a-af47b7c783db';

const server = new Hapi.Server();
const yoti_key = fs.readFileSync(path.join(__dirname, "./keys/yoti-key.pem"));

var client = new Yoti(CLIENT_SDK_TD, yoti_key);

const tls = {
  key: fs.readFileSync(path.join(__dirname, './keys/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './keys/cert.pem')),
};

const routes = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  }, {
    method: 'GET',
    path: '/event/1/start',
    handler: (request, response) => {
      response("hello, successful, yay!");
    }
  }

]

server.register([Inert], (err) => {

  server.connection({
    port: process.env.PORT || 3456,
    tls: tls, });

  server.route(routes);

  server.start(() => { console.log((`Server running at: ${server.info.uri}`)); })

});

module.exports = server;
