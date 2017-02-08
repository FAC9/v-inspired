const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
const Yoti = require('yoti-node-sdk');

const CLIENT_SDK_ID = 'e2d30c07-90e8-4e68-bdd1-691b4242d0f9';

const server = new Hapi.Server();
const yoti_key = fs.readFileSync(path.join(__dirname, './keys/yoti-key.pem'));

var client = new Yoti(CLIENT_SDK_ID, yoti_key);

const tls = {
  key: fs.readFileSync(path.join(__dirname, './keys/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, './keys/cert.pem'), 'utf8'),
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
    handler: (request, reply) => {
      const token = request.query.token;
      if(!token) { return reply('No token found'); }

      client.getActivityDetails(token)
        .then(activityDetails => {
          return reply({
            userId: activityDetails.getUserId(),
            profile: activityDetails.getUserProfile(),
            outcome: activityDetails.getOutcome(),
            timestamp: Date.now()
          });
        })
        .catch(err => {
          console.log(err);
          return reply('Error');
        });
    }
  }
];

server.register([Inert], (err) => {

  server.connection({
    port: process.env.PORT || 3456,
    tls: tls
  });

  server.route(routes);

  server.start(() => { console.log((`Server running at: ${server.info.uri}`)); })

});

module.exports = server;
