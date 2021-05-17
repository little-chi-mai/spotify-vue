import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "request";

// var request = require('request'); // "Request" library
// console.log(process.env.CLIENT_ID);

var client_id = '24bee78ac1814d0889acd52600b8eedb'; // Your client id
var client_secret = '1a5d7580057b4e10b7df01ead921cc11'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/5sdjqnz1e5420kuuu7wxf6ncr',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
