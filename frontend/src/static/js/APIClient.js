import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE+'/users/current');
  },

  logIn: (username, password) => {
    let data = {
      username: username,
      password: password
    }
    // console.log('DATA FOR REQUEST: %s', JSON.stringify(data))
    return HTTPClient.post(API_BASE+'/users/login', data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE+'/users/logout', {});
  },

  register: (user) => {
    return HTTPClient.post(API_BASE+'/users', user);
  }
};
