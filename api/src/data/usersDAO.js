const db = require('./DBConnection');
const User = require('./models/User');
const bcrypt = require("bcrypt")
const crypto = require('crypto');

function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM user WHERE user_username=?', [username]).then(({ results }) => {
    const user = new User(results[0]);
    if (user) { // we found our user
      return user.validatePassword(password);
    }
    else { // if no user with provided username
      throw new Error("No such user");
    }
  });
}

function createUser(user) {
  // EVERYONES PASSWORD IS PASSWORD I CANOT FIGURE OUT HOW TO MAKE A HASH
  const pass_hash = "83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4"
    return db.query('INSERT INTO user (user_first_name, user_last_name, user_username, user_password, user_salt, user_avatar, user_favorites) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user.first_name, user.last_name, user.username, pass_hash, user.salt, user.avatar, user.favorites]).then(({results}) => {
      getUserById(results.insertId)
    });
}

function getUserById(userId) {
  return db.query('SELECT * FROM user WHERE user_id=?', [userId]).then(({results}) => {
    if(results[0])
      return new User(results[0]);
  });
}

function getFavoritesById(userId) {
  return db.query('SELECT `user_favorites` FROM user WHERE user_id=?', [userId]).then(({results}) => {
    if(results[0])
      return new User(results[0]);
  });
}

function updateFavoritesById(favoriteInfo, userId) {
  return db.query('UPDATE user SET `user_favorites`=? WHERE user_id=?', [favoriteInfo, userId]).then(({results}) => {
    return (getFavoritesById(userId));
  });
}

function getAllUsers() {
  return db.query('SELECT * FROM user').then(({results}) => {
    return results.map(user => new User(user)); ;
  });
}


module.exports = {
  getUserByCredentials: getUserByCredentials,
  createUser: createUser,
  getUserById: getUserById,
  getFavoritesById: getFavoritesById,
  updateFavoritesById: updateFavoritesById,
  getAllUsers: getAllUsers,
};
