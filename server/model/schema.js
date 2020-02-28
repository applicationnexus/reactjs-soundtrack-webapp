const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});
exports.users = mongoose.model('users', userSchema);

const soundSchema = Schema({
  user_id: String,
  songname: String,
  artistname: String,
  moviename: String,
  filepath: String,
});

exports.sounds = mongoose.model('sounds', soundSchema);
