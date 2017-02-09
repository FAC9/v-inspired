const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
const Yoti = require('yoti-node-sdk');
const Vision = require('vision');

const CLIENT_SDK_ID = 'e2d30c07-90e8-4e68-bdd1-691b4242d0f9';

const server = new Hapi.Server();
const yoti_key = fs.readFileSync(path.join(__dirname, './keys/yoti-key.pem'));

const client = new Yoti(CLIENT_SDK_ID, yoti_key);

let tls = {};
if(process.env.ENVIRONMENT !== 'deployment') {
  tls = {
    key: fs.readFileSync(path.join(__dirname, './keys/key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, './keys/cert.pem'), 'utf8'),
  };
}

let users = {};

function userSignIn (user) {
  users[user.userId] = {
    userId: user.userId,
    email: user.profile.emailAddress,
    login_time: Date.now(),
  }
}

const routes = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/event/1/start',
    handler: (request, reply) => {
      const token = request.query.token;
      if(!token) { return reply('No token found'); }

      client.getActivityDetails(token)
      .then(activityDetails => {
        let user = {
          userId: activityDetails.getUserId(),
          profile: activityDetails.getUserProfile(),
        };

        if (users[user.userId]) {
           total_time = Date.now() - users[user.userId].login_time;
           delete users[user.userId];
           return reply(total_time / 1000);
        }
        userSignIn(user);
        return reply('Hello ' + user.profile.givenNames);
      })
      .catch(err => {
        console.log(err);
        return reply('Error');
      });
    }
  }
];

server.register([Inert, Vision], (err) => {

  let options = {
    port: process.env.PORT || 3456
  };

  if(process.env.ENVIRONMENT !== "deployment") {
    options.tls = tls;
  }

  server.connection(options);
  
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './public/templates',
  });

  server.route(routes);

  server.start(() => { console.log((`Server running at: ${server.info.uri}`)); })

});

module.exports = server;
